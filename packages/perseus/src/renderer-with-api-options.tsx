import * as React from "react";
import Renderer from "./renderer";
import {APIOptionsContext} from "./components/api-options-context";

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
export default function RendererWithAPIOptions(
    props: RendererWithAPIOptionsProps,
) {
    return (
        <APIOptionsContext.Consumer>
            {(apiOptions) => <Renderer {...props} apiOptions={apiOptions} />}
        </APIOptionsContext.Consumer>
    );
}
