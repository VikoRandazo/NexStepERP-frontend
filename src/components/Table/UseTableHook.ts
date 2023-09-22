export const useTableHook = (columns: string[]) => {

  const acceptColumns = () => {
    return columns.map((column, i) => {
      return { id: i, column };
    });
  };

  

  return { acceptColumns };
};