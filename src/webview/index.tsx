import { createRoot } from "react-dom/client";
import "@tomjs/vscode-extension-webview/client";
import { tableCoordsStore } from "@/visualizer/stores/tableCoords";
import App from "./App";
import "@/visualizer/styles/index.css";

window.addEventListener("unload", () => {
  tableCoordsStore.saveCurrentStore();
});

const appWrapper = document.getElementById("app");
if (appWrapper !== null) {
  const root = createRoot(appWrapper);
  root.render(<App />);
}
