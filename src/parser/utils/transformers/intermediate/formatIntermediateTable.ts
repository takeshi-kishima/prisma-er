import { type Model } from "@mrleebo/prisma-ast";
import { isField } from "../../isTypeOf";
import { formatIntermediateTableField } from "./formatIntermediateField";
import { lookForRelation } from "./lookForRelation";
import {
  type IntermediateTable,
  type RawRelationInfo,
  type RelationType,
} from "../../../types/intermediateFormattedNode";

const isDocComment = (node: any): boolean =>
  node.type === "comment" && typeof node.text === "string" && node.text.startsWith("///");

const extractCommentText = (text: string): string =>
  text.replace(/^\/\/\/\s?/, "");

export const formatIntermediateTable = (
  node: Model,
  registerRawRelation: (info: RawRelationInfo) => void,
  registerInverseRelation: (name: string, info: RelationType) => void,
  modelComment?: string,
): IntermediateTable => {
  const fields: IntermediateTable["fields"] = [];

  let pendingComment: string | undefined;

  for (const mayAField of node.properties) {
    if (isDocComment(mayAField)) {
      const text = extractCommentText((mayAField as any).text);
      pendingComment = pendingComment ? `${pendingComment}\n${text}` : text;
      continue;
    }

    if (isField(mayAField)) {
      const field = formatIntermediateTableField(mayAField, pendingComment);
      lookForRelation(
        mayAField,
        node.name,
        registerRawRelation,
        registerInverseRelation,
      );
      fields.push(field);
    }

    pendingComment = undefined;
  }

  return {
    fields,
    name: node.name,
    note: modelComment,
    indexes: [],
  };
};
