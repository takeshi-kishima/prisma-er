import { type CstNodeLocation, getSchema } from "@mrleebo/prisma-ast";
import { type JSONTableSchema } from "@/types/tableSchema";
import { DiagnosticError } from "@/types/diagnostic";
import { prismaASTToJSONTableSchema } from "./utils/transformers/prismaASTToJSONTableSchema";

export const parsePrismaToJSON = (prismaCode: string): JSONTableSchema => {
  try {
    const rawParsedSchema = getSchema(prismaCode);
    return prismaASTToJSONTableSchema(rawParsedSchema);
  } catch (error) {
    if ("token" in (error as any)) {
      const token = (error as any).token as CstNodeLocation;
      const endColumn = token.endColumn;
      const endLine = token.endLine;
      const startColumn = token.startColumn;
      const startLine = token.startLine;

      if (
        endColumn === undefined ||
        startColumn === undefined ||
        endLine === undefined ||
        startLine === undefined
      ) {
        throw error;
      }

      throw new DiagnosticError(
        {
          end: { column: endColumn - 1, line: endLine - 1 },
          start: { column: startColumn - 1, line: startLine - 1 },
        },
        String((error as Error).message),
      );
    }
    throw error;
  }
};
