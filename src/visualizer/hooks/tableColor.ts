import { useContext } from "react";
import type { TableColors } from "@/visualizer/types/tableColor";
import { TablesColorContext } from "@/visualizer/providers/TablesColorProvider";

export const useTableColor = (table: string): TableColors | undefined => {
  const contextValue = useContext(TablesColorContext);
  if (contextValue == null) {
    throw new Error("it seem you forgot to wrap your app with TablesColorContext");
  }
  return contextValue.tableColors.get(table);
};
