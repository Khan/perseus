import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import * as ReactDOMClient from "react-dom/client";

// We keep a cache of elements that have already had createRoot() called on
// them. If we don't do this, React 18 warns every subsequent call:
//   > You are calling ReactDOMClient.createRoot() on a container that has
//   > already been passed to createRoot() before.
//
// Note that this cache uses a WeakMap<> so that the cache isn't causing a
// memory leak (by retaining elements after they're released everywhere else).
const reactRootCache = new WeakMap<HTMLElement, ReactDOMClient.Root>();

/**
 * Renders the given ReactNode inside the given container.
 * @param element The JSX to render
 * @param container The HTML elemetn to render into
 *
 * @deprecated this function is legacy and exists to support ancient code
 * paths. Do not use in new code.
 */
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

    let root = reactRootCache.get(container);
    if (root == null) {
        root = ReactDOMClient.createRoot(container);
        reactRootCache.set(container, root);
    }
    root.render(children);
}
