import { useEffect, useState } from "react";

export const useTableHook = (initData: any[], hasActionsColumn: boolean) => {
  // States
  // ------
  // Hide Columns
  const [columns, setColumns] = useState<string[]>([]);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([`_id`, `imageUrl`]);

  // Sort
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [sortDirection, setSortDirection] = useState<`asc` | `desc`>(`asc`);
  const [sortField, setSortField] = useState<string>(``);

  // Checkbox
  const [selectAll, setSelectAll] = useState<boolean>(false);

  // SelectMenu
  const [isOpenSelectMenu, setIsOpenSelectMenu] = useState<boolean>(false);

  // Handlers
  // ---------
  // Handle Sort Data
  const handleSort = (e: React.MouseEvent<HTMLElement>) => {
    const innerText = e.currentTarget.innerText;
    const data = [...initData];
    const direction = sortField === innerText && sortDirection === "asc" ? "desc" : "asc";

    setSortField(innerText);
    setSortDirection(direction);

    data.sort((a, b) => {
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      return 0;
    });

    setSortedData(data);
  };

  // Handle Checkboxes

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
  };

  // Add "Acions" Column to a Row
  useEffect(() => {
    if (!initData[0]) return;

    const baseColumns = Object.keys(initData[0]);
    if (hasActionsColumn) {
      setColumns([...baseColumns, `Actions`]);
    } else {
      setColumns(baseColumns);
    }
  }, [initData, hasActionsColumn]);

  // UseEffects
  // ----------
  // Sort Data
  useEffect(() => {
    setSortedData(initData);
  }, [initData]);


  // Returns
  // -------
  return {
    init: { columns, data: initData },
    states: { hiddenColumns, sortedData, sortDirection, sortField, selectAll, isOpenSelectMenu },
    setters: { setIsOpenSelectMenu },
    handlers: { handleSort, handleSelectAll },
  };
};
