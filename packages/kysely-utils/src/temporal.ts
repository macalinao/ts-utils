import type { RawBuilder } from "kysely";
import { sql } from "kysely";
import type { Temporal } from "temporal-spec";

/**
 * Creates a raw builder for an Instant value.
 *
 * @param value - The Instant value to create a raw builder for.
 * @returns A raw builder for the Instant value.
 */
export function instant(value: Temporal.Instant): RawBuilder<Date> {
  return sql`${value.toString()}`;
}

/**
 * Creates a raw builder for a ZonedDateTime value.
 *
 * @param value - The ZonedDateTime value to create a raw builder for.
 * @returns A raw builder for the ZonedDateTime value.
 */
export function zonedDateTime(value: Temporal.ZonedDateTime): RawBuilder<Date> {
  return instant(value.toInstant());
}

/**
 * Creates a raw builder for a PlainDate value.
 *
 * @param value - The PlainDate value to create a raw builder for.
 * @returns A raw builder for the PlainDate value.
 */
export function plainDate(value: Temporal.PlainDate): RawBuilder<string> {
  return sql`${value.toString()}`;
}

/**
 * Creates a raw builder for a PlainTime value.
 *
 * @param value - The PlainTime value to create a raw builder for.
 * @returns A raw builder for the PlainTime value.
 */
export function plainTime(value: Temporal.PlainTime): RawBuilder<string> {
  return sql`${value.toString()}`;
}

/**
 * Creates a raw builder for a PlainDateTime value.
 *
 * @param value - The PlainDateTime value to create a raw builder for.
 * @returns A raw builder for the PlainDateTime value.
 */
export function plainDateTime(
  value: Temporal.PlainDateTime,
): RawBuilder<string> {
  return sql`${value.toString()}`;
}
