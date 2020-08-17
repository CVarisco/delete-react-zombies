import * as fs from 'fs';

const jsConfigLocation = "./jsconfig.json";
const jsconfig = fs.existsSync("./jsconfig.json") ? require("../jsconfig.json") : {};
console.log(fs.existsSync(jsConfigLocation))
const tsconfig = fs.existsSync("./tsconfig.json") ? require("../tsconfig.json") : {};

export const baseUrl: string = tsconfig?.compilerOptions?.baseUrl || jsconfig?.compilerOptions?.baseUrl || "";

export const isImported = (text: string, content: string): boolean =>
  content.indexOf(`import ${text}`) !== -1;

export const regexp: RegExp = new RegExp('export default (.*)');

export const deleteComponents = (components: Component[]) => components.forEach(deleteComponent);

export const deleteComponent = (component: Component) =>
  fs.existsSync(component.path) && fs.unlinkSync(component.path);

export const isDirectory = (path: string): boolean => fs.statSync(path).isDirectory();

export const isAvailableFile = (file: string): boolean => file.search(/.js|.ts|.jsx|.tsx/g) !== -1;
