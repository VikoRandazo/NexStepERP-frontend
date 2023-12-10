import React, { FC } from "react";
import styles from "./Checkout.module.scss";
import { InputField } from "../../Elements/Input/InputField";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";
import Input from "../../Elements/Input/Input";

interface CheckoutProps {}

const Checkout: FC<CheckoutProps> = () => {
  const fields: InputField[] = [
    { key: `firstName`, type: `text`, title: `First Name`, group: 1, element: `input` },
  ];

  const clients = useSelector((state:StoreRootTypes) => state.entities.clients)


  return (
    <div className={styles.Checkout}>
      <div className={styles.title}>
        <h3>Checkout</h3>
      </div>

      <div className={styles.contactDetails}>
        <h4>Contact Details</h4>
      </div>

    <div className={styles.fields}>
      {fields.map((field) => {
        return (
          <Input field={field} value={""} onChange={() => {
            
          }} />
        )
      })}
    </div>
      
    </div>
  );
};

export default Checkout;
