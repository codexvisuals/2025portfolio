// BouncyWatchEntry.js
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Loader } from '@react-three/drei';
import App from './App';

function loadBouncyWatch(container) {
  const root = createRoot(container);
  root.render(
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  );
}

window.loadBouncyWatch = loadBouncyWatch;
