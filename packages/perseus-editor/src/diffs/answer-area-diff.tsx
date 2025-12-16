import * as React from "react";
import _ from "underscore";

import DiffEntry from "./shared/diff-entry";
import performDiff from "./shared/widget-diff-performer";

import type {PerseusAnswerArea} from "@khanacademy/perseus-core";

type AnswerAreaDiffProps = {
    after?: PerseusAnswerArea;
    before?: PerseusAnswerArea;
    title: string;
};

export class AnswerAreaDiff extends React.Component<AnswerAreaDiffProps> {
    render(): React.ReactNode {
        const {after, before, title} = this.props;

        // If before or after is undefined, performDiff will return an empty object.
        const diff = performDiff(before ?? {}, after ?? {});
        return (
            <>
                <div className="diff-header">{title}</div>
                <div className="diff-header">{title}</div>
                <div className="diff-body ui-helper-clearfix">
                    <DiffEntry entry={diff} />
                </div>
            </>
        );
    }
}
