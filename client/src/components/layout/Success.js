import React from 'react';

const Success = () => {
  return (
    <div style={{ textAlign: 'center', margin: '0 auto' }}>
      <i
        className="fas fa-check-circle fa-7x"
        style={{ color: 'green', margin: '10px' }}
      ></i>
      <h3>Stock purchased succesfully!</h3>
    </div>
  );
};

export default Success;
