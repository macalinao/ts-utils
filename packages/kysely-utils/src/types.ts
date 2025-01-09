import type {
  ExpressionBuilder,
  OperandExpression,
  QueryCreator,
  SelectQueryBuilder,
  Simplify,
} from "kysely";

/**
 * Gets the return type of a row of a query builder.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryRow<T extends (...args: any[]) => unknown> =
  ReturnType<T> extends SelectQueryBuilder<infer _DB, infer _TB, infer R>
    ? Simplify<R>
    : never;

/**
 * Select query builder.
 */
export type SelectQB<DB> = QueryCreator<DB> | ExpressionBuilder<DB, never>;

/**
 * Expression argument to use in queries -- either a value or an operand expression.
 */
export type ExpressionArg<T> = T | OperandExpression<T>;
