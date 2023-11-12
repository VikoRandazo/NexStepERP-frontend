import { FilterByEnum, FilterByProps } from "./TypeGuards";
import { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import { InteractionsModeEnum } from "../../models/shared/InteractionsMode";
import { UiActions } from "../../store/slices/ui";
import { useDispatchHook } from "../../hooks/useDispatch";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../store/store";
import { SelectPlaceHolderEnum } from "../../models/SelectPlaceHolderEnum.";
import { InputField } from "../Elements/Input/InputField";

export const useDataControlHook = <T extends object>(
  data: T[],
  setFilteredData: React.Dispatch<React.SetStateAction<T>>
) => {
  const [filterBy, setFilterBy] = useState<FilterByProps>(FilterByEnum.NONE);
  const [isActiveCreateModal, setIsActiveCreateModal] = useState<boolean>(false);
  const [isActiveNewOrderModal, setIsActiveNewOrderModal] = useState<boolean>(false);

  const entity = useSelector((state: StoreRootTypes) => state.appSettings.pageName);

  const { dispatch } = useDispatchHook();

  const newOrderFields: InputField[] = [
    { key: "name", type: "text", title: "Name", group: 2, element: "input" },
    { key: "manufacturer", type: "text", title: "Manufacturer", group: 2, element: "input" },
    { key: "category", type: "text", title: "Category", group: 3, element: "select", placeholder: SelectPlaceHolderEnum.CATEGORIES},  
    { key: "stockQuantity", type: "number", title: "Stock Quantity", group: 4, element: "input" },
    { key: "price", type: "number", title: "Price", group: 4, element: "input" },
    {
      key: "description",
      type: "text",
      title: "Description",
      textarea: true,
      group: 5,
      element: "input",
    },
  ];

  const { handleChange, values, setFieldValue } = useFormik({
    initialValues: { min: "", max: "", date: "", search: "" },
    onSubmit: () => {},
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFieldValue(name, value);
  };

  const handleOpenCreateModal = useCallback(() => {
    setIsActiveCreateModal(true);
    dispatch(UiActions.setMode(InteractionsModeEnum.Create));
  }, [dispatch, entity]);

  const handleOpenNewOrderModal = useCallback(() => {
    setIsActiveNewOrderModal(true);
    dispatch(UiActions.setMode(InteractionsModeEnum.Create));
  }, [dispatch, entity]);

  return {
    data: { handleSearch },
    formikBag: { handleChange, values },
    states: { filterBy, isActiveCreateModal, entity, isActiveNewOrderModal, newOrderFields },
    setters: { setIsActiveCreateModal, setIsActiveNewOrderModal },
    handlers: { handleOpenCreateModal, handleOpenNewOrderModal },
  };
};
