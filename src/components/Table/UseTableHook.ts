import { useEffect, useState } from "react";

export const useTableHook = (initData: any[]) => {
  // States
  // ------
  // Hide Columns
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([`_id`, `imageUrl`]);

  // Sort
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [sortDirection, setSortDirection] = useState<`asc` | `desc`>(`asc`);
  const [sortField, setSortField] = useState<string>(``);

  // Checkbox
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);

 

  const columns = initData[0] && Object.keys(initData[0]);

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

  // Checkbox Functionality
  const handleCheckbox = () => {

  }

  useEffect(() => {
    setSortedData(initData)
  }, [initData]);

  return {
    init: { columns, data: initData },
    states: { hiddenColumns, sortedData, sortDirection, sortField },
    setStateActions: {},
    handlers: { handleSort: handleSort },
  };
};
