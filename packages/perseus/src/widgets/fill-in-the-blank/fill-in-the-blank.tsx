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
    // TODO(LEMS-4322): Gate on the `dnd-widget-fitb` feature flag instead, so
    // the widget can be turned on for testing rather than only off.
    hidden: true,
} satisfies WidgetExports<typeof FillInTheBlankWidget>;
