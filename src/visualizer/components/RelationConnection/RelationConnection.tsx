import ConnectionPath from "./ConnectionPath";
import { useRelationsCoords } from "@/visualizer/hooks/relationConnection";
import { computeConnectionPathWithSymbols } from "@/visualizer/utils/computeConnectionPaths";
import type { RelationItem } from "@/visualizer/types/relation";
import { useTablesInfo } from "@/visualizer/hooks/table";

interface RelationConnectionProps {
  source: RelationItem;
  target: RelationItem;
}

const RelationConnection = ({ source, target }: RelationConnectionProps) => {
  const { sourceXY, targetXY, sourcePosition, targetPosition } = useRelationsCoords(source, target);
  const { hoveredTableName } = useTablesInfo();

  const pathData = computeConnectionPathWithSymbols({
    sourceXY, targetXY, sourcePosition, targetPosition,
    relationSource: source.relation, relationTarget: target.relation,
  });

  const isHighlighted = hoveredTableName === source.tableName || hoveredTableName === target.tableName;

  return <ConnectionPath pathData={pathData} isHighlighted={isHighlighted} />;
};

export default RelationConnection;
