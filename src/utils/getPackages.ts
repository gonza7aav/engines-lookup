import { existsSync, readdirSync } from 'fs';
import cmp from 'semver-compare-range';
import Package from './Package';
import parsePackageJson from './parsePackageJson';

/**
 * Returns the project with its dependencies as an array of sorted packages
 * (the project will always be first).
 *
 * @param {string} path - Path of the project
 * @param {string} [sortEngine] - Engine by which the packages are sorted. Default: "node"
 */
function getPackages(path: string, sortEngine = 'node'): Package[] {
  const packagesAccumulator: Package[] = [];

  const modulesPath = `${path}/node_modules`;
  if (existsSync(modulesPath)) {
    const modulesFolders: string[] = readdirSync(modulesPath);
    // Adds the dependencies package.json to the accumulator
    modulesFolders.forEach((folder) => {
      const aux = parsePackageJson(`${modulesPath}/${folder}`);
      if (aux !== null) packagesAccumulator.push(aux);
    });
  }

  packagesAccumulator.sort((a: Package, b: Package): -1 | 0 | 1 => {
    const aEnginesExists =
      typeof a.engines !== 'undefined' &&
      typeof a.engines[sortEngine] !== 'undefined';
    const bEnginesExists =
      typeof b.engines !== 'undefined' &&
      typeof b.engines[sortEngine] !== 'undefined';

    if (!aEnginesExists && !bEnginesExists) return 0;
    if (aEnginesExists && !bEnginesExists) return -1;
    if (!aEnginesExists && bEnginesExists) return 1;

    // semver-compare-range can't compare two equals open ranges because it fails
    // at line 57 when trying to access the upper limit (that doesn't exists).
    // So, if these two are equal in the lower limit and the error happen,
    // then return 0 (equal)
    try {
      // semver-compare-range sorts ascending, so multiply by -1 to descending
      // @ts-expect-error The multiplication by -1 only changes the polarity
      return -1 * cmp(a.engines![sortEngine], b.engines![sortEngine]);
    } catch (e) {
      return 0;
    }
  });

  // Adds the project's package.json to the beginning
  const projectPackage = parsePackageJson(path);
  if (projectPackage !== null) packagesAccumulator.unshift(projectPackage);

  return packagesAccumulator;
}

export default getPackages;
