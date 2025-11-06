// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

import AppWrapper from './App';
import GenericErrorBoundary from './components/common/ErrorBoundary/GenericErrorBoundary';
import { AuthProvider } from './contexts/AuthProvider';

import './styles/base.css';
import './styles/theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenericErrorBoundary>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </GenericErrorBoundary>
  </React.StrictMode>,
);