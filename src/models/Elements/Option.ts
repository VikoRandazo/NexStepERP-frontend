import { ReactElement } from "react";

export interface OptionType {
    name: string;
    icon: ReactElement;
    action: () => Promise<void>;
}