import { type Disposable, type ExtensionContext, type Webview } from "vscode";
import { type Theme } from "@/visualizer/types/theme";
import { WebviewCommand, type WebviewPostMessage } from "@/types/webviewCommand";
import { type DefaultPageConfig } from "@/types/defaultPageConfig";
import { type ExtensionConfig } from "./extensionConfigs";
import { WEBVIEW_HTML_MARKER_FOR_DEFAULT_CONFIG } from "./constants";

export class WebviewHelper {
  public static setupHtml(
    webview: Webview,
    context: ExtensionContext,
    defaultConfig: DefaultPageConfig,
  ): string {
    const html: string = process.env.VITE_DEV_SERVER_URL
      ? __getWebviewHtml__(process.env.VITE_DEV_SERVER_URL)
      : __getWebviewHtml__(webview, context);

    return WebviewHelper.injectDefaultConfig(html, defaultConfig);
  }

  public static injectDefaultConfig(html: string, configs: DefaultPageConfig): string {
    return html.replace(
      WEBVIEW_HTML_MARKER_FOR_DEFAULT_CONFIG,
      `window.EXTENSION_DEFAULT_CONFIG = ${JSON.stringify(configs)};`,
    );
  }

  public static handleWebviewMessage(
    command: string,
    message: string,
    extensionConfig: ExtensionConfig,
  ): void {
    switch (command) {
      case WebviewCommand.SET_THEME_PREFERENCES:
        extensionConfig.setTheme(message as Theme);
        break;
      default:
    }
  }

  public static setupWebviewHooks(
    webview: Webview,
    extensionConfig: ExtensionConfig,
    disposables: Disposable[],
  ): void {
    webview.onDidReceiveMessage(
      (message: WebviewPostMessage) => {
        WebviewHelper.handleWebviewMessage(message.command, message.message, extensionConfig);
      },
      undefined,
      disposables,
    );
  }
}
