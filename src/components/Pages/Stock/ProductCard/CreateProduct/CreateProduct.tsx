import React, { FC } from "react";
import styles from "./CreateProduct.module.scss";
import Label from "../../../../Elements/Label/Label";
import Input from "../../../../Elements/Input/Input";
import { InputField } from "../../../../Elements/Input/InputField";

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
    </div>
  );
};

export default CreateProduct;
