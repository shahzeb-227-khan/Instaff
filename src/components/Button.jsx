import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button', disabled = false, ...props }) => {
  const baseClass = 'btn';
  let variantClass = '';

  switch (variant) {
    case 'primary':
      variantClass = 'btn-primary cta-gradient';
      break;
    case 'secondary':
      variantClass = 'btn-secondary';
      break;
    case 'tertiary':
      variantClass = 'btn-tertiary';
      break;
    case 'outline':
      variantClass = 'btn-outline';
      break;
    case 'danger':
      variantClass = 'btn-danger';
      break;
    default:
      variantClass = 'btn-primary cta-gradient';
  }

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
