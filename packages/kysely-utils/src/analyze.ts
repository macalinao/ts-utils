import type { Explainable } from "kysely";
import { sql } from "kysely";

export const explainQuery = async (qb: Explainable): Promise<string> => {
  return (await qb.explain("text", sql`ANALYZE, BUFFERS`))
    .map((r: { "QUERY PLAN"?: string }) => r["QUERY PLAN"] ?? "")
    .join("\n");
};
