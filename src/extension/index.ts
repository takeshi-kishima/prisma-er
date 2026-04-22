import { commands, type ExtensionContext, Uri, window, workspace } from "vscode";
import { parsePrismaToJSON } from "@/parser";
import { MainPanel } from "./panel";
import { EXTENSION_CONFIG_SESSION, WEB_VIEW_NAME, WEB_VIEW_TITLE } from "./constants";

export function activate(context: ExtensionContext): void {
  context.subscriptions.push(
    commands.registerCommand("prisma-er.previewDiagrams", async (resource?: Uri) => {
      if (resource?.scheme === "file") {
        const document = await workspace.openTextDocument(resource);
        await window.showTextDocument(document);
      }

      MainPanel.render({
        context,
        extensionConfigSession: EXTENSION_CONFIG_SESSION,
        webviewConfig: { name: WEB_VIEW_NAME, title: WEB_VIEW_TITLE },
        parser: parsePrismaToJSON,
        fileExt: "prisma",
      });
    }),
  );
}

export function deactivate() {}
