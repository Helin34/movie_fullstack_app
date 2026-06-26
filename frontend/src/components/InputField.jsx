import React from "react";

const InputField = ({ name, label, type, min, max }) => {
  return (
    <div className="w-72 flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder=""
        type={type}
        name={name}
        min={min}
        max={max}
        required
      />
    </div>
  );
};

export default InputField;
