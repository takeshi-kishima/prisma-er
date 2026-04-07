import { useContext, useMemo, useSyncExternalStore } from "react";
import { type JSONTableTable } from "@/types/tableSchema";
import type { TablesInfoProviderValue } from "@/visualizer/types/tablesInfoProviderValue";
import type { XYPosition } from "@/visualizer/types/positions";
import { TablesInfoContext } from "@/visualizer/providers/TablesInfoProvider";
import { TablesPositionsContext } from "@/visualizer/providers/TablesPositionsProvider";
import { TableDimensionContext } from "@/visualizer/providers/TableDimension";
import { TABLE_DEFAULT_MIN_WIDTH } from "@/visualizer/constants/sizing";
import { getTableLinesText } from "@/visualizer/utils/tableWComputation/getTableLinesText";
import { computeTablePreferredWidth } from "@/visualizer/utils/tableWComputation/computeTablePreferredWidth";
import { tableWidthStore } from "@/visualizer/stores/tableWidth";
import { type TablesPositionsContextValue } from "@/visualizer/types/dimension";
import { tableCoordsStore } from "@/visualizer/stores/tableCoords";

export const useTablesInfo = (): TablesInfoProviderValue => {
  const tablesInfo = useContext(TablesInfoContext);
  if (tablesInfo == null) {
    throw new Error("useTablesInfo must be used within a TableInfoProvider");
  }
  return tablesInfo;
};

export const useTablePositionContext = (): TablesPositionsContextValue => {
  const tablesPositionsMap = useContext(TablesPositionsContext);
  if (tablesPositionsMap == null) {
    throw new Error("useTablePosition must be used within the TablesPositionsContext");
  }
  return tablesPositionsMap;
};

export const useTableDefaultPosition = (tableName: string): XYPosition => {
  const tablesPositions = useSyncExternalStore(
    (callback) => tableCoordsStore.subscribeToReset(callback),
    () => tableCoordsStore.getCoords(tableName),
  );
  return tablesPositions;
};

export const useGetTableMinWidth = (table: JSONTableTable): number => {
  const tableLinesTexts = getTableLinesText(table.fields);
  const minWidth = useMemo(() => {
    const minW = computeTablePreferredWidth(tableLinesTexts, table.name, table.note);
    tableWidthStore.setWidth(table.name, minW);
    return minW;
  }, [tableLinesTexts, table.note]);
  return minWidth;
};

export const useTableWidth = (): number => {
  const contextValue = useContext(TableDimensionContext);
  return contextValue?.width ?? TABLE_DEFAULT_MIN_WIDTH;
};
