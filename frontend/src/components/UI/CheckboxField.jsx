import React from "react";

const CheckboxField = ({ label, name, value, onChange, options, error }) => {
  return (
    <div className="form-group checkbox-group">
      <label>{label}</label>
      <div className="input-wrap">
        {options.map((option, index) => (
          <label key={index}>
            <input
              type="checkbox"
              name={name}
              value={option.toLowerCase()}
              checked={value.includes(option.toLowerCase())}
              onChange={onChange}
            />
            {option}
          </label>
        ))}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default CheckboxField;
