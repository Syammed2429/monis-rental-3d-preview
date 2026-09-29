"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ComponentErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ComponentErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex-center h-full min-h-[300px] w-full flex-col space-y-4 rounded-2xl border border-rose-500/20 bg-neutral-950/80 p-6 text-center">
          <div className="flex-center h-12 w-12 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div className="max-w-sm space-y-1">
            <h3 className="text-sm font-semibold text-white">
              {this.props.fallbackTitle || "Component Temporarily Unavailable"}
            </h3>
            <p className="text-xs text-neutral-400">
              An issue occurred while rendering this section. Click below to reload it.
            </p>
          </div>
          <Button
            size="sm"
            onClick={this.handleReset}
            className="h-8 gap-1.5 rounded-lg bg-emerald-500 px-4 text-xs font-bold text-neutral-950 hover:bg-emerald-400"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reload Component</span>
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
