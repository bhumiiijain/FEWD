import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('Hello,Click to change this text');

  const handleClick = () => {
    setText('The text is updated');
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>{text}</h2>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;