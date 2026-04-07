import { Group, Rect } from "react-konva";
import KonvaText from "./dumb/KonvaText";
import { COLUMN_HEIGHT, FONT_SIZES, PADDINGS, TABLE_COLOR_HEIGHT } from "@/visualizer/constants/sizing";
import { useThemeColors } from "@/visualizer/hooks/theme";
import { useTableColor } from "@/visualizer/hooks/tableColor";
import { useTableWidth } from "@/visualizer/hooks/table";

interface TableHeaderProps {
  title: string;
  note?: string;
}

const NOTE_HEIGHT = 20;

export { NOTE_HEIGHT };

const TableHeader = ({ title, note }: TableHeaderProps) => {
  const themeColors = useThemeColors();
  const tableColors = useTableColor(title);
  const tablePreferredWidth = useTableWidth();
  const tableMarkerColor = tableColors?.regular ?? "red";

  return (
    <Group>
      <Rect cornerRadius={[PADDINGS.sm, PADDINGS.sm]} fill={tableMarkerColor} height={TABLE_COLOR_HEIGHT} width={tablePreferredWidth} />
      <Rect y={TABLE_COLOR_HEIGHT} fill={themeColors.tableHeader.bg} width={tablePreferredWidth} height={COLUMN_HEIGHT} />
      <KonvaText text={title} y={TABLE_COLOR_HEIGHT} fill={themeColors.tableHeader.fg} width={tablePreferredWidth} height={COLUMN_HEIGHT} align="center" strokeWidth={PADDINGS.xs} padding={PADDINGS.xs} fontSize={FONT_SIZES.tableTitle} />
      {note ? (
        <>
          <Rect y={TABLE_COLOR_HEIGHT + COLUMN_HEIGHT} fill={themeColors.tableHeader.bg} width={tablePreferredWidth} height={NOTE_HEIGHT} />
          <KonvaText text={note} y={TABLE_COLOR_HEIGHT + COLUMN_HEIGHT} fill={themeColors.text[700]} width={tablePreferredWidth} height={NOTE_HEIGHT} align="center" padding={2} fontSize={11} />
        </>
      ) : null}
    </Group>
  );
};

export default TableHeader;
