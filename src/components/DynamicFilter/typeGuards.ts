import { CustomerType } from "../../models/CustomerType";
import { ProductType } from "../../models/ProductType";

export const TypeGuards = () => {
  const isCustomerType = (item: any): item is CustomerType => {
    return item && typeof item.firstName === `string`;
  };
  const isProductType = (item: any): item is ProductType => {
    return item && typeof item.name === `string`;
  };

  function isProductTypeArray(data: any[]): data is ProductType[] {
    return data.every((item) => item && typeof item.name === "string");
  }

  function isCustomerTypeArray(data: any[]): data is CustomerType[] {
    return data.every((item) => item && typeof item.firstName === "string");
  }

  return {
    isCustomer: { item: isCustomerType, array: isCustomerTypeArray },
    isProduct: { item: isProductType, array: isProductTypeArray },
  };
};
