import EnumDetails from "./EnumDetails";
import FieldDetailWrapper from "./FieldDetailWrapper";
import { useGetEnum } from "@/visualizer/hooks/enums";
import { computeFieldDetailBoxDimension } from "@/visualizer/utils/computeFieldDetailBoxDimension";
import KonvaText from "../dumb/KonvaText";
import { useThemeColors } from "@/visualizer/hooks/theme";

interface FieldDetailsProps {
  note: string;
  enumName: string;
}

const FieldDetails = ({ note, enumName }: FieldDetailsProps) => {
  const enumObject = useGetEnum(enumName);
  const themeColors = useThemeColors();

  if (enumObject === undefined && !note) return null;

  const { w, h, noteH } = computeFieldDetailBoxDimension(note || undefined, enumObject);

  return (
    <FieldDetailWrapper width={w} height={h}>
      {note ? <KonvaText text={note} fill={themeColors.white} width={w} /> : null}
      {enumObject !== undefined ? <EnumDetails enumObject={enumObject} y={noteH} /> : null}
    </FieldDetailWrapper>
  );
};

export default FieldDetails;
