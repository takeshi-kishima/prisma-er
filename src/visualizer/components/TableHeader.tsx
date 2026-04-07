import { Group, Rect } from "react-konva";
import KonvaText from "./dumb/KonvaText";
import { COLUMN_HEIGHT, FONT_SIZES, PADDINGS, TABLE_COLOR_HEIGHT } from "@/visualizer/constants/sizing";
import { useThemeColors } from "@/visualizer/hooks/theme";
import { useTableColor } from "@/visualizer/hooks/tableColor";
import { useTableWidth } from "@/visualizer/hooks/table";

interface TableHeaderProps {
  title: string;
}

const TableHeader = ({ title }: TableHeaderProps) => {
  const themeColors = useThemeColors();
  const tableColors = useTableColor(title);
  const tablePreferredWidth = useTableWidth();
  const tableMarkerColor = tableColors?.regular ?? "red";

  return (
    <Group>
      <Rect cornerRadius={[PADDINGS.sm, PADDINGS.sm]} fill={tableMarkerColor} height={TABLE_COLOR_HEIGHT} width={tablePreferredWidth} />
      <Rect y={TABLE_COLOR_HEIGHT} fill={themeColors.tableHeader.bg} width={tablePreferredWidth} height={COLUMN_HEIGHT} />
      <KonvaText text={title} y={TABLE_COLOR_HEIGHT} fill={themeColors.tableHeader.fg} width={tablePreferredWidth} height={COLUMN_HEIGHT} align="center" strokeWidth={PADDINGS.xs} padding={PADDINGS.xs} fontSize={FONT_SIZES.tableTitle} />
    </Group>
  );
};

export default TableHeader;
