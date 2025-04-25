import React, { useState } from 'react';

function HoverMessage() {
  const [message, setMessage] = useState('');

  const handleMouseEnter = () => {
    setMessage('Hello');
  };

  const handleMouseLeave = () => {
    setMessage('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        Hover
      </button>
      <p>{message}</p>
    </div>
  );
}

export default HoverMessage;