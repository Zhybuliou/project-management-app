import React from 'react';
import { Header } from './components/Header/Header';
import { Router } from './components/Router/Router';
import { withErrorBoundary } from 'react-error-boundary';
import { Error } from './components/ErrorBoundary/Error';
import { Loader } from './components/Loader/Loader';
import { Footer } from './components/Footer/Footer';
import { ErrorSnackBar } from './components/snackBar/ErrorSnackBar';

function App() {
  return (
    <div className='App'>
      <Header />
      <Router />
      <Footer />
      <Loader />
      <ErrorSnackBar />
    </div>
  );
}

export default withErrorBoundary(App, {
  FallbackComponent: () => <Error />,
});
