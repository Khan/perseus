/**
 * A side by side diff view for Perseus exercise items
 * in the standard layout.
 */

import {Dependencies, type PerseusDependenciesV2} from "@khanacademy/perseus";
import * as React from "react";
import _ from "underscore";

import {AnswerAreaDiff} from "./answer-area-diff";
import RendererDiff from "./renderer-diff";

import type {PerseusItem} from "@khanacademy/perseus-core";

interface Props {
    after: PerseusItem;
    before: PerseusItem;
    dependencies: PerseusDependenciesV2;
}

class ItemDiff extends React.Component<Props> {
    render(): React.ReactNode {
        const {before, after} = this.props;

        const hintCount = Math.max(before.hints.length, after.hints.length);

        const question = (
            <RendererDiff
                before={before.question}
                after={after.question}
                title="Question"
                showAlignmentOptions={false}
                showSeparator={true}
            />
        );

        let extras: React.ReactNode;
        // There might be a better way to do this, but for now I think it's fine to not
        // show the diff if the answer area is set in both before and after.
        if (before.answerArea && after.answerArea) {
            extras = (
                <AnswerAreaDiff
                    before={before.answerArea}
                    after={after.answerArea}
                    title="Question extras"
                />
            );
        }

        const hints = _.times(hintCount, function (n) {
            return (
                <RendererDiff
                    before={
                        n < before.hints.length ? before.hints[n] : undefined
                    }
                    after={n < after.hints.length ? after.hints[n] : undefined}
                    title={`Hint ${n + 1}`}
                    showAlignmentOptions={false}
                    showSeparator={n < hintCount - 1}
                    key={n}
                />
            );
        });

        return (
            <Dependencies.DependenciesContext.Provider
                value={this.props.dependencies}
            >
                <div className="framework-perseus">
                    {question}
                    {extras}
                    {hints.length > 0 && <div className="diff-separator" />}
                    {hints}
                </div>
            </Dependencies.DependenciesContext.Provider>
        );
    }
}

export default ItemDiff;
