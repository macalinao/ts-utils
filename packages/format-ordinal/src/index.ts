const pr = new Intl.PluralRules("en-US", { type: "ordinal" });

const suffixes = {
  one: "st",
  two: "nd",
  few: "rd",
  many: "th",
  zero: "th",
  other: "th",
} as const;

export const formatOrdinal = (n: number): string => {
  const rule = pr.select(n);
  const suffix = suffixes[rule];
  return `${n.toLocaleString()}${suffix}`;
};
