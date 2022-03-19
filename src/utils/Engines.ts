/**
 * Representation of `package.json`'s property "engines".
 *
 * For detailed information, see the documentation of the
 * [package.json's engines](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#engines).
 *
 * @property {string} [node] - Indicates the advised node engine
 */
type Engines = {
  node?: string;
  [key: string]: string;
};

export default Engines;
