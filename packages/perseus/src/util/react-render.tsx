import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import * as ReactDOMClient from "react-dom/client";

export default function render(
    element: React.ReactNode,
    container: HTMLElement,
) {
    /**
     * `RenderStateRoot` is responsible for tracking whether it's
     * the initial render or subsequent renders.  It's used by
     * `useUniqueId` and will be used by `UniqueIDProvider` and
     * `WithSSRPlaceholder` in the future.  We're placing it as
     * high up in the render tree as possible to ensure that any
     * components using that hook or those components will function
     * correctly.
     */
    const children = (
        <RenderStateRoot throwIfNested={false}>{element}</RenderStateRoot>
    );

    const root = ReactDOMClient.createRoot(container);
    root.render(children);
}
