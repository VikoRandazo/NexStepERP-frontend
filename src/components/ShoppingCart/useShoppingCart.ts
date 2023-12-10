import { useSelector } from "react-redux";
import instance from "../../api/axiosInstance";
import { StoreRootTypes } from "../../store/store";
import { CustomerType } from "../../models/CustomerType";

export const useShoppingCart = () => {
  const client: CustomerType | null = useSelector(
    (state: StoreRootTypes) => state.shoppingCart.client
  );
  const postPurchase = async () => {
    const response = await instance.post(`/sales/${client?._id}`);
    console.log(response.data);
    
  };
  return {};
};
