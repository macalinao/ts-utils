import type { NonEmptyArray } from "../nonEmptyArray.js";

/**
 * Checks if an array is a non-empty array.
 *
 * @param value - The array to check.
 * @returns Whether the array is a non-empty array.
 */
export const isNEA = <TItem>(
  value: readonly TItem[],
): value is NonEmptyArray<TItem> => value.length > 0;
