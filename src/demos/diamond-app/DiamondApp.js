import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import DiamondScene from './DiamondScene';
import useVisibility from '/src/shared/useVisibility';

export default function DiamondApp() {
  const canvasRef = useRef(null);
  const isVisible = useVisibility(canvasRef);

  const [mounting, setMounting] = useState('#c0c0c0'); // Default to white gold
  const [diamonds, setDiamonds] = useState('#ffffff'); // Default to white
  const shadow = '#000000';

  return (
    <div className="diamond-app-container">
      {/* Controls Overlay */}
      <div className="controls-overlay">
        <div className="control-group">
          <h3>Metal</h3>
          <div className="buttons">
            <button
              style={{ backgroundColor: '#d4af37' }}
              className={`color-button ${mounting === '#d4af37' ? 'active' : ''}`}
              onClick={() => setMounting('#d4af37')}
            >
              Gold
            </button>
            <button
              style={{ backgroundColor: '#c0c0c0' }}
              className={`color-button ${mounting === '#c0c0c0' ? 'active' : ''}`}
              onClick={() => setMounting('#c0c0c0')}
            >
              Silver
            </button>
            <button
              style={{ backgroundColor: '#b76e79' }}
              className={`color-button ${mounting === '#b76e79' ? 'active' : ''}`}
              onClick={() => setMounting('#b76e79')}
            >
              Rose Gold
            </button>
          </div>
        </div>
        <div className="control-group">
          <h3>Diamond Color</h3>
          <div className="buttons">
            <button
              style={{ backgroundColor: '#ffffff' }}
              className={`color-button ${diamonds === '#ffffff' ? 'active' : ''}`}
              onClick={() => setDiamonds('#ffffff')}
            >
              White
            </button>
            <button
              style={{ backgroundColor: '#ffb6c1' }}
              className={`color-button ${diamonds === '#ffb6c1' ? 'active' : ''}`}
              onClick={() => setDiamonds('#ffb6c1')}
            >
              Light Pink
            </button>
            <button
              style={{ backgroundColor: '#fffe40' }}
              className={`color-button ${diamonds === '#fffe40' ? 'active' : ''}`}
              onClick={() => setDiamonds('#fffe40')}
            >
              Canary Yellow
            </button>
          </div>
        </div>
      </div>
    <Canvas
      ref={canvasRef}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [-5, 5, 14], fov: 20 }}
    >
      {isVisible &&       <DiamondScene
        mounting={mounting}
        diamonds={diamonds}
        onMountingChange={setMounting}
        onDiamondsChange={setDiamonds}
        shadow={shadow}
      />}
    </Canvas>
    </div>
  );
}