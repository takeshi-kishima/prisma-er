import { createContext, useMemo, type ReactNode } from "react";
import type { TableDimensionProviderValue } from "@/visualizer/types/table";

export const TableDimensionContext = createContext<TableDimensionProviderValue | undefined>(undefined);

interface TablesInfoProviderProps {
  width: number;
  children: ReactNode;
}

const TableDimensionProvider = ({ children, width }: TablesInfoProviderProps) => {
  const contextValue = useMemo(() => ({ width }), [width]);
  return <TableDimensionContext.Provider value={contextValue}>{children}</TableDimensionContext.Provider>;
};

export default TableDimensionProvider;
