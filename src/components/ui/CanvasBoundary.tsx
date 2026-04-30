import { Component, type ReactNode } from "react";

type CanvasBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type CanvasBoundaryState = {
  hasError: boolean;
};

class CanvasBoundary extends Component<CanvasBoundaryProps, CanvasBoundaryState> {
  state: CanvasBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default CanvasBoundary;
