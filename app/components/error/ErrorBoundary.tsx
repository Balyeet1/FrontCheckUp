"use client"
import React, { ErrorInfo, ReactNode } from 'react';
import GlobalError from '@/app/global-error';

type ErrorBoundaryProps = {
    children: ReactNode;
    fallbackComponent?: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallbackComponent) {
                return this.props.fallbackComponent;
            }
            
            return <GlobalError />
        }

        return this.props.children;
    }
}

export default ErrorBoundary;