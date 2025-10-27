import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate, isActive = false, onRevealComplete }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isRevealing, setIsRevealing] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [showInitial, setShowInitial] = useState(true);

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  useEffect(() => {
    if (!isActive) {
      // If countdown is not active, reveal content immediately
      if (onRevealComplete) {
        onRevealComplete();
      }
      return;
    }

    // Show countdown screen for 2 seconds initially
    const initialTimer = setTimeout(() => {
      setShowInitial(false);
      
      // If countdown is already at zero, trigger reveal immediately
      if (timeLeft.days === 0 && timeLeft.hours === 0 && 
          timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        setIsRevealing(true);
        setTimeout(() => {
          setHasRevealed(true);
          if (onRevealComplete) {
            onRevealComplete();
          }
        }, 3000);
      }
    }, 2000);

    // Update countdown every second
    const updateTimer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // When countdown reaches zero, trigger reveal animation
      if (!showInitial && newTimeLeft.days === 0 && newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0 && 
          !isRevealing && !hasRevealed) {
        setIsRevealing(true);
        setTimeout(() => {
          setHasRevealed(true);
          if (onRevealComplete) {
            onRevealComplete();
          }
        }, 3000);
      }
    }, 1000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(updateTimer);
    };
  }, [isActive, showInitial, isRevealing, hasRevealed, onRevealComplete]);

  // Don't render if not active
  if (!isActive) return null;

  // If already revealed, don't show anything
  if (hasRevealed) return null;

  // Reveal animation
  if (isRevealing) {
    return (
      <div className="countdown-overlay reveal-animation">
        <div className="reveal-content">
          <h1 className="reveal-title">🎉 It's Time! 🎉</h1>
          <div className="reveal-fireworks">
            <div className="firework"></div>
            <div className="firework"></div>
            <div className="firework"></div>
            <div className="firework"></div>
            <div className="firework"></div>
          </div>
          <p className="reveal-message">Get ready for something special...</p>
        </div>
      </div>
    );
  }

  // Show countdown (even if at 00:00:00)
  return (
    <div className="countdown-overlay">
      <div className="countdown-content">
        <h3 className="countdown-title">
          {timeLeft.days === 0 && timeLeft.hours === 0 && 
           timeLeft.minutes === 0 && timeLeft.seconds === 0 
            ? '🎂 Happy Birthday! 🎂' 
            : '⏰ Coming Soon ⏰'}
        </h3>
        <p className="countdown-subtitle">
          {timeLeft.days === 0 && timeLeft.hours === 0 && 
           timeLeft.minutes === 0 && timeLeft.seconds === 0 
            ? 'Your special day is here!' 
            : 'Your special day is almost here!'}
        </p>
        
        <div className="countdown-timer">
          <div className="countdown-block">
            <span className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="countdown-label">Days</span>
          </div>
          
          <div className="countdown-separator">:</div>
          
          <div className="countdown-block">
            <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="countdown-label">Hours</span>
          </div>
          
          <div className="countdown-separator">:</div>
          
          <div className="countdown-block">
            <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          
          <div className="countdown-separator">:</div>
          
          <div className="countdown-block">
            <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>

        <p className="countdown-message">
          {timeLeft.days === 0 && timeLeft.hours === 0 && 
           timeLeft.minutes === 0 && timeLeft.seconds === 0 
            ? '✨ Loading your surprise... ✨' 
            : '✨ The celebration will begin when the timer hits zero! ✨'}
        </p>
      </div>
    </div>
  );
};

export default Countdown;
