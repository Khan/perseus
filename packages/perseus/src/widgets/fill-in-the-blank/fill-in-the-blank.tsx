import {isFeatureOn} from "@khanacademy/perseus-core";
import * as React from "react";
import {forwardRef, useImperativeHandle} from "react";

import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {PerseusFillInTheBlankWidgetOptions} from "@khanacademy/perseus-core";

type FillInTheBlankProps = WidgetProps<PerseusFillInTheBlankWidgetOptions>;

/**
 * Fill in the Blank presents a passage with inline blanks above a choice bank
 * of answer tiles that the learner drags into them.
 */
const FillInTheBlankWidget = forwardRef<Widget, FillInTheBlankProps>(
    function FillInTheBlankWidget(props, ref) {
        // TODO(LEMS-4471): Write out the getPromptJSON function after checking
        useImperativeHandle(ref, () => ({}));

        // TODO(LEMS-4396): clean up feature flag
        if (!isFeatureOn(props, "dnd-widget-fitb")) {
            return null;
        }

        return (
            <div data-testid="fill-in-the-blank-widget">Fill in the Blank</div>
        );
    },
);

export default {
    name: "fill-in-the-blank",
    displayName: "Fill in the Blank",
    widget: FillInTheBlankWidget,
    isLintable: false,
    hidden: true,
} satisfies WidgetExports<typeof FillInTheBlankWidget>;
