import { isEnumeratorNode } from "../isTypeOf";
import type { Enum } from "@mrleebo/prisma-ast";
import type { JSONTableEnum } from "@/types/tableSchema";

export const enumNodeToJSONTableEnum = (node: Enum): JSONTableEnum => {
  const values: JSONTableEnum["values"] = [];
  for (const enumerator of node.enumerators) {
    if (isEnumeratorNode(enumerator)) {
      values.push({
        name: enumerator.name,
        note: enumerator.comment,
      });
    }
  }

  return { values, name: node.name };
};
