#!/usr/bin/env node
import * as fs from "fs";
import ora from "ora";
import { argv as args } from "yargs";
import { prompt } from "inquirer";
import {
  isImported,
  getComponentName,
  deleteComponents,
  deleteComponent
} from "./utils";

function getPathFiles(path: string): FileReaded[] {
  const files = fs.readdirSync(path);

  return files.reduce((acc: FileReaded[], file: string) => {
    const filePath = `${path}/${file}`;
    const isDirectory = fs.statSync(filePath).isDirectory();

    if (isDirectory) {
      return [...acc, ...getPathFiles(filePath)];
    }

    if (file.search(/.js|.ts|.jsx/g) !== -1) {
      const fileContent = fs.readFileSync(filePath, {
        encoding: "utf-8"
      });

      return [
        ...acc,
        {
          path: filePath,
          content: fileContent
        }
      ];
    }

    return acc;
  }, []);
}

function getComponents(files: FileReaded[]): Component[] {
  return files.reduce(
    (components: Component[], file: FileReaded): Component[] => {
      if (isImported("React", file.content)) {
        return [
          ...components,
          {
            name: getComponentName(file.content).getOrElse(
              `[ERROR]: This file does not contain an exported default component ${
                file.path
              }`
            ),
            path: file.path,
            content: file.content
          }
        ];
      }

      return components;
    },
    []
  );
}

function verifyImport(
  component: Component,
  files: FileReaded[]
): Component | undefined {
  for (const file of files) {
    if (isImported(component.name, file.content)) {
      return;
    }
  }

  return component;
}

function getUnusedComponents(
  components: Component[],
  files: FileReaded[]
): Component[] {
  return components.reduce((acc: Component[], curr: Component) => {
    const componentFound = verifyImport(curr, files);

    if (componentFound) {
      return [...acc, componentFound];
    }
    return acc;
  }, []);
}

async function askBeforeDelete(components: Component[]) {
  for (const component of components) {
    if (args.verbose) {
      console.log(component.content);
    }
    const answer = await prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `Do you want delete ${component.path} ?`
      }
    ]);
    //@ts-ignore
    if (answer.confirm) {
      deleteComponent(component);
    }
  }
}

(async function() {
  const spinner = ora({
    text: "Searching zombie components",
    spinner: "pong"
  }).start();
  const path = args.path || process.cwd();
  const files = getPathFiles(path);
  const components = getComponents(files);
  const zombieComponents = getUnusedComponents(components, files);
  spinner.stop();
  console.log(`\n ${zombieComponents.length} unused components found! \n`);

  if (args.force) {
    return deleteComponents(zombieComponents);
  }

  return await askBeforeDelete(zombieComponents);
})();
