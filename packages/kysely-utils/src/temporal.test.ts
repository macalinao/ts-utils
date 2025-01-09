import { PostgresQueryCompiler } from "kysely";
import { Temporal } from "temporal-polyfill";
import { describe, expect, it } from "vitest";

import { instant, plainDate, zonedDateTime } from "./temporal.js";

const compiler = new PostgresQueryCompiler();

describe("temporal utilities", () => {
  it("should create a valid SQL string for Temporal.Instant", () => {
    const instantValue = Temporal.Instant.from("2023-10-04T10:00:00Z");
    const result = instant(instantValue);
    expect(
      compiler.compileQuery(result.toOperationNode()).parameters,
    ).toStrictEqual(["2023-10-04T10:00:00Z"]);
  });

  it("should create a valid SQL string for Temporal.ZonedDateTime", () => {
    const zonedDateTimeValue = Temporal.ZonedDateTime.from(
      "2023-10-04T10:00:00+01:00[Europe/London]",
    );
    const result = zonedDateTime(zonedDateTimeValue);
    expect(
      compiler.compileQuery(result.toOperationNode()).parameters,
    ).toStrictEqual(["2023-10-04T09:00:00Z"]);
  });

  it("should create a valid SQL string for Temporal.PlainDate", () => {
    const plainDateValue = Temporal.PlainDate.from("2023-10-04");
    const result = plainDate(plainDateValue);
    expect(
      compiler.compileQuery(result.toOperationNode()).parameters,
    ).toStrictEqual(["2023-10-04"]);
  });
});
