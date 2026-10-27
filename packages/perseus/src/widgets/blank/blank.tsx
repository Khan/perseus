import * as React from "react";
import {forwardRef, useContext, useImperativeHandle} from "react";

import {BlankComponent} from "../../components/drag-and-drop/blank";

import {BlankContext} from "./blank-context";

import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {
    PerseusBlankWidgetOptions,
    PerseusBlankUserInput,
} from "@khanacademy/perseus-core";

type BlankProps = WidgetProps<PerseusBlankWidgetOptions, PerseusBlankUserInput>;

/**
 * The blank widget is Fill in the Blank's inline drop slot. All rendering
 * lives in the shared BlankComponent; this widget supplies the Perseus
 * plumbing around it. The renderer-assigned widgetId becomes the blankId,
 * which is unique within this renderer and names the blank as a drop
 * target and move target.
 *
 * The parent widget supplies the placed tile through BlankContext.
 * Without a provider, the slot renders empty.
 */
const BlankWidget = forwardRef<Widget, BlankProps>(
    function BlankWidget(props, ref) {
        // TODO(LEMS-4471): Write out the getPromptJSON function after checking
        // with the TUT team about what data they need from this widget.
        useImperativeHandle(ref, () => ({}));
        const blankContext = useContext(BlankContext);

        return (
            <BlankComponent
                blankId={props.widgetId}
                displayType={props.options.displayType}
                // TODO(LEMS-4448): Remove testid once we have a better way
                // to identify a blank-widget
                testId="blank-widget"
            >
                {blankContext?.renderPlacedTile(props.widgetId)}
            </BlankComponent>
        );
    },
);
export default {
    name: "blank",
    displayName: "Blank",
    widget: BlankWidget,
    isLintable: true,
    hidden: true,
} satisfies WidgetExports<typeof BlankWidget>;
