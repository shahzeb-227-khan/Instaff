import React from 'react';
import './Card.css';

const Card = ({ children, className = '', highlightHover = false }) => {
  return (
    <div className={`card ${highlightHover ? 'card-hoverable' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
