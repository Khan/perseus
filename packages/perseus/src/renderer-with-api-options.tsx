import * as React from "react";

import {APIOptionsContext} from "./components/api-options-context";
import Renderer from "./renderer";

type RendererProps = React.ComponentProps<typeof Renderer>;

// Props that have defaults in Renderer.defaultProps should be optional
type PropsWithDefaults =
    | "alwaysUpdate"
    | "content"
    | "findExternalWidgets"
    | "highlightedWidgets"
    | "images"
    | "linterContext"
    | "onInteractWithWidget"
    | "onRender"
    | "questionCompleted"
    | "reviewMode"
    | "showSolutions"
    | "widgets";

type RendererWithAPIOptionsProps = Omit<
    RendererProps,
    "apiOptions" | PropsWithDefaults
> &
    Partial<Pick<RendererProps, PropsWithDefaults>>;

/**
 * Internal to Perseus only.
 *
 * Renderer that takes in `apiOptions` from the context, rather than
 * requiring it to be passed in as a prop.
 */
const RendererWithAPIOptions = React.forwardRef<
    Renderer,
    RendererWithAPIOptionsProps
>((props, ref) => {
    return (
        <APIOptionsContext.Consumer>
            {(apiOptions) => (
                <Renderer ref={ref} {...props} apiOptions={apiOptions} />
            )}
        </APIOptionsContext.Consumer>
    );
});

// Add a display name so that it doesn't show up as "ForwardRef"
// in React Dev Tools
RendererWithAPIOptions.displayName = "RendererWithAPIOptions";

export default RendererWithAPIOptions;
