export interface OptionType {
    name: string;
    action: () => Promise<void>;
}