export type InputFieldKeys =
  | {
      pageName: "Clients";
      key: string;
      type: string;
      title: string;
      group: number;
      textarea?: boolean;
    }
  | {
      pageName: "Stock";
      key: string;
      type: string;
      title: string;
      group: number;
      textarea?: boolean;
    };

export interface InputField {
  key: string;
  type?: "text" | "number" | "password" | "email" | "url" | "date";
  title: string;
  textarea?: boolean;
  group: number;
  element?: string;
  id?: string
}
