import React from 'react';
import ReactDOM from 'react-dom';
import ShoeColorPickerScene from './ShoeColorPickerScene';

// Named export for the initializer function
export function loadShoePicker(container) {
  ReactDOM.render(<ShoeColorPickerScene />, container);
}

// Attach the initializer function to the global `window` object
if (typeof window !== 'undefined') {
  window.loadShoePicker = loadShoePicker;
}
