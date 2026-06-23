// TODO(LEMS-4304): feature flag cleanup - remove this file in favor of
// making renderer.new.tsx the default renderer.
import {isFeatureOn} from "@khanacademy/perseus-core";
import * as React from "react";

import RendererNew from "./renderer.new";
import RendererOld from "./renderer.old";

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
    | "showSolutions"
    | "linterContext";

type Props = Omit<InternalProps, DefaultedPropKeys> &
    Partial<Pick<InternalProps, DefaultedPropKeys>>;

type Renderer =
    | InstanceType<typeof RendererNew>
    | InstanceType<typeof RendererOld>;

const Renderer = React.forwardRef<Renderer, Props>(
    function Renderer(props, ref) {
        const rendererFF = isFeatureOn(
            {apiOptions: props.apiOptions},
            "perseus-renderer-upgrade",
        );

        return rendererFF ? (
            <RendererNew ref={ref} {...props} />
        ) : (
            <RendererOld ref={ref} {...props} />
        );
    },
);

export default Renderer;
