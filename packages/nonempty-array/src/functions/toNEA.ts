import type { NonEmptyArray } from "../nonEmptyArray.js";
import { isNEA } from "./isNEA.js";

/**
 * Converts an array to a non-empty array.
 *
 * If the array is empty, returns `null`.
 *
 * @param value - The array to convert.
 * @returns The non-empty array or `null` if the array is empty.
 */
export const toNEA = <TItem>(
  value: readonly TItem[],
): NonEmptyArray<TItem> | null => {
  if (!isNEA(value)) {
    return null;
  }
  return value;
};
