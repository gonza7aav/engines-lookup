import Engines from './Engines';

/**
 * Simplified representation of a npm's package.
 *
 * @property {string} name - Indicates the package's name
 * @property {string} version - Indicates the package's semantic versioning
 * @property {Engines} [engines] - Indicates the advised engines by the package
 */
type Package = {
  name: string;
  version: string;
  engines?: Engines;
};

export default Package;
