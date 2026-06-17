import {isFeatureOn} from "@khanacademy/perseus-core";
import * as React from "react";

import RendererNew from "./renderer.new";
import RendererOld from "./renderer.old";

import type {Props as RendererProps} from "./renderer.old";

export {isDifferentQuestion} from "./renderer.old";

export type {Props, DifferentQuestionPartialProps} from "./renderer.old";

const Renderer = React.forwardRef(function Renderer(
    props: RendererProps,
    ref: React.ForwardedRef<
        InstanceType<typeof RendererNew> | InstanceType<typeof RendererOld>
    >,
) {
    const rendererFF = isFeatureOn(
        {apiOptions: props.apiOptions},
        "perseus-renderer-upgrade",
    );

    return rendererFF ? (
        <RendererNew ref={ref} {...props} />
    ) : (
        <RendererOld ref={ref} {...props} />
    );
});

export default Renderer;
