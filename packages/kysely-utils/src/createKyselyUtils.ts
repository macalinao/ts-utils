import type { ExpressionBuilder, QueryCreator, UpdateObject } from "kysely";
import { expressionBuilder } from "kysely";
import type { PrefixMapping } from "zod-extra";

import type { PublicIDHelpers } from "./publicId.js";
import { makePublicIDHelpers } from "./publicId.js";
import type { SelectQB } from "./types.js";
import type { UpdateFieldExpression } from "./update.js";
import { createUpdate, createUpdateFn } from "./update.js";

/**
 * Generates utilities for a Kysely database.
 *
 * Note that this cannot be tree-shaken. This should not matter since this is run server-side.
 */
export interface KyselyUtils<DB, TMapping extends PrefixMapping = PrefixMapping>
  extends PublicIDHelpers<DB, TMapping> {
  createUpdate: <TB extends keyof DB>(
    updates: (UpdateObject<DB, TB> | false | undefined | null)[],
  ) => UpdateObject<DB, TB>;
  createUpdateFn: <TB extends keyof DB, T>(updates: {
    [K in keyof T]: UpdateFieldExpression<DB, TB, T, K>;
  }) => (data: Partial<T>) => UpdateObject<DB, TB>;
  defaultEb: ExpressionBuilder<DB, never>;
}

/**
 * Creates a set of utilities for working with Kysely.
 *
 * @param mapping - The mapping to use for the utilities.
 * @returns A set of utilities for working with Kysely.
 */
export const createKyselyUtils = <DB, TMapping extends PrefixMapping>(
  mapping: TMapping,
): KyselyUtils<DB, TMapping> => {
  return {
    ...makePublicIDHelpers(mapping),
    createUpdate: <TB extends keyof DB>(
      updates: (UpdateObject<DB, TB> | false | undefined | null)[],
    ) => createUpdate<DB, TB>(updates),
    createUpdateFn: <TB extends keyof DB, T>(updates: {
      [K in keyof T]: UpdateFieldExpression<DB, TB, T, K>;
    }) => createUpdateFn<DB, TB, T>(updates),
    defaultEb: expressionBuilder<DB, never>(),
  };
};

/**
 * Helper types for a database.
 */
export interface KyselyTypeUtils<DB> {
  QueryBuilder: QueryCreator<DB>;
  SelectBuilder: SelectQB<DB>;
}
