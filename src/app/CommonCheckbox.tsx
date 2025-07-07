import React from "react";

type CommonCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function CommonCheckbox({ label, ...inputProps }: CommonCheckboxProps) {
  return (
    <label className="inline-block cursor-pointer select-none mr-4 mb-2 align-middle">
      <input type="checkbox" {...inputProps} />
      <span className="align-middle">{label}</span>
    </label>
  );
}

export default CommonCheckbox;
