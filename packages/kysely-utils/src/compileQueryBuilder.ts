import type { CompiledQuery, RootOperationNode } from "kysely";
import { PostgresQueryCompiler } from "kysely";

const compiler = new PostgresQueryCompiler();

export const compileRootOperationNode = (
  node: RootOperationNode,
): CompiledQuery => {
  return compiler.compileQuery(node);
};

/**
 * Compiles a Kysely query builder to a compiled query.
 *
 * @param query - The Kysely query to convert.
 * @returns The SQL string.
 */
export const compileQueryBuilder = (query: {
  toOperationNode: () => RootOperationNode;
}): CompiledQuery => {
  return compileRootOperationNode(query.toOperationNode());
};
