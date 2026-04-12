import React from 'react';
import '../styles/CustomForm.css';

const CustomInput = ({ icon: Icon, className = '', ...props }) => {
  return (
    <div className={`custom-input-wrapper ${className}`}>
      {Icon && <Icon className="custom-input-icon" />}
      <input className={`custom-input-field ${Icon ? 'with-icon' : ''}`} {...props} />
    </div>
  );
};

export default CustomInput;
