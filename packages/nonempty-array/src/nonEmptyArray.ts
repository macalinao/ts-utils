/**
 * Represents a readonly array with at least one element.
 */
export type ReadonlyNonEmptyArray<TItem> = readonly [TItem, ...TItem[]];

/**
 * Represents a mutable array with at least one element.
 */
export type MutableNonEmptyArray<TItem> = [TItem, ...TItem[]];

/**
 * Represents an array with at least one element.
 */
export type NonEmptyArray<TItem> =
  | ReadonlyNonEmptyArray<TItem>
  | MutableNonEmptyArray<TItem>;
