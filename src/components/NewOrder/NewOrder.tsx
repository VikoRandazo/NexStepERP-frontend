import React, { FC } from "react";
import styles from "./NewOrder.module.scss";
import { InputField } from "../Elements/Input/InputField";
import { useNewOrder } from "./useNewOrder";
import Form from "../Form/Form";

interface NewOrderProps {
  formikBag: any;
  setIsActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewOrder: FC<NewOrderProps> = ({ formikBag, setIsActiveModal }) => {
  const cid = ""
  const { states } = useNewOrder(cid);

  const { fields } = states;
  return (
    <div className={styles.NewOrder}>
      <Form
        fields={fields}
        formikBag={formikBag}
        setIsActiveModal={setIsActiveModal}
      />
    </div>
  );
};

export default NewOrder;
