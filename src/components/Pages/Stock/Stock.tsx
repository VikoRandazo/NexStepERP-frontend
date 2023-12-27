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
import categories from "./categories.json";
import { OptionType } from "../../../models/Elements/Option";
import { initSelectState } from "../../Elements/Select/Select";
import instance from "../../../api/axiosInstance";
import { entitiesAction } from "../../../store/slices/entities";
interface StockProps {}

const Stock: FC<StockProps> = () => {
  const { data, utiles, states, setters, functions, handlers, enums, formikBag, analysis } =
    useStockHook();
  const { products, filteredProducts } = data;
  const { fields } = utiles;
  const { currentCategory, mode, isActiveModal, displayInputUrl } = states;
  const { setSelectedProductId, setIsActiveModal } = setters;
  const { deleteSingleProduct } = functions;
  const { handleSelectCategory } = handlers;
  const { analysisData } = analysis;
  const { dispatch } = useDispatchHook();

  const [filtered, setFiltered] = useState<ProductType[]>([]);

  const [formattedCategories, setFormattedCategories] = useState<OptionType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<OptionType>(initSelectState);

  const [selectedManufacturer, setSelectedManufacturer] = useState<OptionType>(initSelectState);

  const shoppingCart = useSelector((state: StoreRootTypes) => state.shoppingCart);






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
    const { value } = e.currentTarget.dataset;

    if (value) {
      const selectInit = { id: 0, value: value, icon: <></> };
      setSelectedCategory(selectInit);
    }
  };

  const getSelectManufacturerEvent = (e: React.MouseEvent<HTMLLIElement>) => {
    const { value } = e.currentTarget.dataset;
    if (value) {
      const selectInit = { id: 0, value: value, icon: <></> };
      setSelectedManufacturer(selectInit);
    }
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
      <DataControl data={products} formik={formikBag} />

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
