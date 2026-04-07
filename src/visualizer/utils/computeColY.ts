import { computeColIndexesKey } from "./computeColIndexes";
import type { RelationItem } from "@/visualizer/types/relation";
import type { ColsIndexesMap } from "@/visualizer/types/tablesInfoProviderValue";
import { COLS_OFFSET_Y_TO_COL_MIDDLE, COLUMN_HEIGHT } from "@/visualizer/constants/sizing";

export const computeColY = (
  colsIndexesMap: ColsIndexesMap,
  relation: RelationItem,
  noteOffset: number = 0,
): number => {
  const indexKey = computeColIndexesKey(relation.tableName, relation.fieldNames[0]);
  const colIndex = colsIndexesMap[indexKey] ?? 0;
  return COLS_OFFSET_Y_TO_COL_MIDDLE + noteOffset + COLUMN_HEIGHT * colIndex;
};
