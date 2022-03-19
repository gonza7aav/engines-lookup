import Package from './Package';
import EnginesAccumulator from './EnginesAccumulator';

/**
 * Returns an EnginesAccumulator according to the packages received.
 *
 * @example
 * ```javascript
 * accumulateEngines([
 *  {
 *    name: "x",
 *    version: "0.1",
 *    engines: {
 *      node: ">=14.0.3",
 *      npm: ">=7.0.0"
 *    }
 *  },
 *  {
 *    name: "y",
 *    version: "0.2",
 *    engines: {
 *      node: "^12.2.0 || >=14.0.0"
 *    }
 *  },
 *  {
 *    name: "z",
 *    version: "0.3"
 *  },
 * ]);
 * // {
 * //   npm: [
 * //     ">=7.0.0"
 * //   ],
 * //   node: [
 * //     ">=14.0.3",
 * //     "^12.2.0 || >=14.0.0"
 * //   ],
 * // }
 * ```
 */
function accumulateEngines(packages: Package[]): EnginesAccumulator {
  const accumulator: EnginesAccumulator = {};

  // Filters packages with no engines property,
  // then adds packages engines to the accumulator
  packages
    .filter((p) => typeof p.engines !== 'undefined')
    .forEach((p) => {
      Object.keys(p.engines!).forEach((key) => {
        accumulator[key] = [
          ...((Array.isArray(accumulator[key])
            ? accumulator[key]
            : []) as string[]),
          p.engines![key]!,
        ];
      });
    });

  return accumulator;
}

export default accumulateEngines;
