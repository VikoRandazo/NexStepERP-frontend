import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./ProductItem.module.scss";
import { ProductInitState, ProductType } from "../../../../models/ProductType";
import { InputField } from "../../../Elements/Input/InputField";
import { InteractionsModeEnum } from "../../../../models/shared/InteractionsMode";
import { HiCheckCircle, HiPencil, HiTrash, HiXCircle } from "react-icons/hi2";
import { ItemOptionType } from "../../../../models/ClientOption";
import ItemOption from "../../../ClientCardOption/ItemOption";
import instance from "../../../../api/axiosInstance";
import Modal from "../../../Modal/Modal";
import { ModalTitleEnum } from "../../../../models/ModalTitleEnum";
import { ModalDescriptionEnum } from "../../../../models/ModalDescriptionEnum";
import Form from "../../../Form/Form";
import NumberIncrementor from "../../../Elements/NumberIncrementor/NumberIncrementor";
import { useDispatchHook } from "../../../../hooks/useDispatch";
import { shoppingCartActions } from "../../../../store/slices/shoppingCart";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../../store/store";
import { ProductSold } from "../../../../models/ProductSoldType";

interface ProductItemProps {
  product: ProductType;
  fields: InputField[];
  formikBag: any;
  mode: InteractionsModeEnum;
  setSelectedProductId: React.Dispatch<React.SetStateAction<string>>;
}

const ProductItem: FC<ProductItemProps> = ({ product, fields, formikBag }) => {
  const { dispatch } = useDispatchHook();
  const { _id, name, description, imageUrl, stockQuantity, manufacturer, category, price } =
    product;

  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [numberIncrementor, setNumberIncrementor] = useState<number>(0);
  const [shoppingCartItem, setShoppingCartItem] = useState<Partial<ProductType>>(ProductInitState);

  const handleDeleteProduct = async () => {
    try {
      const response = await instance.delete(`/products/${_id}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProduct = () => {
    setIsActiveModal(true);
  };

  const productSold: ProductSold = useMemo(() => {
    return {
      pid: _id as string,
      price: price,
      quantity: numberIncrementor,
    };
  }, [_id, price, numberIncrementor]);

  const handleAddToCartQunatity = () => {
    if (productSold.pid) {
      setNumberIncrementor((prev) => prev + 1);
      dispatch(shoppingCartActions.setProduct(productSold));
    }
  };
  const handleRemoveFromCartQunatity = () => {
    if (_id) {
      if (numberIncrementor > 0) {
        setNumberIncrementor((prev) => prev - 1);
        dispatch(shoppingCartActions.removeProduct(_id));
      }
    }
  };

  const productOptions: ItemOptionType[] = [
    { icon: <HiPencil />, text: "Edit Product", action: handleEditProduct },
    { icon: <HiTrash />, text: "Delete Item", action: handleDeleteProduct },
  ];

  useEffect(() => {
    setShoppingCartItem({
      _id,
      name,
      price,
      imageUrl,
      category,
      manufacturer,
    });
  }, []);

  return (
    <div className={styles.ProductItem}>
      <Modal
        children={
          <Form
            fields={fields}
            formikBag={formikBag}
            setIsActiveModal={setIsActiveModal}
            selectedItem={product}
          />
        }
        title={ModalTitleEnum.EDIT_PRODUCT}
        description={ModalDescriptionEnum.EDIT_PRODUCT}
        isActive={isActiveModal}
        setIsActiveModal={setIsActiveModal}
      />

      <div className={styles.container}>
        <div className={styles.image}>
          <img src={imageUrl} alt="" />
        </div>
        <div className={styles.details}>
          <div className={styles.title}>
            <h4 className={styles.name}>{name}</h4>
            {stockQuantity > 0 ? (
              <span className={styles.inStock}>
                <HiCheckCircle />
              </span>
            ) : (
              <span className={styles.outOfStock}>
                <HiXCircle />
              </span>
            )}
          </div>

          <p className={styles.description}>{description}</p>
          <span className={styles.stockQuantity}>in Stock: {stockQuantity}</span>
          <span className={styles.category}>{category}</span>
          <span className={styles.productId}>ID: {_id}</span>
        </div>

        <div className={styles.quantityAndPrice}>
          <span className={styles.quantity}>
            <NumberIncrementor
              redux={true}
              min={0}
              max={stockQuantity}
              value={numberIncrementor}
              actionPlus={handleAddToCartQunatity}
              actionMinus={handleRemoveFromCartQunatity}
            />
          </span>
          <hr />
          <span
            className={numberIncrementor > 0 ? `${styles.selected} ${styles.price}` : styles.price}
          >
            <h4>{numberIncrementor > 0 ? price * numberIncrementor : price}$</h4>
          </span>
        </div>

        <div className={styles.actions}>
          {productOptions.map((option: ItemOptionType, i) => {
            const { icon, text, action } = option;
            return (
              <span>
                <ItemOption key={i} icon={icon} text={text} action={action} />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
