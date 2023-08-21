import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import ReactDOM from "react-dom";

export default function render<ElementType extends React.ElementType>(
    element: React.ReactNode,
    container: HTMLElement,
    callback?: () => void,
): React.ElementRef<ElementType> {
    // TODO(LP-11406): Replace this, or callers, with React Portal
    // @ts-expect-error - TS2322 - Type 'void' is not assignable to type 'ElementRef<ElementType>'.
    // eslint-disable-next-line no-restricted-syntax
    return ReactDOM.render(
        /**
         * `RenderStateRoot` is responsible for tracking whether it's
         * the initial render or subsequent renders.  It's used by
         * `useUniqueId` and will be used by `UniqueIDProvider` and
         * `WithSSRPlaceholder` in the future.  We're placing it as
         * high up in the render tree as possible to ensure that any
         * components using that hook or those components will function
         * correctly.
         */
        <RenderStateRoot throwIfNested={false}>{element}</RenderStateRoot>,
        container,
        callback,
    );
}
