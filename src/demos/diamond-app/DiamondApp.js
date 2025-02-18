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
              data-label="Yellow Gold"
            >
              <label title="Yellow Gold">&nbsp;&nbsp;&nbsp;</label>
            </button>
            <button
              style={{ backgroundColor: '#c0c0c0' }}
              className={`color-button ${mounting === '#c0c0c0' ? 'active' : ''}`}
              onClick={() => setMounting('#c0c0c0')}
              data-label="White Gold"
            >
              <label title="White Gold">&nbsp;&nbsp;&nbsp;</label>
            </button>
            <button
              style={{ backgroundColor: '#dea193' }}
              className={`color-button ${mounting === '#dea193' ? 'active' : ''}`}
              onClick={() => setMounting('#dea193')}
              data-label="Rose Gold"
            >
              <label title="Rose Gold">&nbsp;&nbsp;&nbsp;</label>
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
              data-label="White"
            >
              <label title="White">&nbsp;&nbsp;&nbsp;</label>
            </button>
            <button
              style={{ backgroundColor: '#ffb6c1' }}
              className={`color-button ${diamonds === '#ffb6c1' ? 'active' : ''}`}
              onClick={() => setDiamonds('#ffb6c1')}
              data-label="Pink"
            >
              <label title="Pink">&nbsp;&nbsp;&nbsp;</label>
            </button>
            <button
              style={{ backgroundColor: '#fffe73' }}
              className={`color-button ${diamonds === '#fffe73' ? 'active' : ''}`}
              onClick={() => setDiamonds('#fffe73')}
              data-label="Yellow"
            >
              <label title="Yellow">&nbsp;&nbsp;&nbsp;</label>
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