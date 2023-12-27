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
import { SelectPlaceHolderEnum } from "../../../models/SelectPlaceHolderEnum.";
import { productValidationSchema } from "./productValidation";
import { AxiosResponse } from "axios";
import { OptionType } from "../../../models/Elements/Option";
import { initSelectState } from "../../Elements/Select/Select";
import  categories  from "./categories.json";
import { SummaryItemType } from "../../Summary/SummaryItem/SummaryItemType";

export const useStockHook = () => {
  const { dispatch } = useDispatchHook();

  const products = useSelector((state: StoreRootTypes) => state.entities.stock.actions.setStock);
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
  const [mostPurchasedProduct, setMostPurchasedProduct] = useState<string>("none");
  const [salesPortion, setSalesPortion] = useState<number>(0);
  const [displayInputUrl, setDisplayInputUrl] = useState<boolean>(false);
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<OptionType>(initSelectState);
  const [id, setId] = useState<number>(1800100 + products.length + 1);
  const [selectedFile, setSelectedFile] = useState<string>("../../../assets/images/products");
  const [productsState, setProductsState] = useState<ProductType[]>(products);
  const [formattedCategories, setFormattedCategories] = useState<OptionType[]>([]);
  const [isOpenSelectForChoosingCategory, setIsOpenSelectForChoosingCategory] =
    useState<boolean>(false);

    const getProducts = async () => {
      try {
        const response = await instance.get(`products/all`);
        dispatch(entitiesAction.setStock(response.data));
      } catch (error) {
        console.log(error);
      }
    };
  
  
    const handleSetId = () => {
    setId(1800100 + productsState.length + 1);
    console.log(productsState.length);
  };

  const handleSetImageUrl = (file: File) => {
    setSelectedFile(`../../../assets/images/products/${file.name}`);
    console.log(file);
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
            const newProduct = response.data.prouct_created;
            console.log(newProduct);

            if (response.data.message === "success") {
              dispatch(entitiesAction.addProduct(values));
            }
            break;

          case InteractionsModeEnum.Edit:
            console.log("Edit");
            response = await instance.patch(`/products/${selectedProductId}`, values);
            console.log(response.data);

            if (response.data.message === "success") {
              dispatch(entitiesAction.updateProduct(values));
            }

            break;

          default:
            break;
        }
        console.log(errors);
      } catch (error: any) {
        console.log(errors);
      } finally {
        dispatch(UiActions.setIsOpen(false));
      }
    },
  });

  const handleSelectCategory = (e: React.MouseEvent<HTMLLIElement>) => {
    const { value } = e.currentTarget.dataset;

    if (value) {
      const selectInit = { id: 0, value: value };

      setSelectedCategory(selectInit);
  
    }
    setFieldValue(`category`, value);
  };

  const handlePrepareSelectOptions = (options: OptionType[] | string[]) => {
    const newSet: Set<OptionType> = new Set();
    options.map((option, i) => {
      if (typeof option === `string`) {
        newSet.add({ id: i, value: option });
        setFormattedCategories(Array.from(newSet));
      } else {
        setFormattedCategories((prev) => [...prev, { id: i, value: option.value }]);
      }
    }, []);
  };

  const findMostPurchasedProduct = () => {
    let mostPurchasedProduct = { name: "none", amount: 0, totalSalesValue: 0 };
    let totalSales = 0;

    products.reduce((acc, product) => {
      if (product.purchasesAmount) {
        const productTotalSalesValue = product.purchasesAmount * product.price;
        totalSales += productTotalSalesValue;

        if (product.purchasesAmount > acc.amount) {
          acc.amount = +product.purchasesAmount;
          acc.name = product.name;
          acc.totalSalesValue = productTotalSalesValue;
        }
      }

      return acc;
    }, mostPurchasedProduct);

    const salesPortion =
      totalSales > 0 ? (mostPurchasedProduct.totalSalesValue / totalSales) * 100 : 0;

    setMostPurchasedProduct(mostPurchasedProduct.name);
    setSalesPortion(+salesPortion.toFixed(2));
  };
  const analysisData: SummaryItemType[] = [
    { keyLabel: "Total Products", value: products.length },
    { keyLabel: "Top Selling Product", value: mostPurchasedProduct },
    { keyLabel: "Portion Of Total Income", value: salesPortion + `%` },
  ];


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
    { key: "subTitle1Product", title: "Product Details", group: 1, element: "h3" },
    { key: "name", type: "text", title: "Name", group: 2, element: "input", event: () => {} },
    {
      key: "manufacturer",
      type: "text",
      title: "Manufacturer",
      group: 2,
      element: "input",
      event: () => {},
    },

    {
      key: "category",
      options: formattedCategories,
      isOpen: isOpenSelectForChoosingCategory,
      isSelected: selectedCategory,
      setisSelected: setSelectedCategory,
      type: "text",
      title: "Categories",
      group: 3,
      element: "select",
      placeholder: "Choose a Category",
      event: handleSelectCategory,
    },
    {
      key: "subTitle2Product",
      title: "Set Additional Information",
      group: 4,
      element: "h3",
    },
    {
      key: "stockQuantity",
      type: "number",
      title: "Stock Quantity",
      group: 4,
      element: "input",
      event: () => {},
    },
    { key: "price", type: "number", title: "Price", group: 4, element: "input", event: () => {} },
    {
      key: "subTitle3Product",
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
      event: () => {},
    },
  ];

  const deleteSingleProduct = async (product: ProductType) => {
    try {
      const response: AxiosResponse<{
        message: string;
        product_deleted: { acknowledged: boolean; deletedCount: number };
      }> = await instance.delete(`/products/${product.id}`);

      if (response.data.message === "success") {
        dispatch(entitiesAction.removeProduct(product.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFieldValue(`category`, selectedCategory.value);
  }, [selectedCategory]);

  useEffect(() => {
    setFieldValue(`imageUrl`, selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    console.log(values);
  }, [values]);

  useEffect(() => {
    console.log(formattedCategories);
  }, [formattedCategories]);

  useEffect(() => {
    if (deletedResponse && deletedResponse.product_deleted > 0) {
      dispatch(TableActions.SelectAll(false));
    }
  }, [deletedResponse]);

  useEffect(() => {
    handlePrepareSelectOptions(categories);

    if (products.length < 1) {
      getProducts()
    }
  }, []);

  useEffect(() => {
    findMostPurchasedProduct();
  }, [products]);


  return {
    data: { products, filteredProducts },
    utiles: {
      fields,
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
    analysis:{analysisData}
  };
};
