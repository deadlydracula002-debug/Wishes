import React, { useState, useEffect } from 'react';

const Scene4 = () => {
  const [balloons, setBalloons] = useState([]);
  const [poppedBalloons, setPoppedBalloons] = useState([]);
  const [revealedMessages, setRevealedMessages] = useState([]);
  const [showCompletion, setShowCompletion] = useState(false);

  // Colorful messages
  const messages = [
    { id: 1, text: "You light up every room you enter! ✨", color: "#FF6B9D" },
    { id: 2, text: "Your smile is contagious! 😊", color: "#FFA07A" },
    { id: 3, text: "You're an amazing friend! 💖", color: "#FF1493" },
    { id: 4, text: "You inspire everyone around you! 🌟", color: "#9B59B6" },
    { id: 5, text: "Your kindness knows no bounds! 💝", color: "#3498DB" },
    { id: 6, text: "You make the world brighter! 🌈", color: "#2ECC71" },
    { id: 7, text: "You're incredibly talented! 🎨", color: "#F39C12" },
    { id: 8, text: "Your laugh is the best sound! 😄", color: "#E74C3C" },
    { id: 9, text: "You deserve all the happiness! 🎉", color: "#1ABC9C" },
    { id: 10, text: "You're one of a kind! 💎", color: "#E67E22" },
  ];

  useEffect(() => {
    // Spread balloons evenly across screen
    const initialBalloons = messages.map((msg, index) => {
      const spacing = 100 / (messages.length + 1);
      return {
        ...msg,
        x: spacing * (index + 1), // Evenly distributed
        delay: Math.random() * 2,
        duration: 12 + Math.random() * 4,
      };
    });
    setBalloons(initialBalloons);
  }, []);

  const popBalloon = (balloonId) => {
    console.log('Popping balloon:', balloonId); // Debug
    
    if (poppedBalloons.includes(balloonId)) {
      console.log('Already popped!');
      return;
    }

    // Update popped balloons
    const newPoppedBalloons = [...poppedBalloons, balloonId];
    setPoppedBalloons(newPoppedBalloons);
    
    console.log('New count:', newPoppedBalloons.length); // Debug

    // Find and reveal message
    const balloon = balloons.find(b => b.id === balloonId);
    if (balloon) {
      setTimeout(() => {
        setRevealedMessages(prev => [...prev, balloon]);
      }, 300);
    }

    // Check if all balloons popped
    if (newPoppedBalloons.length === balloons.length) {
      setTimeout(() => setShowCompletion(true), 800);
    }
  };

  return (
    <section className="page-section page4">
      <h2 className="balloon-scene-title">
        {showCompletion 
          ? "🎉 You Found All the Messages! 🎉" 
          : `Pop the Balloons! (${poppedBalloons.length}/${balloons.length})`}
      </h2>

      {/* Floating Balloons */}
      <div className="balloons-container">
        {balloons.map((balloon) => {
          const isPopped = poppedBalloons.includes(balloon.id);
          
          return !isPopped ? (
            <div
              key={balloon.id}
              className="balloon-wrapper"
              style={{
                left: `${balloon.x}%`,
                animationDelay: `${balloon.delay}s`,
                animationDuration: `${balloon.duration}s`,
              }}
            >
              <div 
                className="balloon"
                style={{ backgroundColor: balloon.color }}
                onClick={() => popBalloon(balloon.id)}
              >
                <div className="balloon-shine"></div>
                <div className="balloon-knot" style={{ backgroundColor: balloon.color }}></div>
              </div>
              <div className="balloon-string"></div>
            </div>
          ) : (
            <div
              key={`pop-${balloon.id}`}
              className="balloon-pop-effect"
              style={{
                left: `${balloon.x}%`,
              }}
            >
              💥
            </div>
          );
        })}
      </div>

      {/* Revealed Messages */}
      <div className="messages-container">
        {revealedMessages.map((msg, index) => (
          <div
            key={msg.id}
            className="revealed-message"
            style={{
              animationDelay: `${index * 0.1}s`,
              borderColor: msg.color,
              boxShadow: `0 5px 20px ${msg.color}40`,
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {showCompletion && (
        <div className="completion-overlay">
          <div className="completion-content">
            <h3>✨ All Messages Revealed! ✨</h3>
            <p>You're amazing in so many ways!</p>
            <p className="final-wish">🎂 Have the best birthday ever! 🎂</p>
          </div>
        </div>
      )}

      <p className="balloon-instruction">
        👆 Click the balloons to reveal your birthday messages!
      </p>
    </section>
  );
};

export default Scene4;
