# engines-lookup

![NPM Version](https://img.shields.io/npm/v/engines-lookup?style=flat-square)
![NPM Downloads](https://img.shields.io/npm/dt/engines-lookup?style=flat-square)

A tool to check what engines are advised by the dependencies

## Usage

```bash
npx engines-lookup [options] [path]
```

If a project's path isn't provided, the program will use "."

### Options

- `-t, --table` : Shows a table of package's name and advised engines. Default: false

- `-s, --sort <engine>` : Sorts the table entries by the engine specified. The first entry will always be the project at the path. Default: "node"

- `-a, --add` : Adds the result to the project's package.json file. Default: false

- `-v, --version` : Displays the current version of engines-lookup

- `-h, --help` : Shows a help message
