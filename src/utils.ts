import * as fs from 'fs';

const jsConfigLocation = "../jsconfig.json";
const jsconfig = fs.existsSync(jsConfigLocation) ? require(jsConfigLocation) : null;
const tsConfigLocation = "../tsconfig.json";
const tsconfig = fs.existsSync(tsConfigLocation) ? require(tsConfigLocation) : null;

export const baseUrl: string = tsconfig?.compilerOptions?.baseUrl || jsconfig?.compilerOptions?.baseUrl || "";

export const isImported = (text: string, content: string): boolean =>
  content.indexOf(`import ${text}`) !== -1;

export const regexp: RegExp = new RegExp('export default (.*)');

export const deleteComponents = (components: Component[]) => components.forEach(deleteComponent);

export const deleteComponent = (component: Component) =>
  fs.existsSync(component.path) && fs.unlinkSync(component.path);

export const isDirectory = (path: string): boolean => fs.statSync(path).isDirectory();

export const isAvailableFile = (file: string): boolean => file.search(/.js|.ts|.jsx|.tsx/g) !== -1;
