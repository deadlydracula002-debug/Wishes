import React, { useState } from 'react';
import Scene1 from './Scene1';
import Scene2 from './Scene2';
import Scene3 from './Scene3';
import Scene4 from './Scene4';
import Scene5 from './Scene5'; // ← Add this
import Countdown from './Countdown';
import './App.css';

function App() {
  const [isContentRevealed, setIsContentRevealed] = useState(false);

  return (
    <>
      <Countdown 
        targetDate="2026-03-15T00:00:00" 
        isActive={false}
        onRevealComplete={() => setIsContentRevealed(true)}
      />
      
      <div 
        className="app-container"
        style={{ 
          visibility: isContentRevealed ? 'visible' : 'hidden',
          opacity: isContentRevealed ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        <Scene1 />
        <Scene2 />
        <Scene3 />
        <Scene4 />
        <Scene5 /> {/* ← Add this */}
      </div>
    </>
  );
}

export default App;
