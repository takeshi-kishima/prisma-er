import { type JSONTableEnum } from "@/types/tableSchema";
import { computeTextsMaxWidth } from "./computeTextsMaxWidth";
import { createEnumItemText } from "./createEnumItemText";

export const computeEnumDetailBoxMaxW = (enumObject: JSONTableEnum): number => {
  const titleText = `Enum ${enumObject.name}`;
  const itemsTexts = enumObject.values.map((item) => createEnumItemText(item.name));
  return computeTextsMaxWidth([titleText, ...itemsTexts]);
};
