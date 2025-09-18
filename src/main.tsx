// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './App.tsx';
import GenericErrorBoundary from './components/common/ErrorBoundary/GenericErrorBoundary.tsx';
import { AuthProvider } from './contexts/AuthProvider.tsx'; // Updated import

import './styles/base.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenericErrorBoundary>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </GenericErrorBoundary>
  </React.StrictMode>,
);