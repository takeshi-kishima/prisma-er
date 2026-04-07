import { useContext } from "react";
import { TableDetailLevelContext } from "@/visualizer/providers/TableDetailLevelProvider";
import { type TableDetailLevel } from "@/visualizer/types/tableDetailLevel";

export const useTableDetailLevel = (): { detailLevel: TableDetailLevel; next: () => void } => {
  const contextValue = useContext(TableDetailLevelContext);
  if (contextValue === undefined) {
    throw new Error("it seem you forgot to wrap your app with TableDetailLevelProvider");
  }
  return contextValue;
};
