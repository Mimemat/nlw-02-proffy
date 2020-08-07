import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...rest }) => (
  <div className="input-block">
    {label && <label htmlFor={name}>{label}</label>}
    <input type="text" {...rest} id={name} name={name} />
  </div>
);

export default Input;
