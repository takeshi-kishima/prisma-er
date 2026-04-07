import { Path } from "react-konva";
import { useThemeColors } from "@/visualizer/hooks/theme";
import { CONNECTION_STROKE } from "@/visualizer/constants/sizing";

interface ConnectionPathProps {
  pathData: string;
  isHighlighted?: boolean;
}

const ConnectionPath = ({ pathData, isHighlighted = false }: ConnectionPathProps) => {
  const themeColors = useThemeColors();
  const strokeColor = isHighlighted ? themeColors.connection.active : themeColors.connection.default;

  return (
    <Path data={pathData} stroke={strokeColor} strokeWidth={CONNECTION_STROKE} fill="transparent" listening={false} />
  );
};

export default ConnectionPath;
