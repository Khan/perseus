// @flow
/**
 * A side by side diff view for Perseus renderers.
 */
import {Widgets} from "@khanacademy/perseus";
import * as React from "react";
import _ from "underscore";

import TextDiff from "./text-diff.jsx";
import WidgetDiff from "./widget-diff.jsx";

import type {PerseusRenderer} from "@khanacademy/perseus";

// In diffs, only show the widgetInfo props that can change
const filterWidgetInfo = function (widgetInfo, showAlignmentOptions) {
    const {alignment, graded, options, type} = widgetInfo || {};

    const filteredWidgetInfo = {options};

    // Show alignment options iff multiple valid ones exist for this widget
    if (
        showAlignmentOptions &&
        Widgets.getSupportedAlignments(type).length > 1
    ) {
        // $FlowFixMe[prop-missing]
        filteredWidgetInfo.alignment = alignment;
    }

    if (type === "transformer") {
        // $FlowFixMe[prop-missing]
        filteredWidgetInfo.graded = graded;
    }

    if (Widgets.supportsStaticMode(type)) {
        // $FlowFixMe[prop-missing]
        filteredWidgetInfo.static = widgetInfo?.static ?? undefined;
    }

    return filteredWidgetInfo;
};

// TODO(michaelpolyak): This type is very similar to `PerseusRenderer` type
// found in `perseus-all-package/perseus-type.js`, consider just using it.
type RendererProps = {|
    content: string,

    // NOTE: images and widgets may not be set for some items hints,
    // specifically in old revisions, which may only be loaded for diffing.
    widgets: ?PerseusRenderer["widgets"],
    images: ?PerseusRenderer["images"],
|};

type Props = {|
    // The "after" props of the renderer. Will be displayed on the right.
    after: RendererProps,

    // The "before" props of the renderer. Will be displayed on the left.
    before: RendererProps,

    // If true, show widget alignment options in the diff.
    showAlignmentOptions: boolean,

    // If true, render a horizontal rule after this diff.
    showSeparator: boolean,

    // The heading to render above the side by side diff.
    // (In a code review tool this would be the filename.)
    title: string,
|};

class RendererDiff extends React.Component<Props> {
    static defaultProps: $Rest<Props, {|title: string|}> = {
        after: {
            content: "",
            images: {},
            widgets: {},
        },
        before: {
            content: "",
            images: {},
            widgets: {},
        },
        showAlignmentOptions: false,
        showSeparator: false,
    };

    render(): React.Node {
        const {after, before, showAlignmentOptions, showSeparator, title} =
            this.props;

        let textDiff;
        let widgetsDiff;

        if (before.content || after.content) {
            textDiff = (
                <TextDiff
                    before={before.content}
                    after={after.content}
                    title={title}
                />
            );
        }

        const beforeWidgets = Object.keys(before.widgets ?? {}).filter(
            (widget) => before.content.includes(widget),
        );
        const afterWidgets = Object.keys(after.widgets ?? {}).filter((widget) =>
            after.content.includes(widget),
        );

        if (beforeWidgets.length || afterWidgets.length) {
            const widgets = _.union(beforeWidgets, afterWidgets);
            widgetsDiff = widgets.map((widget) => (
                <WidgetDiff
                    before={filterWidgetInfo(
                        before.widgets?.[widget],
                        showAlignmentOptions,
                    )}
                    after={filterWidgetInfo(
                        after.widgets?.[widget],
                        showAlignmentOptions,
                    )}
                    title={widget}
                    type={
                        (before.widgets?.[widget] ?? {}).type ||
                        (after.widgets?.[widget] ?? {}).type
                    }
                    key={widget}
                />
            ));
        }

        return (
            <div>
                {textDiff}
                {widgetsDiff}
                {showSeparator && <div className="diff-separator" />}
            </div>
        );
    }
}

export default RendererDiff;
