import React, {forwardRef, useImperativeHandle} from "react";

import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/image/image-ai-utils";

import {ImageComponent} from "./image";

import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {ImagePromptJSON} from "../../widget-ai-utils/image/image-ai-utils";
import type {PerseusImageWidgetOptions} from "@khanacademy/perseus-core";

export type ImageWidgetProps = WidgetProps<PerseusImageWidgetOptions>;

// Widget interface methods exposed via ref
type WidgetHandle = Pick<Widget, "getPromptJSON">;

const ImageWidget = forwardRef<WidgetHandle, ImageWidgetProps>(
    function ImageWidget(props, ref) {
        useImperativeHandle(ref, () => ({
            getPromptJSON: (): ImagePromptJSON => _getPromptJSON(props),
        }));

        return <ImageComponent {...props} />;
    },
);

export default {
    name: "image",
    displayName: "Image",
    widget: ImageWidget,
    isLintable: true,
} satisfies WidgetExports<typeof ImageWidget>;
