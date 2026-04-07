import { type JSONTableTable } from "@/types/tableSchema";
import computeFieldDisplayTypeName from "../getFieldType";

export const getTableLinesText = (fields: JSONTableTable["fields"]): string[] => {
  return fields.map((field) => `${field.name} ${computeFieldDisplayTypeName(field)}`);
};
