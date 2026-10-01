import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg-deep">
          <div className="text-center p-8">
            <h1 className="font-playfair text-2xl text-rose-petal mb-4">
              Something went wrong
            </h1>
            <p className="font-cormorant text-rose-gold mb-6">
              Please refresh the page
            </p>
            <button
              onClick={() => window.location.reload()}
              className="glass px-6 py-3 rounded-full font-playfair text-rose-petal hover:scale-105 transition-transform border-gradient"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
