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
        <div className="w-full h-full min-h-[300px] flex-center flex-col p-6 rounded-2xl bg-neutral-950/80 border border-rose-500/20 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-sm">
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
            className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs h-8 px-4 rounded-lg gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Component</span>
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
