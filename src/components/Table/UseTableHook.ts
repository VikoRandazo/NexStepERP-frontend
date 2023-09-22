import { useState } from "react";

export const useTableHook = (data: any[]) => {
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([`_id`, `imageUrl`, `category`, `description`]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const prepareTableData = () => {
    if (data) {
      const items = data.map((item) => {
        return Object.entries(item)
          .filter(([key]) => !hiddenColumns.includes(key))
          .reduce((acc: any, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});
      });
      return items;
    }
  };

  const prepareTableColumns = () => {
    if (data[0]) {
      const item = data[0];
      const itemKeys = Object.entries(item);
      const mappedKeys = itemKeys.map(([key]) => key);
      const filterKeys = mappedKeys.filter((key) => !hiddenColumns.includes(key));
      return filterKeys;
    }
  };

  return { selectAll,setSelectAll, hiddenColumns, prepareTableData, prepareTableColumns };
};
