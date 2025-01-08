import type { NonEmptyArray } from "../nonEmptyArray.js";
import { toNEA } from "./toNEA.js";

/**
 * Asserts that an array is a non-empty array, returning the array if it is.
 *
 * @param value - The array to assert.
 * @returns The non-empty array.
 */
export const assertNEA = <TItem>(
  value: readonly TItem[],
): NonEmptyArray<TItem> => {
  const result = toNEA(value);
  if (!result) {
    throw new Error("Array is empty");
  }
  return result;
};
