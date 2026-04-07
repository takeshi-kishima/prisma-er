import DiagramViewer from "@/visualizer/components/DiagramViewer/DiagramViewer";
import { useCreateTheme } from "@/visualizer/hooks/theme";
import ThemeProvider from "@/visualizer/providers/ThemeProvider";
import NoSchemaMessage from "@/visualizer/components/Messages/NoSchemaMessage";
import ErrorMessage from "@/visualizer/components/Messages/ErrorMessage";
import { type Theme } from "@/visualizer/types/theme";
import ScrollDirectionProvider from "@/visualizer/providers/ScrollDirectionProvider";
import { WebviewCommand, type WebviewPostMessage } from "@/types/webviewCommand";
import { useSchema } from "./hooks/schema";

const App = () => {
  const { setTheme, theme, themeColors } = useCreateTheme(window.EXTENSION_DEFAULT_CONFIG?.theme);
  const { schema, key, schemaErrorMessage } = useSchema();

  if (schemaErrorMessage !== null && schema === null) {
    return <ErrorMessage message={schemaErrorMessage} />;
  }

  if (schema === null) {
    return <NoSchemaMessage />;
  }

  const saveThemePreference = (theme: Theme) => {
    setTheme(theme);
    const updateThemeMessage: WebviewPostMessage = {
      command: WebviewCommand.SET_THEME_PREFERENCES,
      message: theme,
    };
    if (window.vsCodeWebviewAPI === undefined) {
      console.error("can't send message to extension due vsCodeWebviewAPI global variable is not defined");
    } else {
      window.vsCodeWebviewAPI?.postMessage(updateThemeMessage);
    }
  };

  return (
    <ThemeProvider theme={theme} setTheme={saveThemePreference} themeColors={themeColors}>
      <ScrollDirectionProvider scrollDirection={window.EXTENSION_DEFAULT_CONFIG?.scrollDirection!}>
        <DiagramViewer key={key} {...schema} />
      </ScrollDirectionProvider>
    </ThemeProvider>
  );
};

export default App;
