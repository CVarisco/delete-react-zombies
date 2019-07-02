#!/usr/bin/env node
import * as fs from 'fs';
import ora from 'ora';
import { argv as args } from 'yargs';
import { prompt } from 'inquirer';
import { isImported, deleteComponents, deleteComponent } from './utils';
const reactDocs = require('react-docgen');

/**
 * @description Parse with react-docgen and return componentName if exists
 */
function getComponentName(fileContent: string): string {
  try {
    const parsed = reactDocs.parse(fileContent);

    return parsed.displayName || '';
  } catch (error) {
    return '';
  }
}

/**
 * @description Loop into the dir and find React Components.
 * The research occurs based on file extension.
 * Get the content of the file if the extension is correct, build the component with https://github.com/reactjs/react-docgen to get the componentName
 */
function getComponentsFromDir(path: string): Component[] {
  const files = fs.readdirSync(path);

  return files.reduce((acc: Component[], fileName: string): Component[] => {
    const filePath = `${path}/${fileName}`;
    const isDirectory = fs.statSync(filePath).isDirectory();

    if (isDirectory) {
      return [...acc, ...getComponentsFromDir(filePath)];
    }

    if (fileName.search(/.js|.ts|.jsx/g) !== -1) {
      const fileContent = fs.readFileSync(filePath, {
        encoding: 'utf-8',
      });
      const componentName = getComponentName(fileContent);

      if (!componentName) {
        return acc;
      }

      return [
        ...acc,
        {
          name: componentName,
          path: filePath,
          content: fileContent,
        },
      ];
    }

    return acc;
  }, []);
}

/**
 * @description Loop throuth the list of files and verify if the component name is imported into the file
 * If yes, stop the loop
 * If no, return the component information to be deleted
 */
function verifyImport(component: Component, listOfComponents: Component[]): Component | undefined {
  for (const file of listOfComponents) {
    if (isImported(component.name, file.content)) {
      return;
    }
  }

  return component;
}

/**
 * @description For each component verify if is imported on the list of files and create a list of unused components
 */
function getUnusedComponents(components: Component[]): Component[] {
  return components.reduce((acc: Component[], curr: Component): Component[] => {
    const componentUnUsed = verifyImport(curr, components);

    if (!componentUnUsed) {
      return acc;
    }

    return [...acc, componentUnUsed];
  }, []);
}

/**
 * @description Loop all components to delete and ask with a question a confirmation
 */
async function confirmDelete(components: Component[]) {
  for (const component of components) {
    if (args.verbose) {
      console.log(component.content);
    }
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Do you want delete ${component.path} ?`,
      },
    ]);
    //@ts-ignore
    if (answer.confirm) {
      deleteComponent(component);
    }
  }
}

(async function () {
  const spinner = ora({
    text: 'Searching zombie components',
  }).start();

  const path = args.path || process.cwd();
  const components = getComponentsFromDir(path);

  console.log(`\n\n${components.length} components found! \n`);
  const zombieComponents = getUnusedComponents(components);

  spinner.stop();
  console.log(`${zombieComponents.length} unused components found! \n`);

  if (args.force) {
    return deleteComponents(zombieComponents);
  }

  await confirmDelete(zombieComponents);
  return console.log('\nBye bye!');
}());
