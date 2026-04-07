import { useContext } from "react";
import { type JSONTableEnum } from "@/types/tableSchema";
import { EnumsContext } from "@/visualizer/providers/EnumsProvider";
import { type EnumsContextValue } from "@/visualizer/types/enums";

export const useEnums = (): EnumsContextValue => {
  const value = useContext(EnumsContext);
  if (value == null) {
    throw new Error("useEnums must be used within an EnumsProvider");
  }
  return value;
};

export const useGetEnum = (enumName: string): JSONTableEnum | undefined => {
  const value = useEnums();
  return value.enums.find((en) => en.name === enumName);
};
