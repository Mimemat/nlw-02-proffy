import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, name, ...rest }) => (
  <div className="textarea-block">
    {label && <label htmlFor={name}>{label}</label>}
    <textarea {...rest} name={name} id={name} />
  </div>
);

export default TextArea;
