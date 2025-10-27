import React, { useEffect, useState, useRef } from 'react';
import Countdown from './Countdown';

function Scene1() {
  const [hearts, setHearts] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const heartArray = [];
    for (let i = 0; i < 15; i++) {
      heartArray.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 5 + Math.random() * 5,
        animationDelay: Math.random() * 5,
      });
    }
    setHearts(heartArray);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        setIsMuted(false);
      }
    }
  };

  return (
    <section className="page-section page1">
      <div className="page1-background">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}%`,
              animationDuration: `${heart.animationDuration}s`,
              animationDelay: `${heart.animationDelay}s`,
            }}
          />
        ))}
      </div>
      
      <audio ref={audioRef} loop>
        <source src="/birthday-song.mp3" type="audio/mpeg" />
        <source src="/birthday-song.mp4" type="audio/mp4" />
      </audio>
      
      <button className="music-button" onClick={toggleMusic}>
        {isPlaying ? '⏸️ Pause' : '🎵 Play Music'}
      </button>
      
      <Countdown 
        targetDate="2025-03-15T00:00:00" 
        isActive={true}
      />
      
      <h1 className="main-heading">Happy Birthday Shree Saini! 🎂</h1>
      <p className="scroll-down-prompt">Scroll down to explore ↓</p>
    </section>
  );
}

export default Scene1;
