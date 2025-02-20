import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

function loadLusionConnectors(container) {
  if (!container) {
    console.error('Lusion Connectors container not found!');
    return;
  }
  const root = createRoot(container);
  root.render(<App />);
}

// Attach loadLusionConnectors to the global window object
if (typeof window !== 'undefined') {
  window.loadLusionConnectors = loadLusionConnectors;
}
