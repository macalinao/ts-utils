import type { NonEmptyArray, ReadonlyNonEmptyArray } from "../nonEmptyArray.js";
import { assertNEA } from "./assertNEA.js";

/**
 * Maps a non-empty array to a new non-empty array.
 *
 * @param items - The non-empty array to map.
 * @param fn - The function to map over the array.
 * @returns A new non-empty array.
 */
export function mapNEA<TItem, TOutput>(
  items: ReadonlyNonEmptyArray<TItem>,
  fn: (el: TItem, index: number) => TOutput,
): NonEmptyArray<TOutput> {
  return assertNEA(items.map(fn));
}
