/**
 * This file contains utilities for working with "prefixed tables" in Kysely.
 *
 * A prefixed table is a table that has a `public_id` column and an `id` column.
 * The `public_id` column is a string that is prefixed with a prefix, and the `id` column is a string that is the raw ID.
 *
 * This is useful for building APIs and for creating type-safe ID types.
 */
import type { Generated, SelectQueryBuilder } from "kysely";
import { expressionBuilder } from "kysely";
import type {
  IDSchemas,
  PrefixedId,
  PrefixedTable,
  PrefixMapping,
} from "zod-extra";
import { makeIDSchemas } from "zod-extra";

import type { ExpressionArg } from "./types.js";

/**
 * Public ID columns for a table.
 */
export type PublicIdColumns<TMapping extends PrefixMapping> = {
  [TTable in PrefixedTable<TMapping>]: {
    public_id: Generated<PrefixedId<TMapping, TTable>>;
  };
};

type PrefixedTableOfDB<
  DB,
  TMapping extends PrefixMapping,
> = PrefixedTable<TMapping> & keyof DB;

/**
 * Union type of all tables that have both a prefixed `public_id` column and a string `id` column.
 */
export type PrefixedTablesWithID<DB, TMapping extends PrefixMapping> = {
  [TTable in PrefixedTableOfDB<DB, TMapping>]: DB[TTable] extends {
    id: string | Generated<string>;
    public_id: Generated<PrefixedId<TMapping, TTable>>;
  }
    ? TTable
    : never;
}[PrefixedTableOfDB<DB, TMapping>];

/**
 * Gets the raw ID from a public ID, nulls allowed.
 * @param tx
 * @param table
 * @param id
 * @returns
 */
export const makeNullablePublicToRawIdExpression = <
  DB,
  TMapping extends PrefixMapping,
  TTable extends PrefixedTablesWithID<DB, TMapping>,
>(
  table: TTable,
  id: ExpressionArg<PrefixedId<TMapping, TTable> | null>,
): SelectQueryBuilder<
  DB,
  TTable,
  {
    id: string | null;
  }
> => {
  return expressionBuilder<DB, TTable>()
    .selectFrom(table)
    .whereRef(
      // @ts-expect-error something wrong with types
      `${table}.public_id`,
      "=",
      (eb) => eb.val(id),
    )
    .select(
      // @ts-expect-error kysely doesn't like these types
      `${table}.id` as const,
    ) as SelectQueryBuilder<
    DB,
    TTable,
    {
      id: string | null;
    }
  >;
};

/**
 * Gets the raw ID from a public ID.
 * @param tx
 * @param table
 * @param id
 * @returns
 */
export const makePublicToRawIdExpression = <
  DB,
  TMapping extends PrefixMapping,
  TTable extends PrefixedTablesWithID<DB, TMapping>,
>(
  table: TTable,
  id: ExpressionArg<PrefixedId<TMapping, TTable>>,
): SelectQueryBuilder<
  DB,
  TTable,
  {
    id: string;
  }
> => {
  return makeNullablePublicToRawIdExpression<DB, TMapping, TTable>(
    table,
    id,
  ).$narrowType<{
    id: string;
  }>();
};

/**
 * Gets the raw ID from a public ID.
 * @param tx
 * @param table
 * @param id
 * @returns
 */
export const makeNullableRawToPublicIdExpression = <
  DB,
  TMapping extends PrefixMapping,
  TTable extends PrefixedTablesWithID<DB, TMapping>,
>(
  table: TTable,
  id: ExpressionArg<string | null>,
): SelectQueryBuilder<
  DB,
  TTable,
  {
    public_id: PrefixedId<TMapping, TTable> | null;
  }
> => {
  return expressionBuilder<DB, TTable>()
    .selectFrom(table)
    .whereRef(
      // @ts-expect-error something wrong with types
      `${table}.id` as const,
      "=",
      (eb) => eb.val(id),
    )
    .select(
      // @ts-expect-error kysely doesn't like these types
      `${table}.public_id` as const,
    ) as SelectQueryBuilder<
    DB,
    TTable,
    {
      public_id: PrefixedId<TMapping, TTable> | null;
    }
  >;
};

export const makeRawToPublicIdExpression = <
  DB,
  TMapping extends PrefixMapping,
  TTable extends PrefixedTablesWithID<DB, TMapping>,
>(
  table: TTable,
  id: ExpressionArg<string>,
): SelectQueryBuilder<
  DB,
  TTable,
  {
    public_id: PrefixedId<TMapping, TTable>;
  }
> => {
  return makeNullableRawToPublicIdExpression<DB, TMapping, TTable>(
    table,
    id,
  ).$narrowType();
};

/**
 * A set of utilities for working with public IDs.
 */
export interface PublicIDHelpers<DB, TMapping extends PrefixMapping> {
  publicToRawId: <TTable extends PrefixedTablesWithID<DB, TMapping>>(
    table: TTable,
    id: ExpressionArg<PrefixedId<TMapping, TTable>>,
  ) => SelectQueryBuilder<
    DB,
    TTable,
    {
      id: string;
    }
  >;
  publicToRawIdNullable: <TTable extends PrefixedTablesWithID<DB, TMapping>>(
    table: TTable,
    id: ExpressionArg<PrefixedId<TMapping, TTable> | null>,
  ) => SelectQueryBuilder<
    DB,
    TTable,
    {
      id: string | null;
    }
  >;
  rawToPublicId: <TTable extends PrefixedTablesWithID<DB, TMapping>>(
    table: TTable,
    id: ExpressionArg<string>,
  ) => SelectQueryBuilder<
    DB,
    TTable,
    { public_id: PrefixedId<TMapping, TTable> }
  >;
  rawToPublicIdNullable: <TTable extends PrefixedTablesWithID<DB, TMapping>>(
    table: TTable,
    id: ExpressionArg<string | null>,
  ) => SelectQueryBuilder<
    DB,
    TTable,
    { public_id: PrefixedId<TMapping, TTable> | null }
  >;
  zId: IDSchemas<TMapping>;
}

/**
 * Creates a set of utilities for working with public IDs.
 * @param db
 * @param mapping
 * @returns
 */
export const makePublicIDHelpers = <DB, TMapping extends PrefixMapping>(
  mapping: TMapping,
): PublicIDHelpers<DB, TMapping> => {
  return {
    publicToRawId: (table, id) =>
      makePublicToRawIdExpression<DB, TMapping, typeof table>(table, id),
    publicToRawIdNullable: (table, id) =>
      makeNullablePublicToRawIdExpression<DB, TMapping, typeof table>(
        table,
        id,
      ),
    rawToPublicId: (table, id) =>
      makeRawToPublicIdExpression<DB, TMapping, typeof table>(table, id),
    rawToPublicIdNullable: (table, id) =>
      makeNullableRawToPublicIdExpression<DB, TMapping, typeof table>(
        table,
        id,
      ),
    zId: makeIDSchemas<TMapping>(mapping),
  };
};
