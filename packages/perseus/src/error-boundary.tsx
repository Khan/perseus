import * as React from "react";

import {Errors, Log} from "./logging/log";

type Props = {
    children: React.ReactNode;
    metadata?: Record<string, string>;
    onError?: (error: Error, info: any) => void;
};

type State = {
    error: string;
};

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {error: ""};
    }

    componentDidCatch(error: Error, info: any) {
        this.setState({error: error.toString()});
        Log.error("Perseus error boundary caught error", Errors.Internal, {
            cause: error,
            loggedMetadata: {
                componentStack: info.componentStack,
                ...this.props.metadata,
            },
        });
        this.props.onError?.(error, info);
    }

    render(): React.ReactNode {
        if (this.state.error) {
            // TODO(djf): perhaps we should have one error boundary for
            // inline elements and one for block elements. This one uses
            // a <span> and effectively converts block elements with
            // errors into inline elements.
            // TODO(michaelpolyak): Link error icon to "Report a problem".
            return (
                <svg height="16" width="16" viewBox="0 0 16 16">
                    <path
                        d="m8 16c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-3c0.55 0 1-0.45 1-1s-0.45-1-1-1-1 0.45-1 1 0.45 1 1 1zm0-9c-0.55 0-1 0.45-1 1v4c0 0.55.45 1 1 1s1-0.45 1-1v-4c0-0.55-0.45-1-1-1z"
                        fill="#d92916"
                        fillRule="evenodd"
                    />
                </svg>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
