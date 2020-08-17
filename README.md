<p align="center">
  <img src="https://github.com/CVarisco/delete-react-zombies/blob/master/docs/logo.png" width="500" alt="delete-react-zombies"/>
</p>

[![npm version](https://badge.fury.io/js/delete-react-zombies.svg)](https://badge.fury.io/js/delete-react-zombies)
[![npm](https://img.shields.io/npm/dw/delete-react-zombies.svg)](https://www.npmjs.com/package/delete-react-zombies)

**CLI to search and delete unimported 🧟 components in your react files**

<p align="center">
  <img src="https://github.com/CVarisco/delete-react-zombies/blob/master/docs/demo.gif" alt="delete-react-zombies" width="800" />
</p>

## Install

```sh
$ npm install delete-react-zombies
```

## Usage

```sh
$ delete-react-zombies
```

**Options**:

-   `--path` define the path where search zombies (default=process.cwd)
-   `--verbose` show in the console the file content to be deleted
-   `--force` don't ask confirm before delete files.
-   `--ignoreNodeModules` skip looking in the node_modules folder
-   `--absoluteImports` include the baseUrl in the path

## How it works

The package create a list of components in your application.
Based on that, the library search in your files content the keyword `import ${componentName}`, where the `componentName` variable is the name of the component that is exported.

## Absolute imports (baseUrl)

If your react project is configured to support [importing modules & components using absolute paths](https://create-react-app.dev/docs/importing-a-component/#absolute-imports) then turning this on will add the base url into the path & component name check.

> Note this

## Contributing

Check the [issue list](https://github.com/CVarisco/delete-react-zombies/issues) to contribute on some activities or to advice new features!
The library is open to everybody, contribute improve your skills.

`delete-react-zombies` is maintained under [the Semantic Versioning guidelines](http://semver.org/).

Use `npm run build:ts` while coding.

## License

MIT © [Christian Varisco](https://github.com/CVarisco)
