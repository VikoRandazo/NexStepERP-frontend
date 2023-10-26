export interface OptionType {
  name: string;
  Icon?: React.ElementType | null;
  action: (() => void) | ((...props: any[]) => void);
}
