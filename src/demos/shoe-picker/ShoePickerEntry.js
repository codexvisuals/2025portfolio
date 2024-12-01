import React from 'react';
import ShoeColorPickerScene from './ShoeColorPickerScene';
import { createRoot } from 'react-dom/client';

// Function to initialize the Shoe Picker app
function loadShoePicker(container) {
  if (!container) {
    console.error('Shoe Picker container not found');
    return;
  }

  // Proceed to render if the container exists
  const root = createRoot(container); // or ReactDOM.render for React 17
  root.render(<ShoeColorPickerScene />);
}

// Attach the initializer function to the global `window` object
if (typeof window !== 'undefined') {
  window.loadShoePicker = loadShoePicker;
}