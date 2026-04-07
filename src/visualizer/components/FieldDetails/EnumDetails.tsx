import { Group } from "react-konva";
import KonvaText from "../dumb/KonvaText";
import { type JSONTableEnum } from "@/types/tableSchema";
import { useThemeColors } from "@/visualizer/hooks/theme";
import { createEnumItemText } from "@/visualizer/utils/createEnumItemText";
import { getLetterApproximateDimension } from "@/visualizer/utils/computeTextSize";

interface EnumDetailsProps {
  enumObject: JSONTableEnum;
  y?: number;
}

const EnumDetails = ({ enumObject, y = 0 }: EnumDetailsProps) => {
  const themeColors = useThemeColors();
  const letterDim = getLetterApproximateDimension();

  return (
    <Group y={y}>
      <KonvaText text={`Enum ${enumObject.name}`} fill={themeColors.white} fontStyle="bold" />
      {enumObject.values.map((item, index) => (
        <KonvaText key={item.name} text={createEnumItemText(item.name)} fill={themeColors.enumItem} y={letterDim.height * (index + 1)} />
      ))}
    </Group>
  );
};

export default EnumDetails;
