import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './App.tsx';
import GenericErrorBoundary from './components/common/ErrorBoundary/GenericErrorBoundary.tsx';

// This file is the main entry point for the React application.

// Import the base structural styles for the entire app.
// This file does not contain theme-specific colors and ensures a consistent foundation.
import './styles/base.css';

// The App component will dynamically load the theme-specific CSS files 
// (e.g., theme.css, halloween.css) which contain the color variable definitions.

// Render the main App component into the root DOM element.
// React.StrictMode is used to highlight potential problems in an application.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenericErrorBoundary>
      <AppWrapper />
    </GenericErrorBoundary>
  </React.StrictMode>,
);