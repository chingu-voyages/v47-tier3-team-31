/**
 * Takes an object and returns a new object with the same keys, but with all values set to false
 * @param fromObject
 * @returns
 */
export function generateInitialCheckboxState(fromObject: Object): { [key in string]: boolean } {
  let state: { [key in string]: boolean } = {};
  Object.values(fromObject).map((element: string) => (state[element] = false));
  return state;
}
