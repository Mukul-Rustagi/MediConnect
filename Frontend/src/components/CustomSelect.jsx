import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import '../styles/CustomForm.css';

const CustomSelect = ({ icon: Icon, children, className = '', ...props }) => {
  return (
    <div className={`custom-input-wrapper ${className}`}>
      {Icon && <Icon className="custom-input-icon" />}
      <select className={`custom-input-field custom-select-field ${Icon ? 'with-icon' : ''}`} {...props}>
        {children}
      </select>
      <FaChevronDown className="custom-select-chevron" />
    </div>
  );
};

export default CustomSelect;
