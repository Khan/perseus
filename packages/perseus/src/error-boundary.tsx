import {Errors} from "@khanacademy/perseus-core";
import * as React from "react";

import {Log} from "./logging/log";

type Props = {
    children: React.ReactNode;
    metadata?: Record<string, string>;

    // A callback that is called when the error boundary traps an error.
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
        this.props.onError?.(error, info);
        Log.error(
            // NOTE(jeremy): We concatenate the error messsage here. Typical
            // Khan Academy error handling guidance says that you should never
            // "build" the error message that might be sent to our error
            // reporting tool (currently Sentry). However, if we don't
            // differentiate between the different errors that are thrown, they
            // all end up being grouped as a single Sentry event, which is very
            // unhelpful.
            "Unhandled Perseus error: " + error.message,
            Errors.Internal,
            {
                cause: error,
                loggedMetadata: {
                    componentStack:
                        !!info && "componentStack" in info
                            ? info.componentStack
                            : "componentStack not provided",
                    ...this.props.metadata,
                },
            },
        );
    }

    render(): React.ReactNode {
        if (this.state.error) {
            return (
                <svg height="16" width="16" viewBox="0 0 16 16" role={"img"}>
                    <title>Rendering Error!</title>
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
