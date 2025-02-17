import React, { Suspense } from 'react';
import ShoeColorPickerScene from './ShoeColorPickerScene';
import { Loader } from '@react-three/drei';
import { createRoot } from 'react-dom/client';


// Function to initialize the Shoe Picker app
function loadShoePicker(container) {
  if (!container) {
    console.error('Shoe Picker container not found');
    return;
  }

  // Proceed to render if the container exists
  const root = createRoot(container); // or ReactDOM.render for React 17
  root.render(
    <Suspense fallback={<Loader />}>
      <ShoeColorPickerScene />
    </Suspense>
  );
}

// Attach the initializer function to the global `window` object
if (typeof window !== 'undefined') {
  window.loadShoePicker = loadShoePicker;
}