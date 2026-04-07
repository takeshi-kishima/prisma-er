import { isFunNodeType, isKeyValue } from "../isTypeOf";
import { PrismaFieldAttributeType } from "../../enums/prismaAstNodeType";
import type { Field } from "@mrleebo/prisma-ast";
import type { FieldConfig } from "../../types/intermediateFormattedNode";

export const getFieldConfig = (
  fieldProps: Field["attributes"],
): FieldConfig => {
  if (fieldProps === undefined) return {};

  let defaultValue: string | number | boolean | null = null;
  let isPrimary = false;
  let incrementable = false;
  let isUniqueField = false;

  for (const prop of fieldProps) {
    switch (prop.name) {
      case PrismaFieldAttributeType.default:
        if (prop.args === undefined) break;
        for (const defaultPropArg of prop.args) {
          if (typeof defaultPropArg.value !== "object") {
            defaultValue = defaultPropArg.value;
            break;
          }
          if (isKeyValue(defaultPropArg.value)) {
            if (typeof defaultPropArg.value.value !== "object") {
              defaultValue = defaultPropArg.value.value;
            }
            break;
          }
          if (isFunNodeType(defaultPropArg.value)) {
            defaultValue = defaultPropArg.value.name;
            if (defaultPropArg.value.name === "autoincrement") {
              incrementable = true;
            }
            break;
          }
        }
        break;
      case PrismaFieldAttributeType.id:
        isPrimary = true;
        break;
      case PrismaFieldAttributeType.unique:
        isUniqueField = true;
        break;
      default:
        break;
    }
  }

  return {
    dbdefault: defaultValue,
    increment: incrementable,
    pk: isPrimary,
    unique: isUniqueField,
  };
};
