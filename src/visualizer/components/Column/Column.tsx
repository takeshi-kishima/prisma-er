import KonvaText from "../dumb/KonvaText";
import FieldDetails from "../FieldDetails/FieldDetails";
import ColumnWrapper from "./ColumnWrapper";
import { useTableColor } from "@/visualizer/hooks/tableColor";
import { COLUMN_HEIGHT, FONT_SIZES, PADDINGS, TABLE_FIELD_TYPE_PADDING } from "@/visualizer/constants/sizing";
import { useThemeColors } from "@/visualizer/hooks/theme";
import { useTableWidth } from "@/visualizer/hooks/table";

interface ColumnProps {
  colName: string;
  tableName: string;
  type: string;
  isPrimaryKey?: boolean;
  isEnum: boolean;
  relationalTables?: string[] | null;
  offsetY?: number;
  note?: string;
}

const Column = ({ colName, tableName, type, isPrimaryKey = false, offsetY, relationalTables, isEnum, note }: ColumnProps) => {
  const themeColors = useThemeColors();
  const tableColors = useTableColor(tableName);
  const tablePreferredWidth = useTableWidth();

  const colTextColor = themeColors.text[900];
  const typeTextColor = themeColors.text[700];
  const fontStyle = isPrimaryKey ? "bold" : "normal";
  const colNameBaseFill = isPrimaryKey ? tableColors?.regular ?? colTextColor : colTextColor;

  return (
    <ColumnWrapper highlightColor={tableColors?.lighter ?? themeColors.colAccent} relationalTables={relationalTables} offsetY={offsetY} tableName={tableName} columnName={colName}>
      {(highlighted) => (
        <>
          <KonvaText ellipsis wrap="none" text={colName} fill={highlighted ? tableColors?.regular ?? colNameBaseFill : colNameBaseFill} width={tablePreferredWidth} fontStyle={fontStyle} padding={PADDINGS.sm} height={COLUMN_HEIGHT} fontSize={FONT_SIZES.md} />
          <KonvaText text={type} align="right" width={tablePreferredWidth} fill={(highlighted && tableColors?.regular) || typeTextColor} padding={TABLE_FIELD_TYPE_PADDING} fontStyle={fontStyle} fontSize={FONT_SIZES.md} height={COLUMN_HEIGHT} />
          {note != null || isEnum ? <FieldDetails note={note ?? ""} enumName={type} /> : null}
        </>
      )}
    </ColumnWrapper>
  );
};

export default Column;
