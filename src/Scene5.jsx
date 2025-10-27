import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Scene5 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const hiddenCardRef = useRef(null);

  // CARD CONTENT - Edit here and it updates both cards
  const cardContent = {
    recipient: "Shree Saini",
    paragraphs: [
      "On this special day, I want you to know how much you mean to me. Your presence in my life has brought endless joy and happiness.",
      "You have a heart of gold and a spirit that shines brighter than any star. Thank you for being you – amazing, kind, and inspiring!",
      "May this year bring you everything your heart desires. May you continue to spread joy wherever you go, and may all your dreams come true."
    ],
    wish: "Wishing you the happiest birthday ever! 🎂",
    sender: "Vansh"
  };

  // Card Message Component (used by both visible and hidden cards)
  const CardMessage = ({ isLarge = false }) => (
    <div style={isLarge ? largeMessageStyle : {}}>
      <h4 className="message-greeting" style={isLarge ? largeGreetingStyle : {}}>
        Dear {cardContent.recipient},
      </h4>
      
      {cardContent.paragraphs.map((text, index) => (
        <p key={index} className="message-paragraph" style={isLarge ? largeParagraphStyle : {}}>
          {text}
        </p>
      ))}
      
      <p className="message-wish" style={isLarge ? largeWishStyle : {}}>
        {cardContent.wish}
      </p>
      
      <p className="message-signature" style={isLarge ? largeSignatureStyle : {}}>
        With love,<br/>
        <span className="signature-name" style={isLarge ? largeSignatureNameStyle : {}}>
          {cardContent.sender}
        </span> 💖
      </p>
    </div>
  );

  // Styles for large download version
  const largeMessageStyle = { fontFamily: 'Poppins, sans-serif', color: '#333' };
  const largeGreetingStyle = {
    fontFamily: 'Great Vibes, cursive',
    fontSize: '3.5rem',
    color: '#ff4081',
    marginBottom: '30px',
    textShadow: '0 2px 4px rgba(255, 64, 129, 0.3)',
  };
  const largeParagraphStyle = {
    fontSize: '1.3rem',
    lineHeight: '2',
    marginBottom: '25px',
    color: '#555'
  };
  const largeWishStyle = {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: '#ff4081',
    margin: '40px 0',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif'
  };
  const largeSignatureStyle = {
    fontSize: '1.4rem',
    fontStyle: 'italic',
    color: '#666',
    marginTop: '40px',
    textAlign: 'right',
    fontFamily: 'Poppins, sans-serif'
  };
  const largeSignatureNameStyle = {
    fontFamily: 'Great Vibes, cursive',
    fontSize: '3rem',
    color: '#ff4081',
    display: 'block',
    marginTop: '10px'
  };

  const downloadAsImage = async () => {
    if (!hiddenCardRef.current) return;
    setIsDownloading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(hiddenCardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        windowWidth: hiddenCardRef.current.scrollWidth,
        windowHeight: hiddenCardRef.current.scrollHeight,
      });

      const link = document.createElement('a');
      link.download = 'birthday-card.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download.');
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAsPDF = async () => {
    if (!hiddenCardRef.current) return;
    setIsDownloading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(hiddenCardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        windowWidth: hiddenCardRef.current.scrollWidth,
        windowHeight: hiddenCardRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('birthday-card.pdf');
    } catch (error) {
      console.error('PDF failed:', error);
      alert('Failed to download PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="page-section page5">
      <h2 className="card-scene-title">
        {isOpen ? "💌 Your Birthday Message 💌" : "🎁 A Special Card for You 🎁"}
      </h2>

      {/* VISIBLE 3D CARD */}
      <div className={`birthday-card ${isOpen ? 'open' : ''}`}>
        <div className="card-front" onClick={() => setIsOpen(true)}>
          <div className="card-decoration">
            <div className="gift-bow">🎀</div>
            <div className="sparkle sparkle-1">✨</div>
            <div className="sparkle sparkle-2">✨</div>
            <div className="sparkle sparkle-3">✨</div>
            <div className="sparkle sparkle-4">✨</div>
          </div>
          <h3 className="card-front-text">Click to Open</h3>
          <p className="card-hint">👆 Tap here</p>
        </div>

        <div className="card-inside">
          <div className="card-left">
            <div className="decorative-border">
              <div className="flower">🌸</div>
              <div className="flower">🌺</div>
              <div className="flower">🌸</div>
            </div>
          </div>
          
          <div className="card-right">
            <div className="card-message">
              <CardMessage />
            </div>
          </div>
        </div>
      </div>

      {/* LARGE HIDDEN CARD FOR DOWNLOAD */}
      <div 
        ref={hiddenCardRef}
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '0',
          width: '900px',
          minHeight: '600px',
          height: 'auto',
          display: 'flex',
          background: 'linear-gradient(135deg, #ffffff, #fff5f7)',
          borderRadius: '30px',
          border: '4px solid #ff69b4',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)',
          overflow: 'visible',
        }}
      >
        <div style={{
          width: '35%',
          background: 'linear-gradient(180deg, #ff69b4, #ff4081)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          borderRight: '4px solid rgba(255, 255, 255, 0.3)',
          gap: '60px'
        }}>
          <div style={{ fontSize: '6rem' }}>🌸</div>
          <div style={{ fontSize: '6rem' }}>🌺</div>
          <div style={{ fontSize: '6rem' }}>🌸</div>
        </div>
        
        <div style={{ width: '65%', padding: '50px' }}>
          <CardMessage isLarge={true} />
        </div>
      </div>

      {isOpen && (
        <div className="card-actions">
          <button 
            className="download-btn download-image" 
            onClick={downloadAsImage}
            disabled={isDownloading}
          >
            {isDownloading ? '⏳ Downloading...' : '📸 Download Card'}
          </button>
          
          <button 
            className="download-btn download-pdf" 
            onClick={downloadAsPDF}
            disabled={isDownloading}
          >
            {isDownloading ? '⏳ Creating PDF...' : '📄 Save as PDF'}
          </button>
          
          <button 
            className="close-card-btn" 
            onClick={() => setIsOpen(false)}
          >
            Close Card 📖
          </button>
        </div>
      )}

      <p className="card-instruction">
        {isOpen 
          ? "Download your card to keep forever ❤️" 
          : "Click the card to reveal your message 💌"}
      </p>
    </section>
  );
};

export default Scene5;
