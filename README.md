# delete-react-zombies

> CLI to search and delete unused 🧟‍♂️ components in your react files

<p align="center">
  <img src="https://github.com/CVarisco/delete-react-zombies/blob/master/docs/delete-react-zombies.gif" alt="delete-react-zombies" width="1024" />
</p>

## Install

This package use the_silver_searcher, install [the_silver_searcher](https://github.com/ggreer/the_silver_searcher#installing) for your OS before.

```sh
$ npm install delete-react-zombies
```

## Usage

```sh
$ delete-react-zombies
```

## How it works

The package search in your files the keyword `import ${componentName}`.
The `componentName` variable is the name of the file that your component
have with `.jsx` extension.

Example:
If we have a component file name `Button.jsx`, the package will search
imports like `import Button`

## Contributing

Check the [issue list](https://github.com/CVarisco/delete-react-zombies/issues) to contribute on some activities or to advice new features!
The library is open to everybody, contribute improve your skills.

`delete-react-zombies` is maintained under [the Semantic Versioning guidelines](http://semver.org/).

Use `npm run watch` while coding.

## License

MIT © [Christian Varisco](https://github.com/CVarisco)
