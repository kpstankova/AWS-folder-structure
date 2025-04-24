import { ChangeEvent } from "react";

export interface InputProps {
  id: string;
  ariaLabel: string;
  labelName: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  focus?: boolean;
}
