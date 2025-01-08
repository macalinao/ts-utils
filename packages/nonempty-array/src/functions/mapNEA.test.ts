import { describe, expect, it } from "vitest";

import type { NonEmptyArray } from "../nonEmptyArray.js";
import { mapNEA } from "./mapNEA.js"; // Adjust the import path as necessary

describe("mapNEA", () => {
  it("should map over a non-empty array and apply the function to each element", () => {
    const input = [1, 2, 3] as const;
    const result = mapNEA(input, (x) => x * 2);
    expect(result).toEqual([2, 4, 6]);
  });

  it("should work for mutable arrays", () => {
    const input = [1, 2, 3] satisfies NonEmptyArray<number>;
    const result = mapNEA(input, (x) => x * 2);
    expect(result).toEqual([2, 4, 6]);
  });

  it("should handle arrays with a single element", () => {
    const input = [5] as const;
    const result = mapNEA(input, (x) => x + 1);
    expect(result).toEqual([6]);
  });

  it("should not modify the original array", () => {
    const input = [1, 2, 3] as const;
    const copy = [...input];
    mapNEA(input, (x) => x * 2);
    expect(input).toEqual(copy);
  });

  it("should work with different types of elements", () => {
    const input = ["a", "b", "c"] as const;
    const result = mapNEA(input, (x) => x.toUpperCase());
    expect(result).toEqual(["A", "B", "C"]);
  });
});
