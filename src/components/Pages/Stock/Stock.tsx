import { FC, useEffect, useState } from "react";
import styles from "./Stock.module.scss";
import Modal from "../../Modal/Modal";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { useStockHook } from "./useStockHook";
import ProductItem from "./ProductItem/ProductItem";
import Summary from "../../Summary/Summary";
import DataControl from "../../DataControl/DataControl";
import Form from "../../Form/Form";
import { ModalTitleEnum } from "../../../models/ModalTitleEnum";
import { ModalDescriptionEnum } from "../../../models/ModalDescriptionEnum";
import { StoreRootTypes } from "../../../store/store";
import { useSelector } from "react-redux";
import { ProductType } from "../../../models/ProductType";
import { SummaryItemType } from "../../Summary/SummaryItem/SummaryItemType";
import categories from "./categories.json";
import { OptionType } from "../../../models/Elements/Option";
import { InputField } from "../../Elements/Input/InputField";
import { SelectPlaceHolderEnum } from "../../../models/SelectPlaceHolderEnum.";
import { useSelect } from "../../Elements/Select/useSelect";
interface StockProps {}

const Stock: FC<StockProps> = () => {
  const { data, utiles, states, setters, functions, handlers, enums, formikBag } = useStockHook();
  const { products, filteredProducts } = data;
  const { fields, filterFormik } = utiles;
  const { currentCategory, mode, isActiveModal, displayInputUrl } = states;
  const { setSelectedProductId, setIsActiveModal } = setters;
  const { deleteSingleProduct } = functions;
  const { handleSelectCategory } = handlers;
  const { dispatch } = useDispatchHook();

  const [mostPurchasedProduct, setMostPurchasedProduct] = useState<string>("none");
  const [salesPortion, setSalesPortion] = useState<number>(0);
  const [filtered, setFiltered] = useState<ProductType[]>([]);

  const [formattedCategories, setFormattedCategories] = useState<OptionType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");

  const shoppingCart = useSelector((state: StoreRootTypes) => state.shoppingCart);

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
    { keyLabel: "Total Products", value: data.products.length },
    { keyLabel: "Top Selling Product", value: mostPurchasedProduct },
    { keyLabel: "Portion Of Total Income", value: salesPortion + `%` },
  ];

  const formatCategories = () => {
    setFormattedCategories(
      categories.map((category, i) => {
        return {
          id: i,
          value: category,
        };
      })
    );
  };

  const getSelectCategoryEvent = (e: React.MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.currentTarget;
    setSelectedCategory(innerText);
  };
  const getSelectManufacturerEvent = (e: React.MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.currentTarget;
    setSelectedManufacturer(innerText);
  };

  const [isOpenSelectCategoryToFilter, setIsOpenSelectCategoryToFilter] = useState<boolean>(false);
  const [isOpenSelectManufacturerToFilter, setIsOpenSelectManufacturerToFilter] =
    useState<boolean>(false);

  const manufacturers = Array.from(
    new Set(
      products.map((product, i) => {
        return { id: i, value: product.manufacturer };
      })
    )
  );

  const filterFields: InputField[] = [
    {
      key: "categoryTitle",
      element: "h5",
      title: "Category",
      group: 1,
    },
    {
      id: "selectCategory",
      key: "selectCategory",
      options: formattedCategories,
      type: "text",
      group: 1,
      element: "select",
      isOpen: isOpenSelectCategoryToFilter,
      isSelectedState: selectedCategory,
      event: getSelectCategoryEvent,
      placeholder: SelectPlaceHolderEnum.CATEGORIES,
    },
    {
      key: "endGroup",
      element: "hr",
      group: 1,
    },

    {
      key: "PriceTitle",
      element: "h5",
      title: "Price",
      group: 2,
    },
    {
      key: "price.from",
      title: "From:",
      group: 3,
      element: "input",
      event: () => {},
    },
    {
      key: "price.to",
      title: "To:",
      group: 3,
      element: "input",
      event: () => {},
    },
    {
      key: "endGroup",
      element: "hr",
      group: 4,
    },

    {
      key: "manufacturerTitle",
      element: "h5",
      title: "Manufacturer",
      group: 5,
    },
    {
      id: "selectManufacturer",
      key: "selectManufacturer",
      options: manufacturers as OptionType[],
      type: "text",
      group: 5,
      element: "select",
      isOpen: isOpenSelectManufacturerToFilter,
      isSelectedState: selectedManufacturer,
      event: getSelectManufacturerEvent,
      placeholder: SelectPlaceHolderEnum.MANUFACTURER,
    },
    {
      key: "endGroup",
      element: "hr",
      group: 6,
    },

    {
      key: "purchasesAmountTitle",
      element: "h5",
      title: "Purchases Amount",
      group: 7,
    },
    {
      key: "purchasesAmount.from",
      title: "From:",
      group: 8,
      element: "input",
      event: () => {},
    },
    {
      key: "purchasesAmount.to",
      title: "To:",
      group: 8,
      element: "input",
      event: () => {},
    },
  ];

  const initStateFormik = {
    selectCategory: "",
    selectManufacturer: "",
    price: { from: 0, to: 0 },
    purchasesAmount: { from: 0, to: 0 },
  };

  const handleFilterCategory = (data: ProductType[], innerText: string) => {
    const filteredProducts = data.filter((product) => {
      return product.category.toLowerCase() === innerText;
    });
    return filteredProducts;
  };

  const filters = { category: handleFilterCategory };

  const getFilteredArray = (filtered: any[]) => {
    console.log(filtered);
  };

  useEffect(() => {
    findMostPurchasedProduct();
  }, [products]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  useEffect(() => {
    formatCategories();
  }, [categories]);

  return (
    <div className={styles.Stock}>
      <Modal
        children={
          <Form fields={fields} formikBag={formikBag} setIsActiveModal={setIsActiveModal} />
        }
        title={ModalTitleEnum.EDIT_PRODUCT}
        description={ModalDescriptionEnum.EDIT_PRODUCT}
        isActive={isActiveModal}
        setIsActiveModal={setIsActiveModal}
      />

      <Summary analysisObject={analysisData} />
      <DataControl
        data={products}
        formikbag={formikBag}
        filterFields={filterFields}
        filterFunctions={filters}
        initStateFormik={initStateFormik}
      />

      <div className={styles.displayProducts}>
        <span>
          {products.map((product, i) => (
            <ProductItem
              key={`${product.name}${i}`}
              product={product}
              shoppingCart={shoppingCart}
              fields={fields}
              formikBag={formikBag}
              mode={mode}
              setSelectedProductId={setSelectedProductId}
            />
          ))}
        </span>
      </div>
    </div>
  );
};

export default Stock;
