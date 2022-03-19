import { intersect } from 'semver-range-intersect';
import Engines from './Engines';
import EnginesAccumulator from './EnginesAccumulator';
import applyCaretSintax from './applyCaretSintax';

/**
 * Returns the intersection of the Engines accumulated.
 *
 * @example
 * ```javascript
 * intersectEnginesRanges({
 *  npm: [
 *    ">=7.0.3",
 *    "^7.0.0 || >=8.0.0"
 *  ],
 *  node: [
 *    ">=14.0.0",
 *    "^12.2.0 || >=14.0.3"
 *  ]
 * });
 * // {
 * //   npm: "^7.0.3 | >=8.0.0",
 * //   node: ">=14.0.3"
 * // }
 * ```
 */
function intersectEnginesRanges(
  engineAccumulator: EnginesAccumulator
): Engines {
  const enginesIntersections: Engines = {};

  Object.keys(engineAccumulator).forEach((key) => {
    const intersection: string | null = intersect(...engineAccumulator[key]!);
    if (intersection === null) {
      throw new Error(`Can't intersect ${key} semver ranges`);
    }
    enginesIntersections[key] = applyCaretSintax(intersection);
  });

  return enginesIntersections;
}

export default intersectEnginesRanges;
