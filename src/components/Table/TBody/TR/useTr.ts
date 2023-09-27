import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

export const useTr = (
  item: any,
  setSelectedRows: Dispatch<SetStateAction<boolean[]>>,
  setIsOpenSelectMenu: Dispatch<SetStateAction<boolean>>,
  selectAll: boolean
) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isActiveSelectMenu, setIsActiveSelectMenu] = useState<boolean>(false);

  const itemId = (item as any)._id;

  const handleCheckbox = useCallback((checked: boolean) => {
    setIsChecked(checked);
    handleSelectRows(checked);
  }, []);

  const handleSelectRows = useCallback(
    (checked: boolean) => {
      setSelectedRows((prev: any) => {
        if (checked) {
          return [...prev, itemId];
        } else {
          return prev.filter((id: any) => id !== itemId);
        }
      });
    },
    [itemId]
  );

  const handleOpenSelectMenu = useMemo(
    () => (e: React.MouseEvent<HTMLSpanElement>) => {
      setIsOpenSelectMenu((prev) => !prev);
      setIsActiveSelectMenu(true);
    },
    []
  );

  useEffect(() => {
    setIsChecked(selectAll);
    if (selectAll) {
      setSelectedRows((prev: any) => [...new Set([...prev, itemId])]);
    } else {
      setSelectedRows((prev: any) => prev.filter((id: any) => id !== itemId));
    }
  }, [selectAll]);
  return {
    isChecked,
    setIsChecked,
    handleCheckbox,
    handleSelectRows,
    handleOpenSelectMenu,
    isActiveSelectMenu,
  };
};
