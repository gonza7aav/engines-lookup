import {
  Engines,
  Package,
  accumulateEngines,
  getPackages,
  intersectEnginesRanges,
} from './utils';

/**
 * Returns the advised engines in the project and its dependencies.
 *
 * @param {string} path - Indicates the path where the engine lookup starts
 */
export function enginesLookup(path: string): Engines;

/**
 * Returns the advised engines in the packages sent as arguments.
 *
 * @param {Package[]} packages - Array of packages
 */
export function enginesLookup(packages: Package[]): Engines;

export function enginesLookup(args: any): Engines {
  // Checks for a possible type error
  if (typeof args !== 'string' && !Array.isArray(args)) {
    throw new TypeError(
      'The argument must be a string path or an array of Packages.'
    );
  }

  const packages: Package[] = Array.isArray(args) ? args : getPackages(args);

  return intersectEnginesRanges(accumulateEngines(packages));
}

export { getPackages } from './utils';
