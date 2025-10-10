// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

import AppWrapper from './App';
import GenericErrorBoundary from './components/common/ErrorBoundary/GenericErrorBoundary';
import { AuthProvider } from './contexts/AuthProvider';

// --- FIX: Import global and theme stylesheets here ---
import './styles/base.css';
import './styles/theme.css'; // This makes the theme variables available everywhere

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenericErrorBoundary>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </GenericErrorBoundary>
  </React.StrictMode>,
);