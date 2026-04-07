import { computeTextSize } from "../computeTextSize";
import { computeTextsMaxWidth } from "../computeTextsMaxWidth";
import { FONT_SIZES, TABLE_DEFAULT_MIN_WIDTH, TABLE_FIELD_TYPE_PADDING } from "@/visualizer/constants/sizing";

export const computeTablePreferredWidth = (tableTexts: string[], tableName: string, note?: string): number => {
  const minColsW = computeTextsMaxWidth(tableTexts);
  const { width: tableNameW } = computeTextSize(tableName, { fontSize: FONT_SIZES.tableTitle });
  const noteW = note ? computeTextSize(note, { fontSize: 11 }).width : 0;
  const maxW = Math.max(minColsW, tableNameW, noteW);
  return Math.max(maxW + TABLE_FIELD_TYPE_PADDING * 2, TABLE_DEFAULT_MIN_WIDTH);
};
