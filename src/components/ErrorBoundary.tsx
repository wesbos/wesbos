'use client';
import * as React from 'react';

export class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean; error: string | null; info: React.ErrorInfo | null }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (error.message === 'Not Found') {
      // this isn't a error, it's expected.
      // TODO We should log these somewhere, probably serverside
      console.log(`Not Found Error`);
      return;
    }
    console.log(`Caught error: ${error.message}`);
    console.log({ error, info });
    // console.error(
    //   error,
    //   // Example "componentStack":
    //   //   in ComponentThatThrows (created by App)
    //   //   in ErrorBoundary (created by App)
    //   //   in div (created by App)
    //   //   in App
    //   info.componentStack,
    //   // Only available in react@canary.
    //   // Warning: Owner Stack is not available in production.
    //   // React.captureOwnerStack()
    // );
    this.setState({ hasError: true, error: error.message, info });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      console.log('SSR error boundary?', import.meta.env.SSR);
      return <ErrorBoundaryFallback error={this.state.error} info={this.state.info} />;
    }

    return this.props.children;
  }
}

const errorLookup: Record<string, string> = {
  default: 'Shoot, eh! Error',
  'Not Found': '4 OH CANADA 4',
};

export function ErrorBoundaryFallback({ error, info }: { error: string | null; info: React.ErrorInfo | null }) {
  const title = errorLookup[error ?? 'default'] || errorLookup.default;
  return (
    <div>
      <h1>{title}</h1>
      <p>
        You might just need to {/* biome-ignore lint/a11y/useValidAnchor: This is a valid link to the current page */}
        <a href="">refresh the page</a>.
      </p>
      <p>
        If the problem persists, please contact me at <a href="mailto:hey@wesbos.com">hey@wesbos.com</a>.
      </p>
      <p
        style={{
          borderLeft: '4px solid red',
          padding: '1rem',
          background: 'rgba(255, 0, 0, 0.1)',
        }}
      >
        {error}
      </p>
    </div>
  );
}
