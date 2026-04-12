import React from 'react';
import './Input.css';

const Input = ({ label, id, type = 'text', error, helperText, className = '', ...props }) => {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`input-field ${error ? 'input-error' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${id}-error` : helperText ? `${id}-helper` : undefined
        }
        {...props}
      />
      {error && (
        <span className="input-feedback error" id={`${id}-error`}>
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className="input-feedback" id={`${id}-helper`}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
