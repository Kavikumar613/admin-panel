import React from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div className="form-group col">
      <label htmlFor={name}>{label}</label>
      {/* <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      /> */}
       {type === "file" ? (
        <input
          type={type}
          id={name}
          name={name}
          onChange={onChange} // Handle file changes directly
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value} // Controlled input for non-file types
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
      {error && <span>{error}</span>}
    </div>
  );
};

export default InputField;
