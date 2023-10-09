import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useDispatchHook } from "../../../../hooks/useDispatch";
import { TableActions } from "../../../../store/slices/table";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../../store/store";
import { InteractionsModeEnum } from "../../../../models/shared/InteractionsMode";
import { UiActions } from "../../../../store/slices/ui";
import { entitiesAction } from "../../../../store/slices/entities";
import { ComponentCaseEnum } from "../../../../models/ComponentCase";
import { PagesNames } from "../../../../models/pagesName";

export const useTr = (
  item: any,
  // setSelectedRows: Dispatch<SetStateAction<boolean[]>>,
  setIsOpenSelectMenu: Dispatch<SetStateAction<boolean>>
  // selectAll: boolean
) => {
  const { dispatch } = useDispatchHook();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isActiveSelectMenu, setIsActiveSelectMenu] = useState<boolean>(false);
  const selectedRows = useSelector((state: StoreRootTypes) => state.table.selectedRows);
  const selectAll = useSelector((state: StoreRootTypes) => state.table.selectAllRows);

  const selectRef = useRef<HTMLElement>(null);

  const itemId: string = (item as any)._id;

  const type = useSelector((state: StoreRootTypes) => state.ui.modal.type);
  const page = useSelector((state: StoreRootTypes) => state.appSettings.pageName);
  const handleCheckbox = useCallback((checked: boolean) => {
    setIsChecked(checked);
    handleSelectRows(checked);
  }, []);

  const handleSelectRows = useCallback(
    (isChecked: boolean) => {
      if (isChecked) {
        dispatch(TableActions.setSelectedRows([itemId]));
      } else {
        dispatch(TableActions.removeSelectedRows([itemId]));
      }
    },
    [isChecked]
  );

  const handleOpenSelectMenu = useMemo(
    () => (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      setIsOpenSelectMenu((prev) => !prev);
      setIsActiveSelectMenu(true);
    },
    []
  );

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (selectRef && !selectRef.current?.contains(e.currentTarget as Node)) {
      setIsOpenSelectMenu(false);
      setIsActiveSelectMenu(false);
    }
  }, []);

  // Handle SelectMenu
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);

    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  });

  const handleChooseAction = () => {
    dispatch(UiActions.setMode(InteractionsModeEnum.Edit));
    dispatch(UiActions.setIsOpen(true));

    switch (page) {
      case PagesNames.Stock:
        dispatch(UiActions.setModalType(ComponentCaseEnum.Product));
        dispatch(entitiesAction.setProduct(item as any));
        break;
      case PagesNames.Clients:
        dispatch(UiActions.setModalType(ComponentCaseEnum.Client));
        dispatch(entitiesAction.setProduct(item as any));

        break;
      case PagesNames.Sales:
        dispatch(UiActions.setModalType(ComponentCaseEnum.Sale));
        dispatch(entitiesAction.setProduct(item as any));
        break;
    }

  };

  const handleClick = () => {
    dispatch(UiActions.setIsOpen(true));
    dispatch(UiActions.setMode(InteractionsModeEnum.Edit));
    dispatch(entitiesAction.setProduct(item as any));
  };


  useEffect(() => {
    setIsChecked(selectAll);
    if (selectAll) {
      dispatch(TableActions.setSelectedRows([...new Set([...selectedRows, itemId])]));
    } else {
      dispatch(TableActions.removeSelectedRows([...new Set([...selectedRows, itemId])]));
    }
  }, [selectAll]);

  return {
    isChecked,
    setIsChecked,
    handleCheckbox,
    handleSelectRows,
    handleOpenSelectMenu,
    isActiveSelectMenu,
    selectRef,
    handleChooseAction,
    handleClick
  };
};
