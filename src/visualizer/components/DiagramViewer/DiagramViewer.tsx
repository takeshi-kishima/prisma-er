import { type JSONTableEnum, type JSONTableRef, type JSONTableTable } from "@/types/tableSchema";
import EmptyTableMessage from "../Messages/EmptyTableMessage";
import Search from "../Search/Search";
import DiagramWrapper from "./DiagramWrapper";
import RelationsConnections from "./Connections";
import Tables from "./Tables";
import TablesPositionsProvider from "@/visualizer/providers/TablesPositionsProvider";
import MainProviders from "@/visualizer/providers/MainProviders";
import TableLevelDetailProvider from "@/visualizer/providers/TableDetailLevelProvider";
import { useThemeContext } from "@/visualizer/hooks/theme";
import { Theme } from "@/visualizer/types/theme";

interface DiagramViewerProps {
  tables: JSONTableTable[];
  refs: JSONTableRef[];
  enums: JSONTableEnum[];
}

const DiagramViewer = ({ refs, tables, enums }: DiagramViewerProps) => {
  const { theme } = useThemeContext();

  if (tables.length === 0) return <EmptyTableMessage />;

  return (
    <TableLevelDetailProvider>
      <TablesPositionsProvider tables={tables} refs={refs}>
        <MainProviders tables={tables} enums={enums}>
          <main className={`relative flex flex-col items-center ${theme === Theme.dark ? "dark" : ""}`}>
            <Search tables={tables} />
            <DiagramWrapper>
              <RelationsConnections refs={refs} />
              <Tables tables={tables} />
            </DiagramWrapper>
          </main>
        </MainProviders>
      </TablesPositionsProvider>
    </TableLevelDetailProvider>
  );
};

export default DiagramViewer;
