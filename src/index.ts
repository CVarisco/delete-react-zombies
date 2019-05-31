import * as fs from "fs";

import { Option, none, some } from "fp-ts/lib/Option";

const isReactComponent = (text: string): boolean =>
  text.indexOf("import React") !== -1;

const regexp: RegExp = new RegExp("export default (.*)");

const getComponentName = (text: string): Option<string> => {
  const res = text.match(regexp);

  if (!res) {
    return none;
  }

  return some(
    res[1].replace(
      /;|class|extends|React.Component|{| |Component|connect|mapStateToProps|,|mapDispatchToProps|\)|\(/g,
      ""
    )
  );
};

interface Component {
  name: string;
  path: string;
}

function getComponents(path: string): Component[] {
  const files = fs.readdirSync(path);

  return files.reduce((components: Component[], file: string) => {
    const isDirectory = fs.statSync(`${path}/${file}`).isDirectory();

    if (isDirectory) {
      return [...components, ...getComponents(`${path}/${file}`)];
    }

    const fileContent = fs.readFileSync(`${path}/${file}`, {
      encoding: "utf-8"
    });

    if (isReactComponent(fileContent)) {
      const componentName = getComponentName(fileContent);

      return [
        ...components,
        {
          name: getComponentName(fileContent).getOrElse(
            "[ERROR]: ComponentNameNotFound"
          ),
          path: `${path}/${file}`
        }
      ];
    }

    return components;
  }, []);
}

console.log(getComponents(".").map(component => `import ${component.name}`));
