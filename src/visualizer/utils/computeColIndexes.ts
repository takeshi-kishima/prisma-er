import { filterByDetailLevel } from "./filterByDetailLevel";
import type { ColsIndexesMap } from "@/visualizer/types/tablesInfoProviderValue";
import type { JSONTableTable } from "@/types/tableSchema";
import { TableDetailLevel } from "@/visualizer/types/tableDetailLevel";

export const computeColIndexes = (
  tables: JSONTableTable[],
  detailLevel: TableDetailLevel,
): ColsIndexesMap => {
  if (detailLevel === TableDetailLevel.HeaderOnly) return {};
  return tables.reduce<ColsIndexesMap>((acc, table) => {
    const currentTableColsIndexes = filterByDetailLevel(table.fields, detailLevel)
      .reduce<ColsIndexesMap>((tableAcc, field, index) => {
        return { ...tableAcc, [computeColIndexesKey(table.name, field.name)]: index };
      }, {});
    return { ...acc, ...currentTableColsIndexes };
  }, {});
};

export const computeColIndexesKey = (tableName: string, attr: string): string => {
  return `${tableName}.${attr}`;
};
