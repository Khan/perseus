import * as React from "react";
import {forwardRef, useContext, useImperativeHandle} from "react";

import {BlankComponent} from "../../components/drag-and-drop/blank";
import {FillInTheBlankContext} from "../../components/drag-and-drop/fill-in-the-blank/fill-in-the-blank-context";

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
 * Inside a Fill in the Blank component, the FillInTheBlankContext
 * supplies the placed tile and the empty-slot width. Outside of one,
 * the widget renders a bare empty slot.
 */
const BlankWidget = forwardRef<Widget, BlankProps>(
    function BlankWidget(props, ref) {
        // TODO(LEMS-4471): Write out the getPromptJSON function after checking
        // with the TUT team about what data they need from this widget.
        useImperativeHandle(ref, () => ({}));

        const {displayType} = props.options;
        const fillInTheBlank = useContext(FillInTheBlankContext);
        const renderInfo = fillInTheBlank?.getBlankRenderInfo(
            props.widgetId,
            displayType,
        );

        // Only normal blanks take the widest-tile width. Super and
        // subscript blanks keep their small fixed size.
        const minWidth =
            displayType === "normal" ? renderInfo?.widestTileWidth : undefined;

        return (
            <BlankComponent
                blankId={props.widgetId}
                displayType={displayType}
                keepsWidthWhenFilled={
                    displayType === "normal" &&
                    renderInfo?.keepsWidthWhenFilled === true
                }
                minWidth={minWidth}
                // TODO(LEMS-4448): Remove testid once we have a better way
                // to identify a blank-widget
                testId="blank-widget"
            >
                {renderInfo?.placedTile}
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
