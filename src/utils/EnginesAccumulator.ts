/**
 * Representation of all engines' versions advised by the dependencies, where
 * each property of the object (or engine) is an array of semver strings.
 */
type EnginesAccumulator = {
  node?: string[];
  [key: string]: string[];
};

export default EnginesAccumulator;
