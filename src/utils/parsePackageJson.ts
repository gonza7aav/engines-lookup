import { existsSync, readFileSync } from 'fs';
import Package from './Package';

/**
 * Returns a simplified representation of the `package.json` if the file exists,
 * `null` otherwise.
 *
 * @param {string} path - A path to a `package.json` file
 */
function parsePackageJson(path: string): Package | null {
  if (!existsSync(`${path}/package.json`)) return null;

  const packageJson = JSON.parse(
    readFileSync(`${path}/package.json`, { encoding: 'utf-8' })
  );

  return {
    name: packageJson.name,
    version: packageJson.version,
    engines: packageJson.engines,
  };
}

export default parsePackageJson;
