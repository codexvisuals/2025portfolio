import React from 'react';
import { createRoot } from 'react-dom/client';
import DiamondApp from './DiamondApp';

function loadDiamondApp(container) {
  if (!container) {
    console.error('Diamond App container not found!');
    return;
  }
  const root = createRoot(container);
  root.render(<DiamondApp />);
}

// Attach loadDiamondApp to the global window object
if (typeof window !== 'undefined') {
  window.loadDiamondApp = loadDiamondApp;
}

export { loadDiamondApp }; // Ensure this is exported correctly
