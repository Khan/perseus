import React from "react";

import {useGenerateUrl} from "../util/use-generate-url";

import type {GenerateUrlFn} from "../types";

/**
 * Higher-Order Component that adds a `generateUrl` prop to the wrapped component.
 * The `generateUrl` function is obtained from the GenerateUrlContext via the
 * useGenerateUrl hook.
 */
export function withGenerateUrl<P extends {generateUrl?: GenerateUrlFn}>(
    WrappedComponent: React.ComponentType<P>,
): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<Omit<P, "generateUrl">> & React.RefAttributes<any>
> {
    const WithGenerateUrlComponent = React.forwardRef<
        any,
        Omit<P, "generateUrl">
    >((props, ref) => {
        const generateUrl = useGenerateUrl();

        return (
            <WrappedComponent
                {...(props as P)}
                generateUrl={generateUrl}
                ref={ref}
            />
        );
    });

    WithGenerateUrlComponent.displayName = `withGenerateUrl(${
        WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

    return WithGenerateUrlComponent;
}
