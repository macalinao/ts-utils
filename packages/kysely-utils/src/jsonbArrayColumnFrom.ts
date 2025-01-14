import type { Expression, RawBuilder } from "kysely";
import { sql } from "kysely";

/**
 * Helper to get a JSONB array column from a subquery.
 *
 * This only works in Postgres, and you must return a column `value` from the subquery.
 *
 * @param expr - The subquery to get the json array from
 * @returns The json array column
 */
export const jsonbArrayColumnFrom = <O extends { value: unknown }>(
  expr: Expression<O>,
): RawBuilder<O["value"][]> =>
  sql`(select coalesce(jsonb_agg(value), '[]') from ${expr} as agg)`;
