import { type DefaultPageConfig } from "@/types/defaultPageConfig";

export interface WebviewApi<StateType> {
  postMessage: (message: unknown) => void;
  getState: () => StateType | undefined;
  setState: <T extends StateType | undefined>(newState: T) => T;
}

declare global {
  interface Window {
    EXTENSION_DEFAULT_CONFIG?: DefaultPageConfig;
    vsCodeWebviewAPI: WebviewApi<unknown>;
  }

  function __getWebviewHtml__(webview: any, context: any): string;
  function __getWebviewHtml__(url: string): string;
}
