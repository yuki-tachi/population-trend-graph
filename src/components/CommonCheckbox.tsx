import React from "react";

type CommonCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function CommonCheckbox({ label, ...inputProps }: CommonCheckboxProps) {
  return (
    <label className="inline-flex items-center cursor-pointer select-none mr-4 mb-2">
      <input type="checkbox" {...inputProps} />
      <span className="ml-1">{label}</span>
    </label>
  );
}

export default CommonCheckbox;
