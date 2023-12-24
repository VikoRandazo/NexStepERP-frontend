import { SetStateAction } from "react";

export type FilterField =
  | {
      key: string;
      element: "radio";
      value: string | number;
      event: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
  | {
      key: string;
      element: "select";
      value: string | number;
      isSelected: string;
      setIsSelected?: React.Dispatch<SetStateAction<string>>;
      event: (e: React.ChangeEvent<HTMLLIElement>) => void;
    };
