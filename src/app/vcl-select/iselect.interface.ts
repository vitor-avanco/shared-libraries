export interface ISelect {
  label: string;
  value: string;
  selected?: boolean;
  disabled?: boolean;
}

export interface ISelectOutput {
  label: string;
  value: string;
  id?: string;
}
