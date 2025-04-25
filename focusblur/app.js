import React, { useState } from 'react';
function App() {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div className="App">
      <h1>Focus and Blur</h1>
      <p
        tabIndex={0} 
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          color: isFocused ? 'blue' : 'black',
          cursor: 'pointer',
        }}
      >
</p>
      <img
        src="example.jpeg"
        alt="Example pic"
        style={{
          filter: 'blur(0)',
          transition: 'filter 0.3s',
        }}
        onMouseEnter={(e) => e.target.style.filter = 'blur(5px)'} 
        onMouseLeave={(e) => e.target.style.filter = 'blur(0)'}  
      />
    </div>
  );
}

export default App;
