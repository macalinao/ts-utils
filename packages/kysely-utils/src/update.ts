import type { UpdateKeys, UpdateObject } from "kysely";

/**
 * Creates an update object from an array of update objects.
 *
 * @param updates - An array of update objects.
 * @returns An update object.
 */
export const createUpdate = <DB, TB extends keyof DB>(
  updates: (UpdateObject<DB, TB> | false | undefined | null)[],
): UpdateObject<DB, TB> => {
  return Object.assign({}, ...updates.filter(Boolean)) as UpdateObject<DB, TB>;
};

export type UpdateFieldFn<DB, TB extends keyof DB, T, K extends keyof T> = (
  v: Required<T>[K],
) => UpdateObject<DB, TB> | false | undefined | null;

export type UpdateFieldExpression<
  DB,
  TB extends keyof DB,
  T,
  K extends keyof T,
> = UpdateKeys<DB[TB]> | UpdateFieldFn<DB, TB, T, K>;

/**
 * Creates an update function from an object of update expressions.
 *
 * @param updates - An object of update expressions.
 * @returns An update function.
 */
export const createUpdateFn =
  <DB, TB extends keyof DB, T>(updates: {
    [K in keyof T]: UpdateFieldExpression<DB, TB, T, K>;
  }) =>
  (data: Partial<T>): UpdateObject<DB, TB> => {
    const update = Object.entries(updates).map((entry) => {
      const [key, expression] = entry as [
        keyof T,
        UpdateFieldExpression<DB, TB, T, keyof T>,
      ];
      const value = data[key];
      if (value === undefined) {
        return false;
      }
      if (typeof expression === "function") {
        return expression(value);
      } else {
        return {
          [expression]: value,
        } as UpdateObject<DB, TB>;
      }
    });
    return createUpdate<DB, TB>(update);
  };
