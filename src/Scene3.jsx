import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Sparkles } from '@react-three/drei';
import ConfettiExplosion from 'react-confetti-explosion';
import gsap from 'gsap';

function CakeModel({ cakeRef, isAutoRotate }) {
  const { scene } = useGLTF('/cake.glb');
  
  // Auto-rotation continues unless manually controlled
  useFrame((state, delta) => {
    if (cakeRef.current && isAutoRotate) {
      cakeRef.current.rotation.y += delta * 0.5;
    }
  });
  
  return <primitive ref={cakeRef} object={scene} scale={2.5} position={[0, -120, 0]} />;
}

function Fireworks({ isActive }) {
  if (!isActive) return null;
  
  return (
    <>
      <Sparkles count={300} scale={10} size={6} speed={2} opacity={1} color="#ff0000" position={[0, 2, 0]} />
      <Sparkles count={300} scale={10} size={6} speed={2} opacity={1} color="#00ff00" position={[2, 2, 2]} />
      <Sparkles count={300} scale={10} size={6} speed={2} opacity={1} color="#0000ff" position={[-2, 2, -2]} />
      <Sparkles count={300} scale={10} size={6} speed={2} opacity={1} color="#ffff00" position={[2, 2, -2]} />
      <Sparkles count={300} scale={10} size={6} speed={2} opacity={1} color="#ff00ff" position={[-2, 2, 2]} />
    </>
  );
}

const Scene3 = () => {
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHorizontalSwipe, setIsHorizontalSwipe] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  
  const startX = useRef(0);
  const startY = useRef(0);
  const startRotation = useRef(0);
  const cakeRef = useRef();
  const autoRotateTimeout = useRef(null);

  const handleCutCake = () => {
    setIsCakeCut(true);
    setShowFireworks(true);
    // Fireworks stop after 5 seconds, but rotation continues
    setTimeout(() => setShowFireworks(false), 5000);
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    // Don't interfere if clicking the button
    if (e.target.closest('.cut-cake-button')) return;
    
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    setIsHorizontalSwipe(false);
    
    if (autoRotateTimeout.current) {
      clearTimeout(autoRotateTimeout.current);
    }
    
    if (cakeRef.current) {
      startRotation.current = cakeRef.current.rotation.y;
    }
  };

  const handleTouchMove = (e) => {
    if (!cakeRef.current) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - startX.current;
    const deltaY = currentY - startY.current;
    
    if (!isHorizontalSwipe && !isDragging) {
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 15) {
        setIsHorizontalSwipe(true);
        setIsDragging(true);
        setIsAutoRotate(false);
      }
      return;
    }
    
    if (isHorizontalSwipe && isDragging) {
      const newRotation = startRotation.current + (deltaX * 0.01);
      gsap.to(cakeRef.current.rotation, { 
        y: newRotation, 
        duration: 0.1, 
        ease: 'power1.out', 
        overwrite: true 
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsHorizontalSwipe(false);
    
    // Resume auto-rotation after 3 seconds
    autoRotateTimeout.current = setTimeout(() => {
      setIsAutoRotate(true);
    }, 3000);
  };

  // Mouse handlers
  const handleMouseDown = (e) => {
    // Don't interfere if clicking the button
    if (e.target.closest('.cut-cake-button')) return;
    
    setIsDragging(true);
    setIsAutoRotate(false);
    startX.current = e.clientX;
    
    if (autoRotateTimeout.current) {
      clearTimeout(autoRotateTimeout.current);
    }
    
    if (cakeRef.current) {
      startRotation.current = cakeRef.current.rotation.y;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    autoRotateTimeout.current = setTimeout(() => {
      setIsAutoRotate(true);
    }, 3000);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !cakeRef.current) return;
    const deltaX = e.clientX - startX.current;
    const newRotation = startRotation.current + (deltaX * 0.01);
    gsap.to(cakeRef.current.rotation, { 
      y: newRotation, 
      duration: 0.15, 
      ease: 'power1.out', 
      overwrite: true 
    });
  };

  return (
    <section 
      className="page-section page3"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ 
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'pan-y'
      }}
    >
      <h2 className="final-message-top">
        {isCakeCut ? '🎉 Happy Birthday! 🎉' : 'Make a wish!'}
      </h2>
      
      <Canvas 
        camera={{ position: [-120, 100, -200], fov: 75 }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={1.8} />
        <pointLight position={[0, 2, 0]} intensity={40} color="#ff9a21" />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        <directionalLight position={[-5, 5, -5]} intensity={1.5} />
        
        <Suspense fallback={null}>
          <CakeModel cakeRef={cakeRef} isAutoRotate={isAutoRotate} />
          <Sparkles count={100} scale={6} size={2} speed={0.3} color="#ff4081" />
          <Fireworks isActive={showFireworks} />
        </Suspense>
      </Canvas>
      
      {/* Confetti - only shows for 5 seconds */}
      {isCakeCut && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', zIndex: 100 }}>
          <ConfettiExplosion
            force={0.8}
            duration={30000}
            particleCount={250}
            width={1600}
            colors={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']}
          />
        </div>
      )}
      
      {/* Button disappears after cutting */}
      {!isCakeCut && (
        <button className="cut-cake-button" onClick={handleCutCake}>
          🎂 Cut the Cake! 🎂
        </button>
      )}
      
      {/* Message appears after cutting */}
      {isCakeCut && (
        <p className="celebration-text">
          ✨ Wishing you the best birthday ever! ✨
        </p>
      )}
      
      <p className="scene-instruction">
        ← Swipe left/right to rotate cake →
      </p>
    </section>
  );
};

export default Scene3;
