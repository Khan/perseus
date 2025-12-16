import * as React from "react";
import _ from "underscore";

import DiffEntry from "./shared/diff-entry";
import performDiff from "./shared/widget-diff-performer";

import type {PerseusAnswerArea} from "@khanacademy/perseus-core";

type AnswerAreaDiffProps = {
    after: PerseusAnswerArea | undefined;
    before: PerseusAnswerArea | undefined;
    title: string;
};

export class AnswerAreaDiff extends React.Component<AnswerAreaDiffProps> {
    render(): React.ReactNode {
        const {after, before, title} = this.props;

        // If before or after is undefined, pass an empty object to performDiff.
        const diff = performDiff(before ? before : {}, after ? after : {});
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
