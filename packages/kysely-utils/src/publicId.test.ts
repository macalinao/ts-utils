import type { Generated } from "kysely";
import { describe, expect, it } from "vitest";

import { compileQueryBuilder } from "./compileQueryBuilder.js";
import type { PublicIdColumns } from "./publicId.js";
import { makePublicIDHelpers } from "./publicId.js"; // Adjust the import path as necessary

export const mapping = {
  users: "usr",
};

type DB = {
  users: {
    id: Generated<string>;
  };
} & PublicIdColumns<typeof mapping>;

const { publicToRawId, rawToPublicId } = makePublicIDHelpers<
  DB,
  typeof mapping
>(mapping);

describe("publicId", () => {
  it("should convert a valid raw ID to a public ID", () => {
    const rawId = "12345";
    const result = compileQueryBuilder(rawToPublicId("users", rawId));
    expect(result.sql).toBe(
      `select "users"."public_id" from "users" where "users"."id" = $1`,
    );
    expect(result.parameters).toEqual([rawId]);
  });

  it("should convert a valid public ID to a raw ID", () => {
    const publicId = "usr_12345";
    const result = compileQueryBuilder(publicToRawId("users", publicId));
    expect(result.sql).toBe(
      `select "users"."id" from "users" where "users"."public_id" = $1`,
    );
    expect(result.parameters).toEqual([publicId]);
  });
});
