/**
 * A side by side diff view for Perseus renderers.
 */

import {Widgets} from "@khanacademy/perseus";
import {CoreWidgetRegistry} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import TextDiff from "./text-diff";
import WidgetDiff from "./widget-diff";

import type {PerseusRenderer, PerseusWidget} from "@khanacademy/perseus-core";

// In diffs, only show the widgetInfo props that can change
const filterWidgetInfo = function (
    widgetInfo: PerseusWidget | undefined,
    showAlignmentOptions: boolean,
) {
    if (widgetInfo == null) {
        return undefined;
    }

    const {alignment, options, type} = widgetInfo;

    const filteredWidgetInfo = {options} as const;

    // Show alignment options iff multiple valid ones exist for this widget
    if (
        showAlignmentOptions &&
        CoreWidgetRegistry.getSupportedAlignments(type).length > 1
    ) {
        // @ts-expect-error - TS2339 - Property 'alignment' does not exist on type '{ readonly options: any; }'.
        filteredWidgetInfo.alignment = alignment;
    }

    if (Widgets.supportsStaticMode(type)) {
        // @ts-expect-error - TS2339 - Property 'static' does not exist on type '{ readonly options: any; }'.
        filteredWidgetInfo.static = widgetInfo?.static ?? undefined;
    }

    return filteredWidgetInfo;
};

type Props = {
    // The "after" props of the renderer. Will be displayed on the right.
    after: PerseusRenderer | undefined;
    // The "before" props of the renderer. Will be displayed on the left.
    before: PerseusRenderer | undefined;
    // If true, show widget alignment options in the diff.
    showAlignmentOptions: boolean;
    // If true, render a horizontal rule after this diff.
    showSeparator: boolean;
    // The heading to render above the side by side diff.
    // (In a code review tool this would be the filename.)
    title: string;
};

class RendererDiff extends React.Component<Props> {
    static defaultProps: Partial<Omit<Props, "title">> = {
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

    render(): React.ReactNode {
        const {after, before, showAlignmentOptions, showSeparator, title} =
            this.props;

        let textDiff: React.JSX.Element | undefined;
        let widgetsDiff: React.JSX.Element[] = [];

        if (before?.content || after?.content) {
            textDiff = (
                <TextDiff
                    before={before?.content}
                    after={after?.content}
                    title={title}
                />
            );
        }

        const beforeWidgets: string[] = Object.keys(
            before?.widgets ?? {},
        ).filter((widget) => before?.content.includes(widget));
        const afterWidgets: string[] = Object.keys(after?.widgets ?? {}).filter(
            (widget) => after?.content.includes(widget),
        );

        if (beforeWidgets.length > 0 || afterWidgets.length > 0) {
            const widgets = _.union(beforeWidgets, afterWidgets);
            widgetsDiff = widgets.map((widget) => (
                <WidgetDiff
                    before={
                        filterWidgetInfo(
                            before?.widgets?.[widget],
                            showAlignmentOptions,
                        ) as PerseusWidget
                    }
                    after={
                        filterWidgetInfo(
                            after?.widgets?.[widget],
                            showAlignmentOptions,
                        ) as PerseusWidget,
                    }
                    title={widget}
                    type={
                        (before?.widgets?.[widget] ?? {}).type ||
                        (after?.widgets?.[widget] ?? {}).type
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
