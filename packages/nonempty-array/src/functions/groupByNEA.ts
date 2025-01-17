import type { MutableNonEmptyArray } from "../nonEmptyArray.js";

export const groupByNEA = <T, K extends string | number | symbol>(
  list: T[],
  keyFn: (item: T) => K,
): Record<K, MutableNonEmptyArray<T>> => {
  return Object.groupBy(list, keyFn) as Record<K, MutableNonEmptyArray<T>>;
};
