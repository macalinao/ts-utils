import { describe, expect, it } from "vitest";

import { formatOrdinal } from "./index.js";

describe("formatOrdinal", () => {
  it("should format 1 as 1st", () => {
    expect(formatOrdinal(1)).toBe("1st");
  });

  it("should format 2 as 2nd", () => {
    expect(formatOrdinal(2)).toBe("2nd");
  });

  it("should format 3 as 3rd", () => {
    expect(formatOrdinal(3)).toBe("3rd");
  });

  it("should format 4 as 4th", () => {
    expect(formatOrdinal(4)).toBe("4th");
  });

  it("should format 11 as 11th", () => {
    expect(formatOrdinal(11)).toBe("11th");
  });

  it("should format 21 as 21st", () => {
    expect(formatOrdinal(21)).toBe("21st");
  });

  it("should format 22 as 22nd", () => {
    expect(formatOrdinal(22)).toBe("22nd");
  });

  it("should format 23 as 23rd", () => {
    expect(formatOrdinal(23)).toBe("23rd");
  });

  it("should format 101 as 101st", () => {
    expect(formatOrdinal(101)).toBe("101st");
  });

  it("should format 111 as 111th", () => {
    expect(formatOrdinal(111)).toBe("111th");
  });

  it("should format 0 as 0th", () => {
    expect(formatOrdinal(0)).toBe("0th");
  });

  it("should format negative numbers correctly", () => {
    expect(formatOrdinal(-1)).toBe("-1st");
    expect(formatOrdinal(-2)).toBe("-2nd");
    expect(formatOrdinal(-3)).toBe("-3rd");
    expect(formatOrdinal(-4)).toBe("-4th");
  });
});
