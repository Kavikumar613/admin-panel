import React from "react";

const SelectField = ({ label, name, value, onChange, options, error }) => {
  return (
    <div className="form-group col">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={onChange}>
        <option value="">Select...</option>
        {options.map((option, index) => (
          <option value={option.toLowerCase()} key={index}>
            {option}
          </option>
        ))}
      </select>
      {error && <span>{error}</span>}
    </div>
  );
};

export default SelectField;
