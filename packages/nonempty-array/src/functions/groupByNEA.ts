import type { NonEmptyArray } from "../nonEmptyArray.js";

export const groupByNEA = <T, K extends string | number | symbol>(
  list: T[],
  keyFn: (item: T) => K,
): Record<K, NonEmptyArray<T>> => {
  return Object.groupBy(list, keyFn) as Record<K, NonEmptyArray<T>>;
};
