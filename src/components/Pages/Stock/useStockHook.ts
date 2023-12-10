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
import { FormikErrors, useFormik } from "formik";
import { SelectPlaceHolderEnum } from "../../../models/SelectPlaceHolderEnum.";
import { productValidationSchema } from "./productValidation";

export const useStockHook = () => {
  const { dispatch } = useDispatchHook();

  const products = useSelector((state: StoreRootTypes) => state.entities.stock);
  const modalType = useSelector((state: StoreRootTypes) => state.ui.modal.type);
  const interactionsMode = useSelector((state: StoreRootTypes) => state.ui.modal.mode);
  const mode = useSelector((state: StoreRootTypes) => state.ui.modal.mode);

  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>(`All`);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [deletedResponse, setDeletedResponse] = useState<{
    message: string;
    product_deleted: number;
  }>();
  const [displayInputUrl, setDisplayInputUrl] = useState<boolean>(false);
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(`None`);
  const [id, setId] = useState<number>(1800100 + products.length + 1);
  const [selectedFile, setSelectedFile] = useState<string>("../../../assets/images/products");
  const [productsState, setProductsState] = useState<ProductType[]>(products);

  const getProducts = async () => {
    try {
      const response = await instance.get(`/products/all`);
      console.log(response);
      setProductsState(response.data);
      dispatch(entitiesAction.setStock(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetId = () => {
    setId(1800100 + productsState.length + 1);
    console.log(productsState.length);
  };

  const handleSelectCategory = (e: React.MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.currentTarget;
    setSelectedCategory(innerText);
  };

  const handleSetImageUrl = (file: File) => {
    setSelectedFile(`../../../assets/images/products/${file.name}`);
    console.log(file);
  };

  const fields: InputField[] = [
    {
      key: "imageUrl",
      type: "text",
      title: "Image",
      group: 1,
      element: "img",
      state: selectedFile,
      setState: setSelectedFile,
      event: handleSetImageUrl,
    },
    { key: "subTitle1Product", type: "text", title: "Product Details", group: 1, element: "h3" },
    { key: "name", type: "text", title: "Name", group: 2, element: "input" },
    { key: "manufacturer", type: "text", title: "Manufacturer", group: 2, element: "input" },
    {
      key: "subTitle2Product",
      type: "text",
      title: "Set Additional Information",
      group: 4,
      element: "h3",
    },
    {
      key: "category",
      title: "Category",
      type: "text",
      group: 3,
      element: "select",
      state: selectedCategory,
      setState: setSelectedCategory,
      event: handleSelectCategory,
      placeholder: SelectPlaceHolderEnum.CATEGORIES,
    },
    { key: "stockQuantity", type: "number", title: "Stock Quantity", group: 4, element: "input" },
    { key: "price", type: "number", title: "Price", group: 4, element: "input" },
    {
      key: "subTitle3Product",
      type: "text",
      title: "Describe The Product Shortly",
      group: 5,
      element: "h3",
    },
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
    validationSchema: productValidationSchema,
    onSubmit: async () => {
      try {
        let response;
        switch (mode) {
          case InteractionsModeEnum.Create:
            handleSetId();
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
        console.log(errors);
        
      } catch (error:any) {

        console.log(errors);
      } finally {
        dispatch(UiActions.setIsOpen(false));
      }
    },
  });

  const filterDate = () => {};
  const filterSpentMoney = () => {};

  // const filterOptions: OptionType[] = [
  //   { name: FilterByEnum.NONE, value},
  //   { name: FilterByEnum.DATE, value},
  //   { name: FilterByEnum.MOENY_SPENT, value},
  // ];

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

  const deleteSingleProduct = async (product: ProductType) => {
    try {
      const response = await instance.delete(`/products/${product.id}`);
      if (product.id) {
        dispatch(entitiesAction.removeFromStock([product.id]));
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
    setFieldValue(`category`, selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setFieldValue(`imageUrl`, selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    console.log(values);
  }, [values]);
  useEffect(() => {
    console.log(errors);
  }, [errors]);

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
    utiles: {
      fields,
      // filterOptions
    },
    states: {
      interactionsMode,
      currentCategory,
      modalType,
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
      setFieldValue,
      setDisplayInputUrl,
    },
    functions: {
      deleteSingleProduct,
      getCheckboxEvent,
    },
    handlers: { handleSelectCategory },
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
