/**
 * Higher-Order Component that provides APIOptions to the wrapped component.
 */
import React from "react";

import {APIOptionsContext} from "./api-options-context";

export default function withAPIOptions<T>(
    WrappedComponent: React.ComponentType<any>,
) {
    return React.forwardRef<T, any>(function WithApiOptions(props, ref) {
        const {apiOptions} = React.useContext(APIOptionsContext);
        return (
            <WrappedComponent ref={ref} apiOptions={apiOptions} {...props} />
        );
    });
}
