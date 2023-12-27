import { ReactElement } from "react";

export interface OptionType {
  id: number | string;
  value: number | string;
  icon? : ReactElement
}
export interface RadioOptionType {
  id: number | string;
  name: string
  value: number | string;
  icon? : ReactElement
}
