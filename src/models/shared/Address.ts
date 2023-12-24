export interface Address {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export const AddressInit = {
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "israel",
};
