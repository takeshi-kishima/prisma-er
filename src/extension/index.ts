import { commands, type ExtensionContext } from "vscode";
import { parsePrismaToJSON } from "@/parser";
import { MainPanel } from "./panel";
import { EXTENSION_CONFIG_SESSION, WEB_VIEW_NAME, WEB_VIEW_TITLE } from "./constants";

export function activate(context: ExtensionContext): void {
  context.subscriptions.push(
    commands.registerCommand("prisma-er.previewDiagrams", async () => {
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
