import React from "react";
import "./select.css";

interface SelectProps {
  onChange: (e: any) => void;
  label: string;
  placeholder: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
}

const Select = (props: SelectProps) => {
  return (
    <div className="select-container">
      <label htmlFor={props.name} className="select-label">
        {props.label}
      </label>
      <select
        value={props.value}
        name={props.name}
        id={props.name}
        className="select-field"
        onChange={props.onChange}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
