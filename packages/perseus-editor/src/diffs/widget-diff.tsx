import * as React from "react";
import _ from "underscore";

import ImageWidgetDiff from "./image-widget-diff";
import DiffEntry from "./shared/diff-entry";
import performDiff from "./shared/widget-diff-performer";

import type {ImageWidget, PerseusWidget} from "@khanacademy/perseus-core";

type WidgetDiffProps = {
    after: PerseusWidget | undefined;
    before: PerseusWidget | undefined;
    title: string;
    type: PerseusWidget["type"] | undefined;
};

class WidgetDiff extends React.Component<WidgetDiffProps> {
    render(): React.ReactNode {
        const {after, before, title, type} = this.props;

        // If before or after is undefined, pass an empty object to performDiff.
        const diff = performDiff(before ? before : {}, after ? after : {});
        return (
            <>
                <div className="diff-header">{title}</div>
                <div className="diff-header">{title}</div>
                <div className="diff-body ui-helper-clearfix">
                    {type === "image" && (
                        <ImageWidgetDiff
                            before={before as ImageWidget | undefined}
                            after={after as ImageWidget | undefined}
                        />
                    )}
                    <DiffEntry entry={diff} />
                </div>
            </>
        );
    }
}

export default WidgetDiff;
