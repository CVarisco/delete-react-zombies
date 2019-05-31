#!/usr/bin/env node
const fs = require("fs");
const { exec } = require("child_process");
const ora = require("ora");
const inquirer = require("inquirer");
const args = require("yargs").argv;

/**
 * Return all the components in the path with .jsx extension
 * @param {String} path start from search path
 * @return {Array} components included in the path
 */
function getComponents(path) {
  const files = fs.readdirSync(path);

  return files.reduce((components, file) => {
    const isDirectory = fs.statSync(`${path}/${file}`).isDirectory();
    if (isDirectory) {
      return [...components, ...getComponents(`${path}/${file}`)];
    }

    if (file.includes(".jsx")) {
      return [
        ...components,
        {
          filename: file.substring(0, file.indexOf(".jsx")),
          path: `${path}/${file}`
        }
      ];
    }

    return components;
  }, []);
}

/**
 * Using the_silver_search lib from brew, get all the matching in other components
 * @param {String} componentName
 * @return {Promise}
 */
function searchImportsCommand(componentName) {
  return new Promise(resolve => {
    exec(`ag -G 'jsx?$' 'import ${componentName}' -l`, (err, stdout) => {
      if (err) {
        // node couldn't execute the command
        resolve(false);
      }
      resolve(unescape(stdout));
    });
  });
}

/**
 * Loop per single component and find if is imported from someone else
 * @param {Array} components
 * @return {Array} unused  List of unused components
 */
async function getUnImportedComponents(components) {
  const unused = [];

  for (const component of components) {
    const result = await searchImportsCommand(component.filename);
    if (!result) {
      unused.push(component);
    }
  }

  return unused.filter(component => component.filename !== "index");
}

async function deleteZombies(components) {
  for (const component of components) {
    const answer = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `Do you want delete ${component.path} ?`
      }
    ]);
    if (answer.confirm) {
      fs.unlinkSync(component.path);
    }
  }
}

/**
 * Check with version command if exist the silver searcher dependencies
 */
function checkIfSilverSearchExist() {
  return new Promise((resolve, reject) => {
    exec("ag --version", err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

async function startSearch() {
  console.log("\n"); // free space
  const spinner = ora("Searching zombie components").start();
  try {
    const path = args.path || process.cwd();
    const components = getComponents(path);
    const unImportedComponents = await getUnImportedComponents(components);
    spinner.stop();

    if (!unImportedComponents.length) {
      return console.log("\n Unused components not found! \n");
    }

    console.log(
      `\n ${unImportedComponents.length} unused components found! \n`
    );
    return deleteZombies(unImportedComponents);
  } catch (error) {
    spinner.stop();
    return console.log(error);
  }
}

(async function start() {
  try {
    await checkIfSilverSearchExist();
    startSearch();
  } catch (error) {
    console.log(error);
  }
})();
