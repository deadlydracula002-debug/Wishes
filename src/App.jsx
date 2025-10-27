import React, { useState } from 'react';
import Scene1 from './Scene1';
import Scene2 from './Scene2';
import Scene3 from './Scene3';
import Countdown from './Countdown';
import './App.css';

function App() {
  const [isContentRevealed, setIsContentRevealed] = useState(false);

  return (
    <>
      {/* COUNTDOWN OVERLAY - Covers everything when active */}
      <Countdown 
        targetDate="2025-03-15T00:00:00" 
        isActive={true}
        onRevealComplete={() => setIsContentRevealed(true)}
      />
      
      {/* Main content - Hidden until countdown reveals */}
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
      </div>
    </>
  );
}

export default App;
