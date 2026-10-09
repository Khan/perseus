/**
 * A side by side diff view for Perseus renderers.
 */

import * as React from "react";

import {filterWidgetInfo, getDiffedWidgetIds} from "./shared/diffed-widgets";
import TextDiff from "./text-diff";
import WidgetDiff from "./widget-diff";

import type {PerseusRenderer, PerseusWidget} from "@khanacademy/perseus-core";

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

        const widgets = getDiffedWidgetIds(before, after);

        if (widgets.length > 0) {
            widgetsDiff = widgets.map((widget) => (
                <WidgetDiff
                    before={
                        // eslint-disable-next-line no-restricted-syntax
                        filterWidgetInfo(
                            before?.widgets?.[widget],
                            showAlignmentOptions,
                        ) as PerseusWidget
                    }
                    after={
                        // eslint-disable-next-line no-restricted-syntax
                        filterWidgetInfo(
                            after?.widgets?.[widget],
                            showAlignmentOptions,
                        ) as PerseusWidget
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
