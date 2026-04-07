import AutoArrangeTableButton from "./AutoArrange/AutoArrangeTables";
import DetailLevelToggle from "./DetailLevelToggle/DetailLevelToggle";
import ExportButton from "./Export/Export";
import FitToViewButton from "./FitToView/FitToView";
import ThemeToggler from "./ThemeToggler/ThemeToggler";

interface ToolbarProps {
  onFitToView: () => void;
  onDownload: () => void;
}

const Toolbar = ({ onFitToView, onDownload }: ToolbarProps) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <FitToViewButton onClick={onFitToView} />
      <AutoArrangeTableButton />
      <DetailLevelToggle />
      <ExportButton onDownload={onDownload} />
      <ThemeToggler />
    </div>
  );
};

export default Toolbar;
