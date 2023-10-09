import { DataControlProps } from "./DataControl";

export enum FilterByEnum {
  NONE = `None`,
  DATE = `Date`,
  MOENY_SPENT = `moneySpent`,
}
export type FilterByProps = FilterByEnum.NONE | FilterByEnum.DATE | FilterByEnum.MOENY_SPENT;

export function isDateFilter(filterBy: FilterByEnum): filterBy is FilterByEnum.DATE {
  return filterBy === `Date`;
}

export function isMoneySpentFilter(filterBy: FilterByEnum): filterBy is FilterByEnum.MOENY_SPENT {
  return filterBy === `Date`;
}
