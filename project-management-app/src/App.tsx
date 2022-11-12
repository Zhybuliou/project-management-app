import React from 'react';
import { Header } from './components/Header/Header';
import { Router } from './components/Router/Router';
import { withErrorBoundary } from 'react-error-boundary';
import { Error } from './components/ErrorBoundary/Error';
import { Loader } from './components/Loader/Loader';

function App() {
  return (
    <div className='App'>
      <Header />
      <Router />
      <Loader />
    </div>
  );
}

export default withErrorBoundary(App, {
  FallbackComponent: () => <Error />,
});
