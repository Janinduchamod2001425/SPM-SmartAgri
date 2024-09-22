import React from 'react';
import '../styles/FormContainer.css'; // Import your custom CSS

const FormContainer = ({ children }) => {
  return (
    <div className="form-container">
      <div >
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
