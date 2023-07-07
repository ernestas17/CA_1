import { IColorTheme } from "../../../shared/color_themes";
import { StyledInput } from "./style";
import React, { forwardRef, ChangeEventHandler } from "react";

export interface IInputProps {
  type: "number" | "checkbox" | "date" | "radio" | "text";
  changeEvent?: ChangeEventHandler<HTMLInputElement>;
  identifier?: string;
  data?: IData;
  min?: string;
  max?: string;
  value?: string | number;
  disabled?: boolean;
  theme?: IColorTheme;
  checked?: boolean;
}

interface IData {
  [key: string]: string;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      type,
      changeEvent,
      identifier,
      data,
      min,
      max,
      value,
      disabled,
      theme,
      checked,
    },
    ref
  ) => {
    return (
      <StyledInput
        {...data}
        disabled={disabled}
        value={value === null || value === undefined ? "" : value}
        min={min}
        max={max}
        ref={ref}
        className={identifier}
        id={identifier}
        name={identifier}
        onChange={changeEvent}
        type={type}
        theme={theme}
        checked={checked}
      />
    );
  }
);

export default Input;
