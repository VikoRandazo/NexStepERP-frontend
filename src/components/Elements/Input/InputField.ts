export interface InputField {
  key: string;
  type: "text" | "number" | "password" | "email" | "url";
  textarea?: boolean
}
