import type { Generated, RootOperationNode } from "kysely";
import { describe, expect, it } from "vitest";

import { compileRootOperationNode } from "./compileQueryBuilder.js";
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
    const result = compileRootOperationNode(
      rawToPublicId("users", rawId).toOperationNode() as RootOperationNode,
    );
    expect(result.sql).toBe(
      `select "users"."public_id" from "users" where "users"."id" = $1`,
    );
    expect(result.parameters).toEqual([rawId]);
  });

  it("should convert a valid public ID to a raw ID", () => {
    const publicId = "usr_12345";
    const result = compileRootOperationNode(
      publicToRawId("users", publicId).toOperationNode() as RootOperationNode,
    );
    expect(result.sql).toBe(
      `select "users"."id" from "users" where "users"."public_id" = $1`,
    );
    expect(result.parameters).toEqual([publicId]);
  });
});
