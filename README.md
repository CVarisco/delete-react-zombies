<p align="center">
  <img src=".https://github.com/CVarisco/delete-react-zombies/blob/master/docs/logo.png" width="500" alt="delete-react-zombies"/>
</p>

[![npm version](https://badge.fury.io/js/delete-react-zombies.svg)](https://badge.fury.io/js/delete-react-zombies)
[![npm](https://img.shields.io/npm/dw/delete-react-zombies.svg)](https://www.npmjs.com/package/delete-react-zombies)

**CLI to search and delete unimported 🧟 components in your react files**

<p align="center">
  <img src="https://github.com/CVarisco/delete-react-zombies/blob/master/docs/delete-react-zombies-demo.gif" alt="delete-react-zombies" width="800" />
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

- `--path` define the path where search zombies (default=process.cwd)
- `--verbose` show in the console the file content to be deleted
- `--force` don't ask confirm before delete files.

## How it works

The package search in your files the keyword `import ${componentName}`.
The `componentName` variable is the name of the component that is exported.
To understand the component name I'm using [react-docgen](https://github.com/reactjs/react-docgen)

## Contributing

Check the [issue list](https://github.com/CVarisco/delete-react-zombies/issues) to contribute on some activities or to advice new features!
The library is open to everybody, contribute improve your skills.

`delete-react-zombies` is maintained under [the Semantic Versioning guidelines](http://semver.org/).

Use `npm run build:ts` while coding.

## License

MIT © [Christian Varisco](https://github.com/CVarisco)
