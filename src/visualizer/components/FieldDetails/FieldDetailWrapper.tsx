import { Group, Rect, Line } from "react-konva";
import { type ReactNode } from "react";
import { COLUMN_HEIGHT, PADDINGS } from "@/visualizer/constants/sizing";
import { useThemeColors } from "@/visualizer/hooks/theme";
import { useTableWidth } from "@/visualizer/hooks/table";
import { computeCaretPoints } from "@/visualizer/utils/computeCaretPoints";

interface FieldDetailWrapperProps {
  children: ReactNode;
  width: number;
  height: number;
}

const FieldDetailWrapper = ({ children, width, height }: FieldDetailWrapperProps) => {
  const themeColors = useThemeColors();
  const tablePreferredWidth = useTableWidth();
  const caretPoints = computeCaretPoints(tablePreferredWidth, COLUMN_HEIGHT);

  return (
    <Group x={tablePreferredWidth}>
      <Line points={caretPoints} fill={themeColors.noteBg} closed />
      <Group x={PADDINGS.xs}>
        <Rect fill={themeColors.noteBg} width={width} height={height} cornerRadius={PADDINGS.xs} />
        <Group x={PADDINGS.xs} y={PADDINGS.xs}>
          {children}
        </Group>
      </Group>
    </Group>
  );
};

export default FieldDetailWrapper;
