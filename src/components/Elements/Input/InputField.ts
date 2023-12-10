import { SelectPlaceHolderEnum } from "../../../models/SelectPlaceHolderEnum.";

export type InputField =
  | {
      key: string;
      type?: "text" | "number" | "password" | "email" | "url" | "date";
      title: string;
      textarea?: boolean;
      group: number;
      element: "input" | "h3";
      id?: string;
    }
  | {
      key: string;
      type: "text";
      title?: string;
      group: number;
      textarea?: boolean;
      element: "select" ;
      state: string;
      setState: React.Dispatch<React.SetStateAction<string>>;
      event: (e: React.MouseEvent<HTMLLIElement>) => void;
      placeholder: SelectPlaceHolderEnum;
      id?: string;
    }
  | {
      key: string;
      type: "text";
      title?: string;
      group: number;
      textarea?: boolean;
      element: "img";
      state: string;
      setState: React.Dispatch<React.SetStateAction<string>>;
      event: (file: File) => void;
      placeholder?: SelectPlaceHolderEnum;
      id?: string;
    };
