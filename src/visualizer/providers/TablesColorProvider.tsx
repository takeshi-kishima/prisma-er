import { createContext, useMemo, type ReactNode } from "react";
import { type JSONTableTable } from "@/types/tableSchema";
import type { TableColorContextValue } from "@/visualizer/types/tableColor";
import { createTablesColorMap } from "@/visualizer/utils/createTablesColorMap";

export const TablesColorContext = createContext<TableColorContextValue | null>(null);

interface TablesColorProviderProps {
  children: ReactNode;
  tables: JSONTableTable[];
}

const TablesColorProvider = ({ children, tables }: TablesColorProviderProps) => {
  const tableColors = useMemo(() => createTablesColorMap(tables), [tables]);
  return <TablesColorContext.Provider value={{ tableColors }}>{children}</TablesColorContext.Provider>;
};

export default TablesColorProvider;
