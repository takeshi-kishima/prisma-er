import { useState, useMemo, useRef, useEffect, type KeyboardEvent } from "react";
import { type JSONTableTable } from "@/types/tableSchema";
import eventEmitter from "@/visualizer/events-emitter";
import { useTablesInfo } from "@/visualizer/hooks/table";

interface SearchResult {
  type: "table" | "column";
  tableName: string;
  name: string;
}

interface SearchProps {
  tables: JSONTableTable[];
}

const Search = ({ tables }: SearchProps) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { setHoveredTableName, setHighlightedColumns } = useTablesInfo();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchResults = useMemo(() => {
    if (search.length < 2) return [];
    const results: SearchResult[] = [];
    const searchLower = search.toLowerCase();
    tables.forEach((table) => {
      if (table.name.toLowerCase().includes(searchLower)) {
        results.push({ type: "table", tableName: table.name, name: table.name });
      }
      table.fields.forEach((field) => {
        if (field.name.toLowerCase().includes(searchLower)) {
          results.push({ type: "column", tableName: table.name, name: field.name });
        }
      });
    });
    const collator = new Intl.Collator(undefined, { sensitivity: "base", numeric: true });
    const isExact = (r: SearchResult) => r.name.toLowerCase() === search.toLowerCase();
    return results.sort((a, b) => {
      const aExact = isExact(a);
      const bExact = isExact(b);
      if (aExact !== bExact) return aExact ? -1 : 1;
      if (a.type !== b.type) return a.type === "table" ? -1 : 1;
      if (a.type === "table") return collator.compare(a.name, b.name);
      const byColName = collator.compare(a.name, b.name);
      if (byColName !== 0) return byColName;
      return collator.compare(a.tableName, b.tableName);
    });
  }, [tables, search]);

  const handleSelect = (result: SearchResult) => {
    setHoveredTableName(null);
    if (result.type === "column") {
      setHighlightedColumns([`${result.tableName}.${result.name}`]);
    } else {
      setHighlightedColumns([]);
    }
    eventEmitter.emit("table:center", { tableName: result.tableName });
    eventEmitter.emit(`highlight:table:${result.tableName}`);
    setIsOpen(false);
    setSearch("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current != null && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, []);

  useEffect(() => {
    const handleShortcut = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => { window.removeEventListener("keydown", handleShortcut); };
  }, []);

  const handleOnEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      handleSelect(searchResults[0]);
      setIsOpen(false);
    }
    if (e.key === "ArrowDown") {
      const firstButton = dropdownRef.current?.querySelector("button");
      firstButton?.focus();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
      <div className="relative">
        <div title="Use Cmd+F or Ctrl+F to search" className="relative flex items-center">
          <input type="text" value={search} onKeyDown={handleOnEnterClick} ref={inputRef} onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }} placeholder="Search tables and columns..." className="w-72 px-4 py-3 focus:outline-none text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <span className="absolute right-2 px-2 py-1 rounded-lg bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100">Cmd+F</span>
        </div>
        {isOpen && searchResults.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 max-h-60 overflow-y-auto">
            {searchResults.map((result, index) => (
              <button key={`${result.type}-${result.tableName}-${result.name}-${index}`} onClick={() => handleSelect(result)} className="w-full px-4 py-2 text-left text-sm focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-600 flex flex-col items-start">
                <div className="flex space-x-2 w-full items-start">
                  <span className="text-xs mt-[3px]">{result.type === "table" ? "T" : "C"}</span>
                  <span className="font-medium break-all text-gray-700 dark:text-gray-200">{result.name}</span>
                </div>
                {result.type === "column" && (
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-5">in {result.tableName}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
