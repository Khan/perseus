import {isFeatureOn} from "@khanacademy/perseus-core";
import * as React from "react";

import RendererNew from "./renderer.new";
import RendererOld from "./renderer.old";

import type {Props as RendererProps} from "./renderer.old";

const Renderer = (props: RendererProps) => {
    const rendererFF = isFeatureOn(
        {apiOptions: props.apiOptions},
        "perseus-renderer-upgrade",
    );

    return rendererFF ? <RendererNew {...props} /> : <RendererOld {...props} />;
};

export default Renderer;
