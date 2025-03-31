import { debounce } from "lodash";

export const createDebouncedFunction = (callback, delay) => {
  return debounce(callback, delay);
};
