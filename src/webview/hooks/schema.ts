import { useEffect, useState } from "react";
import { type JSONTableSchema } from "@/types/tableSchema";
import { tableCoordsStore } from "@/visualizer/stores/tableCoords";
import { stageStateStore } from "@/visualizer/stores/stagesState";
import { detailLevelStore } from "@/visualizer/stores/detailLevelStore";
import { type SetSchemaCommandPayload } from "@/types/webviewCommand";

export const useSchema = (): {
  schema: JSONTableSchema | null;
  key: string | null;
  schemaErrorMessage: string | null;
} => {
  const [schemaErrorMessage, setSchemaErrorMessage] = useState<string | null>(null);
  const [schema, setSchema] = useState<JSONTableSchema | null>(null);
  const [schemaKey, setSchemaKey] = useState<string | null>(null);

  const updater = (e: MessageEvent): void => {
    const message = e.data as SetSchemaCommandPayload;

    if (message.type === "setSchemaErrorMessage" && typeof message.message === "string") {
      setSchemaErrorMessage(message.message);
      return;
    }

    if (!(message.type === "setSchema" && typeof message.payload === "object")) return;

    if (message.key !== schemaKey) {
      tableCoordsStore.switchTo(message.key, message.payload.tables, message.payload.refs);
      stageStateStore.switchTo(message.key);
      detailLevelStore.switchTo(message.key);
      setSchemaKey(message.key);
    }

    setSchema(message.payload);
    setSchemaErrorMessage(null);
  };

  useEffect(() => {
    window.addEventListener("message", updater);
    return () => {
      window.removeEventListener("message", updater);
      tableCoordsStore.saveCurrentStore();
    };
  }, []);

  return { schema, key: schemaKey, schemaErrorMessage };
};
