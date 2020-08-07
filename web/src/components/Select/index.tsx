import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  options: {
    value: string;
    label: string;
  }[];
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => (
  <div className="select-block">
    {label && <label htmlFor={name}>{label}</label>}
    <select value="" {...rest} name={name} id={name}>
      <option value="" disabled hidden>
        Seleciona uma opção
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
