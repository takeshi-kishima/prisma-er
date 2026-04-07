import { type JSONTableTable } from "@/types/tableSchema";
import TableDimensionProvider from "@/visualizer/providers/TableDimension";
import { useGetTableMinWidth } from "@/visualizer/hooks/table";
import Table from "./Table";

interface TableWrapperProps {
  table: JSONTableTable;
}

const TableWrapper = ({ table }: TableWrapperProps) => {
  const tableMinWidth = useGetTableMinWidth(table);

  return (
    <TableDimensionProvider width={tableMinWidth}>
      <Table {...table} />
    </TableDimensionProvider>
  );
};

export default TableWrapper;
