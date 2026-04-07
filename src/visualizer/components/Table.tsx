import { Group, Rect } from "react-konva";
import { useEffect, useMemo, useRef } from "react";
import TableHeader from "./TableHeader";
import Column from "./Column/Column";
import type { JSONTableTable } from "@/types/tableSchema";
import type { KonvaEventObject } from "konva/lib/Node";
import type Konva from "konva";
import { COLUMN_HEIGHT, PADDINGS, TABLE_COLOR_HEIGHT, TABLE_HEADER_HEIGHT } from "@/visualizer/constants/sizing";
import { useThemeColors, useThemeContext } from "@/visualizer/hooks/theme";
import { Theme } from "@/visualizer/types/theme";
import eventEmitter from "@/visualizer/events-emitter";
import { computeTableDragEventName } from "@/visualizer/utils/eventName";
import { useTableDefaultPosition, useTablesInfo, useTableWidth } from "@/visualizer/hooks/table";
import { tableCoordsStore } from "@/visualizer/stores/tableCoords";
import { useTableDetailLevel } from "@/visualizer/hooks/tableDetailLevel";
import { TableDetailLevel } from "@/visualizer/types/tableDetailLevel";
import { filterByDetailLevel } from "@/visualizer/utils/filterByDetailLevel";
import computeFieldDisplayTypeName from "@/visualizer/utils/getFieldType";

interface TableProps extends JSONTableTable {}

const Table = ({ fields, name }: TableProps) => {
  const themeColors = useThemeColors();
  const { detailLevel } = useTableDetailLevel();
  const tableRef = useRef<null | Konva.Group>(null);
  const highlightRef = useRef<null | Konva.Rect>(null);
  const { theme } = useThemeContext();
  const { setHoveredTableName } = useTablesInfo();
  const { x: tableX, y: tableY } = useTableDefaultPosition(name);
  const tablePreferredWidth = useTableWidth();
  const visibleFields = useMemo(() => filterByDetailLevel(fields, detailLevel), [detailLevel, fields]);

  useEffect(() => {
    if (tableRef.current != null) {
      tableRef.current.x(tableX);
      tableRef.current.y(tableY);
      eventEmitter.emit(tableDragEventName, { x: tableX, y: tableY });
    }
  }, [tableX, tableY]);

  const tableHeight = TABLE_COLOR_HEIGHT + COLUMN_HEIGHT + visibleFields.length * COLUMN_HEIGHT + PADDINGS.sm;
  const tableDragEventName = computeTableDragEventName(name);

  useEffect(() => {
    const eventName = `highlight:table:${name}`;
    const handler = () => {
      const rect = highlightRef.current;
      if (rect === null || rect === undefined) return;
      const color = theme === Theme.dark ? "#FBBF24" : "#3B82F6";
      const flashes = 3;
      const interval = 200;
      let count = 0;
      rect.stroke(color);
      rect.opacity(1);
      rect.strokeWidth(5);
      const blinkInterval = setInterval(() => {
        rect.opacity(rect.opacity() === 1 ? 0 : 1);
        count++;
        if (count >= flashes * 2) {
          clearInterval(blinkInterval);
          rect.to({ strokeWidth: 0, opacity: 0, duration: 0.5 });
        }
      }, interval);
    };
    eventEmitter.on(eventName, handler);
    return () => { eventEmitter.off(eventName, handler); };
  }, [name, theme]);

  const propagateCoordinates = (node: Konva.Group) => {
    const tableCoords = { x: node.x(), y: node.y() };
    eventEmitter.emit(tableDragEventName, tableCoords);
    tableCoordsStore.setCoords(name, tableCoords);
  };

  const handleOnDrag = (event: KonvaEventObject<DragEvent>) => {
    event.currentTarget.moveToTop();
    propagateCoordinates(event.target as Konva.Group);
  };

  return (
    <Group name={`table-${name.replace(/\s+/g, "_")}`} ref={tableRef} draggable onDragMove={handleOnDrag} width={tablePreferredWidth} height={tableHeight} onMouseEnter={() => setHoveredTableName(name)} onMouseLeave={() => setHoveredTableName(null)} onClick={() => { if (tableRef.current != null) tableRef.current.moveToTop(); }}>
      <Rect shadowBlur={PADDINGS.xs} shadowOpacity={0.2} shadowColor={themeColors.table.shadow} height={tableHeight} width={tablePreferredWidth} fill={themeColors.table.bg} cornerRadius={PADDINGS.sm} />
      <TableHeader title={name} />
      {detailLevel !== TableDetailLevel.HeaderOnly ? (
        <Group y={TABLE_HEADER_HEIGHT}>
          {visibleFields.map((field, index) => (
            <Column key={field.name} colName={field.name} tableName={name} isEnum={field.type.is_enum} type={computeFieldDisplayTypeName(field)} isPrimaryKey={field.pk} offsetY={index * COLUMN_HEIGHT} relationalTables={field.relational_tables} note={field.note} />
          ))}
        </Group>
      ) : <></>}
      <Rect ref={highlightRef} height={tableHeight} width={tablePreferredWidth} cornerRadius={PADDINGS.sm} stroke={theme === Theme.dark ? "#FBBF24" : "#3B82F6"} strokeWidth={0} opacity={0} listening={false} />
    </Group>
  );
};

export default Table;
