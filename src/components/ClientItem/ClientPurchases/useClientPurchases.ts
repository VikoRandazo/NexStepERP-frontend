import instance from "../../../api/axiosInstance";

export const useClientPurchases = (productId: string) => {
  const getProductSold = async () => {
    try {
      const response = await instance.post(`/products/findProducts`, productId);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {};
};
