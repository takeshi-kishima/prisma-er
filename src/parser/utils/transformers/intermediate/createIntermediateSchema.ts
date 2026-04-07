import { type JSONTableEnum } from "@/types/tableSchema";
import { isEnumNode, isModelNode, isTypeNode } from "../../isTypeOf";
import { enumNodeToJSONTableEnum } from "../enumNodeToJSONTableEnum";
import { formatIntermediateTable } from "./formatIntermediateTable";
import type { Schema } from "@mrleebo/prisma-ast";
import {
  type RawRelationInfo,
  type IntermediateSchema,
  type IntermediateTable,
  type RelationType,
} from "../../../types/intermediateFormattedNode";

const isDocComment = (node: any): boolean =>
  node.type === "comment" && typeof node.text === "string" && node.text.startsWith("///");

const extractCommentText = (text: string): string =>
  text.replace(/^\/\/\/\s?/, "");

export const createIntermediateSchema = (
  nodes: Schema["list"],
): IntermediateSchema => {
  const enums: JSONTableEnum[] = [];
  const tables: IntermediateTable[] = [];
  const enumsNames = new Set<string>();
  const types = new Set<string>();
  const rawRelations: RawRelationInfo[] = [];
  const inverseRelationMap = new Map<string, RelationType>();
  const tablesNames = new Set<string>();

  const registerInverseRelation = (name: string, type: RelationType): void => {
    inverseRelationMap.set(name, type);
  };

  const registerRawRelation = (info: RawRelationInfo): void => {
    rawRelations.push(info);
  };

  let pendingComment: string | undefined;

  for (const node of nodes) {
    if (isDocComment(node)) {
      const text = extractCommentText((node as any).text);
      pendingComment = pendingComment ? `${pendingComment}\n${text}` : text;
      continue;
    }

    const modelComment = pendingComment;
    pendingComment = undefined;

    if (isEnumNode(node)) {
      const _enum = enumNodeToJSONTableEnum(node);
      enumsNames.add(_enum.name);
      enums.push(_enum);
    }

    if (isModelNode(node)) {
      tablesNames.add(node.name);
      tables.push(
        formatIntermediateTable(
          node,
          registerRawRelation,
          registerInverseRelation,
          modelComment,
        ),
      );
    }

    if (isTypeNode(node)) {
      types.add(node.name);
    }
  }

  return {
    enums,
    tables,
    enumsNames,
    rawRelations,
    inverseRelationMap,
    tablesNames,
  };
};
