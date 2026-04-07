import { createContext, useState, type ReactNode } from "react";
import type { TablesInfoProviderValue } from "@/visualizer/types/tablesInfoProviderValue";
import type { JSONTableTable } from "@/types/tableSchema";
import { computeColIndexes } from "@/visualizer/utils/computeColIndexes";
import { useTableDetailLevel } from "@/visualizer/hooks/tableDetailLevel";
import { NOTE_HEIGHT } from "@/visualizer/components/TableHeader";

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
  const tableNoteOffsets: Record<string, number> = {};
  tables.forEach((t) => { if (t.note) tableNoteOffsets[t.name] = NOTE_HEIGHT; });

  return (
    <TablesInfoContext.Provider
      value={{ colsIndexes, tableNoteOffsets, hoveredTableName, setHoveredTableName, highlightedColumns, setHighlightedColumns }}
    >
      {children}
    </TablesInfoContext.Provider>
  );
};

export default TablesInfoProvider;
