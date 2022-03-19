#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { enginesLookup, getPackages } from '../index';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// Imports the package.json from the project's root,
// which isn't included in the rootDir at tsconfig.json
import { version } from '../../package.json';

const argv: string[] = process.argv.slice(2);

// Execution options with its default values
const options = {
  table: false,
  sort: 'node',
  add: false,
  version: false,
  help: false,
};

// Path to lookup (default ".")
let path = '.';

const main = (): void => {
  while (argv.length > 0) {
    let currentArgument: string = argv.shift()!;

    // When an flag appears, the corresponding option will be true.
    // Unless the flag comes with the "--table=false" form
    let currentValue = true;

    const indexOfEqualSign: number = currentArgument.indexOf('=');
    if (indexOfEqualSign !== -1) {
      // The flag appeared with the "--table=false" form
      const aux = currentArgument.split('=');
      currentArgument = aux[0]!;

      // Anything that isn't "true" will be ignored
      // and the value will be the default (false)
      currentValue = aux[1]!.toLowerCase() === 'true';
    }

    // Flag to catch the path and unknown options
    let isOption = false;

    if (/-(-table|[tsahv]*t[tsahv]*)$/.test(currentArgument)) {
      isOption = true;
      options.table = currentValue;
    }
    if (/-(-sort|[tsahv]*s[tsahv]*)$/.test(currentArgument)) {
      isOption = true;
      const aux: string = argv.shift()!;
      if (typeof aux === 'undefined') {
        throw new TypeError('The sort option require to specify an engine');
      }
      options.sort = aux;
    }
    if (/-(-add|[tsahv]*a[tsahv]*)$/.test(currentArgument)) {
      isOption = true;
      options.add = currentValue;
    }
    if (/-(-help|[tsahv]*h[tsahv]*)$/.test(currentArgument)) {
      isOption = true;
      options.help = currentValue;
    }
    if (/-(-version|[tsahv]*v[tsahv]*)$/.test(currentArgument)) {
      isOption = true;
      options.version = currentValue;
    }

    // The argument isn't an option or is composed of an unknown option
    if (!isOption) {
      if (currentArgument.startsWith('-')) {
        throw new Error(`Invalid option "${currentArgument}"`);
      }
      path = currentArgument;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  if (options.help) return printHelp();
  if (options.version) return console.log(`v${version}`);

  // We calls getPackages to a later table display
  const packages = getPackages(path, options.sort);
  const result = enginesLookup(packages);

  if (options.table) {
    console.table(
      packages.map((x) => ({
        package: `${x.name}@${x.version}`,
        engines: x.engines,
      }))
    );
  }

  if (options.add) {
    const packageJson = JSON.parse(
      readFileSync(`${path}/package.json`, { encoding: 'utf-8' })
    );

    writeFileSync(
      `${path}/package.json`,
      // It uses Prettier's default tabWidth
      JSON.stringify({ ...packageJson, engines: result }, null, 2)
    );
  }

  return console.log(
    `The used engines are:\n${JSON.stringify(result, null, 2)}`
  );
};

// prettier-ignore
const printHelp = (): void => console.log(
`engines-lookup v${version}

A tool to check what engines are advised by the dependencies

Usage: engines-lookup [options] [path]

If a path isn't provided, the program will use "."

Options:
-t, --table
    Shows a table of package's name and advised engines. Default: false

-s, --sort <engine>
    Sorts the table entries by the engine specified. The first entry will
    always be the project at the path. Default: "node"

-a, --add
    Adds the result to the project's package.json file. Default: false

-v, --version
    Displays the current version of engines-lookup

-h, --help
    Shows this help message`);

main();
