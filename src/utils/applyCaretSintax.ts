/**
 * Returns a semantic versioning formatted with the caret sintax.
 *
 * For detailed information, see the documentation of the
 * [semver's caret ranges](https://docs.npmjs.com/cli/v6/using-npm/semver#caret-ranges-123-025-004).
 *
 * @param {string} version - A semantic versioning
 *
 * @example
 * ```javascript
 * applyCaretSintax('>=12.2.0 <13.0.0 || >=14.0.0');
 * // ^12.2.0 || >=14.0.0
 * ```
 */
function applyCaretSintax(version: string): string {
  const regex = />=[0-9]+.[0-9]+.[0-9]+ <[0-9]+.[0-9]+.[0-9]+$/;

  return version
    .split('||')
    .map((v) => {
      const aux = v.trim();
      return regex.test(aux) ? `^${aux.slice(2, aux.indexOf(' <'))}` : aux;
    })
    .join(' || ');
}

export default applyCaretSintax;
