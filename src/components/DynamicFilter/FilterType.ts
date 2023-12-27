import { SetStateAction } from "react";

export type FilterType =
  | {
      key: string;
      name: string;
      type: "checkbox";
      value: { [key: string]: { min: number; max: number } };
      setValue: React.Dispatch<SetStateAction<{ [key: string]: { min: number; max: number } }>>;
      handleChange: (e: React.MouseEvent<HTMLInputElement>) => void;
    }
  | {
      key: string;
      name: string;
      type: "radio";
      value: { [key: string]: { min: number; max: number } };
      setValue: React.Dispatch<SetStateAction<{ [key: string]: { min: number; max: number } }>>;
      handleChange: (e: React.MouseEvent<HTMLInputElement>) => void;
    }
  | {
      key: string;
      name: string;
      type: "range";
      value: { [key: string]: { min: number; max: number } };
      setValue: React.Dispatch<SetStateAction<{ [key: string]: { min: number; max: number } }>>;
      handleChange: (e: React.MouseEvent<HTMLInputElement>) => void;
    };
