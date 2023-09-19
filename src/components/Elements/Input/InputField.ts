export interface InputField {
  key: string;
  type: "text" | "number" | "password" | "email" | "url";
  title: string;
  textarea?: boolean;
  group?: number;
}
