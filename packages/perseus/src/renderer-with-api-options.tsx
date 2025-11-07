import * as React from "react";
import Renderer from "./renderer";
import {APIOptionsContext} from "./components/api-options-context";

/**
 * Internal to Perseus only.
 *
 * Renderer that takes in `apiOptions` from the context, rather than
 * requiring it to be passed in as a prop.
 */
export default function RendererWithAPIOptions(
    props: Omit<React.ComponentProps<typeof Renderer>, "apiOptions">,
) {
    return (
        <APIOptionsContext.Consumer>
            {(apiOptions) => <Renderer {...props} apiOptions={apiOptions} />}
        </APIOptionsContext.Consumer>
    );
}
