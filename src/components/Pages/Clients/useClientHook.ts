import { useFormik } from "formik";
import { CustomerType } from "../../../models/CustomerType";
import { InputField } from "../../Elements/Input/InputField";

export const useClientHook = () => {
  const field: InputField = {
    key: `Search`,
    type: "text",
    title: "Search Client",
    group: 1,
  };

  // const field = { key: "name", type: "text", title: "Product Title", group: 1 }

  const initClientState: CustomerType = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phoneNumber: "+1234567890",
    dateRegistered: "2023-10-06",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "12345",
      country: "USA",
    },
    purchaseHistory: [
      {
        productId: "3252354326",
        quantity: 1,
        purchaseDate: "2023-09-05",
        amountPaid: 1200,
      },
      {
        productId: "4365437453",
        quantity: 1,
        purchaseDate: "2023-10-01",
        amountPaid: 15,
      },
    ],
  };

  const { values, handleChange, handleBlur } = useFormik({
    initialValues: {
      Search: "",
    },
    onSubmit: () => {},
  });

  let setters;
  let functions;
  let enums;
  return {
    states: { field },
    setters,
    functions,
    enums,
    formikBag: { values, handleChange, handleBlur },
  };
};
