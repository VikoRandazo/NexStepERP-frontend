import React, { FC } from "react";
import styles from "./CreateProduct.module.scss";
import Input from "../../../../Elements/Input/Input";
import { InputField } from "../../../../Elements/Input/InputField";
import BtnPrimary from "../../../../Elements/Buttons/Btn-Primary/Btn-Primary";
import { HiMiniSparkles } from "react-icons/hi2";
import BtnOutline from "../../../../Elements/Buttons/Btn-Outline/Btn-Outline";

interface CreateProductProps {}

const CreateProduct: FC<CreateProductProps> = () => {
  const fields: InputField[] = [
    { key: "name", type: "text" },
    { key: "description", type: "text" },
    { key: "price", type: "number" },
    { key: "imageUrl", type: "url" },
    { key: "category", type: "text" },
    { key: "stockQuantity", type: "number" },
    { key: "manufacturer", type: "text" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    console.log(value);
  };

  return (
    <div className={styles.CreateProduct}>
      {fields.map((field) => {
        return <Input field={field} onChange={handleChange} />;
      })}

      <div className={styles.footer}>
        <BtnPrimary icon={<HiMiniSparkles />} text={`Create Product`} action={() => {}} />
      </div>
      <p>to close this modal - click on the background</p>
    </div>
  );
};

export default CreateProduct;
