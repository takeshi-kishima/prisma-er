export const getColsNumber = (tableCount: number): number => {
  const MINIMAL_COLS_COUNT = 3;
  const MAXIMAL_COLS_COUNT = 4;
  return tableCount > 6 ? MAXIMAL_COLS_COUNT : MINIMAL_COLS_COUNT;
};
