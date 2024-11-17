import React from "react";

const RadioGroup = ({ label, name, value, onChange, options, error }) => {
  return (
    <div className="form-group radio-group">
      <label>{label}</label>
      <div className="input-wrap">
        {options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
            />
            {option.name}
          </label>
        ))}
      </div>

      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default RadioGroup;
