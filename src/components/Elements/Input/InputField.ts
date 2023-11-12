import { SelectPlaceHolderEnum } from "../../../models/SelectPlaceHolderEnum.";

export interface InputField {
  key: string;
  type?: "text" | "number" | "password" | "email" | "url" | "date";
  title: string;
  textarea?: boolean;
  group: number;
  element?: "input" | "select" | "img";
  placeholder?: SelectPlaceHolderEnum;
  id?: string;
  hidden?: boolean;
}
