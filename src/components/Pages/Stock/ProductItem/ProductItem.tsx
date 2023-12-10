import React, { FC, useEffect, useState } from "react";
import styles from "./ProductItem.module.scss";
import { ProductType } from "../../../../models/ProductType";
import { InputField } from "../../../Elements/Input/InputField";
import { InteractionsModeEnum } from "../../../../models/shared/InteractionsMode";
import { HiCheckCircle, HiPencil, HiShoppingCart, HiTrash, HiXCircle } from "react-icons/hi2";
import { ItemOptionType } from "../../../../models/ClientOption";
import ItemOption from "../../../ClientCardOption/ItemOption";
import instance from "../../../../api/axiosInstance";
import Modal from "../../../Modal/Modal";
import { ModalTitleEnum } from "../../../../models/ModalTitleEnum";
import { ModalDescriptionEnum } from "../../../../models/ModalDescriptionEnum";
import Form from "../../../Form/Form";
import { useDispatchHook } from "../../../../hooks/useDispatch";
import { ShoppingCartSliceType, shoppingCartActions } from "../../../../store/slices/shoppingCart";


interface ProductItemProps {
  product: ProductType;
  shoppingCart: ShoppingCartSliceType;
  fields: InputField[];
  formikBag: any;
  mode: InteractionsModeEnum;
  setSelectedProductId: React.Dispatch<React.SetStateAction<string>>;
}

const ProductItem: FC<ProductItemProps> = ({ product, fields, formikBag, shoppingCart }) => {
  const { dispatch } = useDispatchHook();
  const { id, name, description, imageUrl, stockQuantity, manufacturer, category, price } =
    product;

  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [numberIncrementor, setNumberIncrementor] = useState<number>(0);

  const handleDeleteProduct = async () => {
    try {
      const response = await instance.delete(`/products/${id}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProduct = () => {
    setIsActiveModal(true);
  };

  const productForShoppingCart = { product, quantity: 1 };

  const handleAddToCart = () => {
    dispatch(shoppingCartActions.setProduct(productForShoppingCart));
  };

  const productOptions: ItemOptionType[] = [
    { icon: <HiShoppingCart />, text: "Add To Cart", action: handleAddToCart },
    { icon: <HiPencil />, text: "Edit Product", action: handleEditProduct },
    { icon: <HiTrash />, text: "Delete Item", action: handleDeleteProduct },
  ];



  return (
    <div className={styles.ProductItem}>
      <Modal
        children={
          <Form
            fields={fields}
            formikBag={formikBag}
            setIsActiveModal={setIsActiveModal}
          />
        }
        title={ModalTitleEnum.EDIT_PRODUCT}
        description={ModalDescriptionEnum.EDIT_PRODUCT}
        isActive={isActiveModal}
        setIsActiveModal={setIsActiveModal}
      />

      <div className={styles.container}>
        <div className={styles.image}>
          <img src={"../../client/src/assets/images/products"} alt="" />
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
          <span className={styles.productId}>ID: {`${id}`}</span>
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
