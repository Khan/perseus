import * as React from "react";

import {Errors, Log} from './logging/log';

type ErrorBoundaryProps = {
    children: React.ReactNode
};
type ErrorBoundaryState = {
    error: string
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {error: ""};
    }

    componentDidCatch(error: Error, info: any) {
        this.setState({error: error.toString()});
        Log.error("Perseus error boundary caught error", Errors.Internal, {
            cause: error,
            loggedMetadata: {info: info.toString()},
        });
    }

    render(): React.ReactElement {
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
// @ts-expect-error [FEI-5003] - TS2322 - Type 'ReactNode' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.
        return this.props.children;
    }
}

export default ErrorBoundary;
