import { useState, useEffect } from "react";
import instance from "../../../api/axiosInstance";
import { ProductType, ProductInitState } from "../../../models/ProductType";
import { InteractionsModeEnum } from "../../../models/shared/InteractionsMode";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { entitiesAction } from "../../../store/slices/entities";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";
import { TableActions } from "../../../store/slices/table";
import { UiActions } from "../../../store/slices/ui";
import { InputField } from "../../Elements/Input/InputField";
import { useFormik } from "formik";
import { FilterByEnum } from "../../DataControl/TypeGuards";
import { HiArrowDown } from "react-icons/hi2";
import { OptionType } from "../../../models/Elements/Option";
import { SelectPlaceHolderEnum } from "../../../models/SelectPlaceHolderEnum.";

export const useStockHook = () => {
  const { dispatch } = useDispatchHook();
  const selectedRows = useSelector((state: StoreRootTypes) => state.table.selectedRows);

  // Local States
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>(`All`);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [deletedResponse, setDeletedResponse] = useState<{
    message: string;
    product_deleted: number;
  }>();
  const [displayInputUrl, setDisplayInputUrl] = useState<boolean>(false);
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);

  // Redux Selectors
  const products = useSelector((state: StoreRootTypes) => state.entities.stock);
  const modalType = useSelector((state: StoreRootTypes) => state.ui.modal.type);
  const interactionsMode = useSelector((state: StoreRootTypes) => state.ui.modal.mode);
  const mode = useSelector((state: StoreRootTypes) => state.ui.modal.mode);

  const fields: InputField[] = [
    { key: "imageUrl", type: "text", title: "Image", group: 1, element: "img" },
    { key: "name", type: "text", title: "Name", group: 2, element: "input" },
    { key: "manufacturer", type: "text", title: "Manufacturer", group: 2, element: "input" },
    {
      key: "category",
      type: "text",
      title: "Category",
      group: 3,
      element: "select",
      placeholder: SelectPlaceHolderEnum.CATEGORIES,
    },
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

  const getCheckboxEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayInputUrl(e.currentTarget.checked);
  };

  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: ProductInitState,
    validationSchema: "",
    onSubmit: async () => {
      try {
        let response;
        switch (mode) {
          case InteractionsModeEnum.Create:
            response = await instance.post(`/products/new`, values);
            console.log(response.data);
            break;

          case InteractionsModeEnum.Edit:
            console.log("Edit");
            response = await instance.patch(`/products/${selectedProductId}`, values);
            console.log(response.data);
            break;

          default:
            break;
        }
      } catch (error) {
        console.log(errors);
      } finally {
        console.log(errors);

        dispatch(UiActions.setIsOpen(false));
      }
    },
  });

  const filterDate = () => {};
  const filterSpentMoney = () => {};

  const filterOptions: OptionType[] = [
    { name: FilterByEnum.NONE, Icon: HiArrowDown as React.ElementType, action: () => {} },
    { name: FilterByEnum.DATE, Icon: null, action: filterDate },
    { name: FilterByEnum.MOENY_SPENT, Icon: null, action: filterSpentMoney },
  ];

  const getProducts = async () => {
      try {
        const response = await instance.get(`/products/all`);
        console.log(response);
        console.log("called");
        
        dispatch(entitiesAction.setStock(response.data));
      } catch (error) {
        console.log(error);
      }
    
  };

  const filterProducts = () => {
    setFilteredProducts(() => {
      if (currentCategory === `All`) {
        return products;
      } else {
        return products.filter(({ category }) => {
          return category?.trim().toLowerCase() === currentCategory.trim().toLowerCase();
        });
      }
    });
  };

  const deleteProducts = async () => {
    try {
      const response = await instance.post(`/products/delete`, selectedRows);
      dispatch(entitiesAction.removeFromStock(selectedRows));
      console.log(response.data);
      setDeletedResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSingleProduct = async (product: ProductType) => {
    try {
      const response = await instance.delete(`/products/${product._id}`);
      if (product._id) {
        dispatch(entitiesAction.removeFromStock([product._id]));
      }
      console.log(response.data);
      setDeletedResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (products.length === 0) {

    getProducts();
    }
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, currentCategory]);

  useEffect(() => {
    if (deletedResponse && deletedResponse.product_deleted > 0) {
      dispatch(TableActions.SelectAll(false));
    }
  }, [deletedResponse]);

  return {
    data: { products, filteredProducts },
    utiles: { fields, filterOptions },
    states: {
      interactionsMode,
      currentCategory,
      modalType,
      selectedRows,
      selectedProductId,
      mode,
      isActiveModal,
      displayInputUrl,
    },
    setters: {
      setFilteredProducts,
      setCurrentCategory,
      setSelectedProductId,
      setIsActiveModal,
      setDisplayInputUrl,
    },
    functions: {
      deleteProducts,
      deleteSingleProduct,
      getCheckboxEvent,
    },
    enums: {
      InteractionsModeEnum,
    },
    formikBag: {
      handleChange,
      values,
      handleSubmit,
      errors,
      touched,
      handleBlur,
      setFieldValue,
      resetForm,
    },
  };
};
