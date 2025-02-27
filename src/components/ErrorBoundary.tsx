'use client';
import * as React from "react";

export class ErrorBoundary extends React.Component<{ fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { fallback: React.ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log(`Caught error: ${error.message}`);
    console.error(
      error,
      // Example "componentStack":
      //   in ComponentThatThrows (created by App)
      //   in ErrorBoundary (created by App)
      //   in div (created by App)
      //   in App
      info.componentStack,
      // Only available in react@canary.
      // Warning: Owner Stack is not available in production.
      // React.captureOwnerStack()
    );
    this.setState({ hasError: true, error: error.message, info });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      console.log("SSR error boundary?", import.meta.env.SSR);
      return <ErrorBoundaryFallback error={this.state.error} info={this.state.info} />;
    }

    return this.props.children;
  }
}

export function ErrorBoundaryFallback({ error, info }: { error: Error, info: React.ErrorInfo }) {

  return (
    <div>
      <h1>Shoot, eh! Error</h1>
      <p>
        You might just need to <a href="">refresh the page</a>.
      </p>
      <p>
        If the problem persists, please contact me at{" "}
        <a href="mailto:hey@wesbos.com">hey@wesbos.com</a>.
      </p>
      <p style={{
        borderLeft: '4px solid red',
        padding: '1rem',
        background: 'rgba(255, 0, 0, 0.1)',
      }}>
        {error}
      </p>
    </div>
  );
}
