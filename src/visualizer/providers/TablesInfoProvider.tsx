import { createContext, useState, type ReactNode } from "react";
import type { TablesInfoProviderValue } from "@/visualizer/types/tablesInfoProviderValue";
import type { JSONTableTable } from "@/types/tableSchema";
import { computeColIndexes } from "@/visualizer/utils/computeColIndexes";
import { useTableDetailLevel } from "@/visualizer/hooks/tableDetailLevel";

export const TablesInfoContext = createContext<TablesInfoProviderValue | undefined>(undefined);

interface TablesInfoProviderProps {
  tables: JSONTableTable[];
  children: ReactNode;
}

const TablesInfoProvider = ({ children, tables }: TablesInfoProviderProps) => {
  const [hoveredTableName, setHoveredTableName] = useState<string | null>(null);
  const [highlightedColumns, setHighlightedColumns] = useState<string[]>([]);
  const { detailLevel } = useTableDetailLevel();
  const colsIndexes = computeColIndexes(tables, detailLevel);

  return (
    <TablesInfoContext.Provider
      value={{ colsIndexes, hoveredTableName, setHoveredTableName, highlightedColumns, setHighlightedColumns }}
    >
      {children}
    </TablesInfoContext.Provider>
  );
};

export default TablesInfoProvider;
