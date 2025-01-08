import type { NonEmptyArray } from "../nonEmptyArray.js";
import { assertNEA } from "./assertNEA.js";

export function typedObjectKeys<T extends Record<string, unknown>>(
  obj: T,
): NonEmptyArray<keyof T> {
  return assertNEA(Object.keys(obj));
}
