import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import './GenericErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// A simple component to intentionally throw an error for testing purposes.
const ErrorTrigger = () => {
    const [shouldThrow, setShouldThrow] = React.useState(false);
    if (shouldThrow) {
        throw new Error('This is a test error!');
    }
    return (
        <button 
            className="error-trigger-btn" 
            onClick={() => setShouldThrow(true)}
            title="Click to test the error boundary"
        >
            Test Error Boundary
        </button>
    );
};

class GenericErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service here
    console.error("Uncaught error:", error, errorInfo);
  }
  
  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-fallback">
          <h2>Something went wrong.</h2>
          <p>An unexpected error occurred. Please try refreshing the page.</p>
          <button onClick={this.handleReset}>Try again</button>
          {/* Only show the test trigger in development mode */}
          {process.env.NODE_ENV === 'development' && <ErrorTrigger />}
        </div>
      );
    }

    return this.props.children;
  }
}

export default GenericErrorBoundary;