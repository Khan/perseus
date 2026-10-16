// TODO(LEMS-4304): feature flag cleanup - remove this file in favor of
// making renderer.new.tsx the default renderer.
import * as React from "react";

import RendererNew from "./renderer.new";

import type {Props as InternalProps} from "./renderer.old";

export {isDifferentQuestion} from "./renderer.old";

export type {DifferentQuestionPartialProps} from "./renderer.old";

/**
 * Props that the underlying class renderers supply via `defaultProps`, so
 * callers are allowed to omit them.
 *
 * The old/new renderers are class components and relied on React's
 * `defaultProps` to make these optional at the JSX call site. `forwardRef`
 * does not carry `defaultProps` through its type, so we have to express that
 * optionality explicitly here to preserve the public API.
 */
type DefaultedPropKeys =
    | "content"
    | "widgets"
    | "images"
    | "findExternalWidgets"
    | "onRender"
    | "alwaysUpdate"
    | "reviewMode"
    | "isScorable"
    | "showSolutions"
    | "linterContext";

type Props = Omit<InternalProps, DefaultedPropKeys> &
    Partial<Pick<InternalProps, DefaultedPropKeys>>;

type Renderer = RendererNew;

const Renderer = React.forwardRef<RendererNew, Props>(
    function Renderer(props, ref) {
        return <RendererNew ref={ref} {...props} />;
    },
);

export default Renderer;
