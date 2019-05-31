import * as fs from "fs";
import { Option, none, some } from "fp-ts/lib/Option";

export const isImported = (text: string, content: string): boolean =>
  content.indexOf(`import ${text}`) !== -1;

export const regexp: RegExp = new RegExp("export default (.*)");

export const getComponentName = (text: string): Option<string> => {
  const res = text.match(regexp);

  if (!res) {
    return none;
  }

  // Strip all the useless information from the string to get the name of the component
  return some(
    res[1].replace(
      /;|null|class|extends|React.Component|{| |Component|connect|mapStateToProps|,|mapDispatchToProps|\)|\(|React.Pure|Pure/g,
      ""
    )
  );
};

export const deleteComponents = (components: Component[]) =>
  components.forEach(deleteComponent);

export const deleteComponent = (component: Component) =>
  fs.existsSync(component.path) && fs.unlinkSync(component.path);
