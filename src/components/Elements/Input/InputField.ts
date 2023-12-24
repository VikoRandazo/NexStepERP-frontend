import { ReactElement } from "react";
import { SelectPlaceHolderEnum } from "../../../models/SelectPlaceHolderEnum.";
import { OptionType } from "../../../models/Elements/Option";
export type InputField =
  | {
      key: string;
      type?: "text" | "number" | "password" | "email" | "url" | "date";
      title: string;
      textarea?: boolean;
      group: number;
      element: "input";
      id?: string;
      event: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
  | {
      key: string;
      title: string;
      group: number;
      element: "h5";
    }
  | {
      key: string;
      title: string;
      group: number;
      element: "h3";
    }
  | {
      key: string;
      title: string;
      group: number;
      element: "h2";
    }
  | {
      id?: string;
      key: string;
      options: OptionType[];
      type: "text";
      title?: string;
      group: number;
      element: "select";
      isOpen: boolean;
      isSelectedState: string;
      placeholder: string;
      setisSelectedState?: React.Dispatch<React.SetStateAction<string>>;
      event: (e: React.MouseEvent<HTMLLIElement>) => void;
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
    }
  | {
      key: string;
      type: "text";
      value: string | number;
      title?: string;
      group: number;
      textarea?: boolean;
      element: "radio";
      state: string | number | null;
      event: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
  | {
      key: string;
      group: number;
      element: "hr";
      title?: string;
    }
  | {
      key: string;
      type?: "button" | "submit" | "reset";
      innerText: string;
      icon?: ReactElement;
      group: number;
      element: "primaryButton" | "secondaryButton";
      event: (e: React.MouseEvent<HTMLButtonElement>) => void;
      action: () => void;
    };
