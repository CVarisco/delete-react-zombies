import * as fs from "fs";

export const isImported = (text: string, content: string): boolean =>
  content.indexOf(`import ${text}`) !== -1;

export const regexp: RegExp = new RegExp("export default (.*)");

export const deleteComponents = (components: Component[]) =>
  components.forEach(deleteComponent);

export const deleteComponent = (component: Component) =>
  fs.existsSync(component.path) && fs.unlinkSync(component.path);

export const isDirectory = (path: string): boolean => fs.statSync(path).isDirectory();

export const isAvailableFile = (file: string): boolean => file.search(/.js|.ts|.jsx/g) !== -1;
