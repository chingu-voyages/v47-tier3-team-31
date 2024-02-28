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

export function loadCheckboxStateFromLocalStorage(): { [key in string]: boolean } | null {
  const state = localStorage.getItem('categoryCheckboxState');
  if (state) return JSON.parse(state);
  return null;
}

/* Take in a list of slugs and the enum associated with the slugs. The slugs will render their checkboxes as checked,
and the other enums will render their checkboxes as unchecked */
export function generateInitialCheckboxStateFromArray(
  elements: string[],
  fromObject: Object,
): { [key in string]: boolean } {
  let state: { [key in string]: boolean } = {};
  Object.values(fromObject).map((el: string) => (state[el] = elements.includes(el)));
  return state;
}
