import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Your image paths
const imageUrls = [
  '/images/img1.jpg',
  '/images/img2.jpg',
  '/images/img3.jpg',
  '/images/img4.jpg',
  '/images/img5.jpg',
  '/images/img6.jpg',
];

// Photo card with smaller sizes
function PhotoCard({ url, position, rotation, isMobile }) {
  const texture = useTexture(url);
  
  // Smaller card sizes across all devices
  const borderWidth = isMobile ? 1.0 : 1.5;
  const borderHeight = isMobile ? 1.4 : 2.0;
  const imageWidth = isMobile ? 0.85 : 1.3;
  const imageHeight = isMobile ? 1.25 : 1.8;
  
  return (
    <group position={position} rotation={rotation}>
      {/* PINK BORDER */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[borderWidth, borderHeight]} />
        <meshBasicMaterial 
          color="#ff4081" 
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* FRONT SIDE - Image */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[imageWidth, imageHeight]} />
        <meshBasicMaterial 
          map={texture}
          side={THREE.FrontSide}
          toneMapped={false}
        />
      </mesh>
      
      {/* BACK SIDE - Same image */}
      <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[imageWidth, imageHeight]} />
        <meshBasicMaterial 
          map={texture}
          side={THREE.FrontSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Gallery({ galleryRef, isMobile }) {
  const radius = isMobile ? 1.6 : 2.0;
  
  return (
    <group ref={galleryRef}>
      {imageUrls.map((url, i) => {
        const angle = (i / imageUrls.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        return (
          <Suspense key={i} fallback={null}>
            <PhotoCard
              url={url}
              position={[x, 0, z]}
              rotation={[0, -angle + Math.PI / 2, 0]}
              isMobile={isMobile}
            />
          </Suspense>
        );
      })}
    </group>
  );
}

const Scene2 = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const startX = useRef(0);
  const startRotation = useRef(0);
  const galleryRef = useRef();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX;
    if (galleryRef.current) {
      startRotation.current = galleryRef.current.rotation.y;
    }
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !galleryRef.current) return;
    
    const deltaX = e.clientX - startX.current;
    const newRotation = startRotation.current + (deltaX * 0.01);
    
    gsap.to(galleryRef.current.rotation, {
      y: newRotation,
      duration: 0.15,
      ease: 'power1.out',
      overwrite: true,
    });
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
    if (galleryRef.current) {
      startRotation.current = galleryRef.current.rotation.y;
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !galleryRef.current) return;
    
    const deltaX = e.touches[0].clientX - startX.current;
    const newRotation = startRotation.current + (deltaX * 0.01);
    
    gsap.to(galleryRef.current.rotation, {
      y: newRotation,
      duration: 0.15,
      ease: 'power1.out',
      overwrite: true,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const cameraPosition = isMobile ? [0, 0, 3.5] : [0, 0, 4.5];

  return (
    <section 
      className="page-section page2"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ 
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
    >
      <h2 className="scene-heading">A few of my favorite moments...</h2>
      
      <Canvas 
        camera={{ 
          position: cameraPosition, 
          fov: isMobile ? 70 : 60,
          near: 0.1,
          far: 100
        }}
      >
        <ambientLight intensity={3} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, -5, -5]} intensity={1.5} />
        
        <Sparkles
          count={isMobile ? 150 : 200}
          scale={isMobile ? 10 : 15}
          size={isMobile ? 2 : 3}
          speed={0.3}
          opacity={0.6}
          color="#ffffff"
        />
        
        <Sparkles
          count={isMobile ? 75 : 100}
          scale={isMobile ? 8 : 12}
          size={isMobile ? 1.5 : 2}
          speed={0.2}
          opacity={0.4}
          color="#ff69b4"
        />
        
        <Suspense fallback={null}>
          <Gallery galleryRef={galleryRef} isMobile={isMobile} />
        </Suspense>
      </Canvas>
      
      <p className="scene-instruction">
        {isMobile ? '👆 Swipe to rotate' : '← Drag to rotate →'}
      </p>
    </section>
  );
};

export default Scene2;
