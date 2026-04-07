import { useEffect, useState } from "react";
import { useTablesInfo } from "./table";
import { useTableWidthStoredValue } from "./tableWidthStore";
import { useTableDetailLevel } from "./tableDetailLevel";
import type { RelationItem } from "@/visualizer/types/relation";
import type { Position, XYPosition } from "@/visualizer/types/positions";
import { computeColY } from "@/visualizer/utils/computeColY";
import { computeTableDragEventName } from "@/visualizer/utils/eventName";
import eventEmitter from "@/visualizer/events-emitter";
import { computeConnectionHandlePos } from "@/visualizer/utils/computeConnectionHandlePositions";
import { tableCoordsStore } from "@/visualizer/stores/tableCoords";
import { TableDetailLevel } from "@/visualizer/types/tableDetailLevel";
import { TABLE_HEADER_HEIGHT } from "@/visualizer/constants/sizing";

interface UseRelationTablesCoordsReturn {
  sourceXY: XYPosition;
  targetXY: XYPosition;
  targetPosition: Position;
  sourcePosition: Position;
}

export const useRelationsColsY = (
  source: RelationItem,
  target: RelationItem,
): [number, number] => {
  const tablesInfo = useTablesInfo();
  const sourceColY = computeColY(tablesInfo.colsIndexes, source);
  const targetColY = computeColY(tablesInfo.colsIndexes, target);
  return [sourceColY, targetColY];
};

export const useRelationsCoords = (
  source: RelationItem,
  target: RelationItem,
): UseRelationTablesCoordsReturn => {
  const [sourceTableCoords, setSourceTableCoords] = useState<XYPosition>(() =>
    tableCoordsStore.getCoords(source.tableName),
  );
  const [targetTableCoords, setTargetTableCoords] = useState<XYPosition>(() =>
    tableCoordsStore.getCoords(target.tableName),
  );
  const [sourceColY, targetColY] = useRelationsColsY(source, target);

  const sourceTableWidth = useTableWidthStoredValue(source.tableName);
  const targetTableWidth = useTableWidthStoredValue(target.tableName);

  const sourceTableDragEventName = computeTableDragEventName(source?.tableName);
  const targetTableDragEventName = computeTableDragEventName(target?.tableName);
  const { detailLevel } = useTableDetailLevel();

  useEffect(() => {
    const coordsUpdater = (coords: XYPosition): void => { setSourceTableCoords(coords); };
    eventEmitter.on(sourceTableDragEventName, coordsUpdater);
    return () => { eventEmitter.removeListener(sourceTableDragEventName, coordsUpdater); };
  }, [sourceTableDragEventName]);

  useEffect(() => {
    const coordsUpdater = (coords: XYPosition): void => { setTargetTableCoords(coords); };
    eventEmitter.on(targetTableDragEventName, coordsUpdater);
    return () => { eventEmitter.removeListener(targetTableDragEventName, coordsUpdater); };
  }, [targetTableDragEventName]);

  const [sourcePosition, targetPosition, finalSourceX, finalTargetX] =
    computeConnectionHandlePos({
      sourceW: sourceTableWidth,
      sourceX: sourceTableCoords.x,
      targetW: targetTableWidth,
      targetX: targetTableCoords.x,
    });

  if (detailLevel === TableDetailLevel.HeaderOnly) {
    return {
      sourcePosition,
      targetPosition,
      sourceXY: { x: finalSourceX, y: sourceTableCoords.y + TABLE_HEADER_HEIGHT / 2 },
      targetXY: { x: finalTargetX, y: targetTableCoords.y + TABLE_HEADER_HEIGHT / 2 },
    };
  }

  const finalSourceY = sourceColY + sourceTableCoords.y;
  const finalTargetY = targetColY + targetTableCoords.y;

  return {
    sourcePosition,
    targetPosition,
    sourceXY: { x: finalSourceX, y: finalSourceY },
    targetXY: { x: finalTargetX, y: finalTargetY },
  };
};
