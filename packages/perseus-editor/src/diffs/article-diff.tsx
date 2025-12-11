/* eslint-disable react/no-unsafe */
/**
 * A side by side diff view for Perseus articles.
 */

import {Dependencies, type PerseusDependenciesV2} from "@khanacademy/perseus";
import * as React from "react";
import _ from "underscore";

import RendererDiff from "./renderer-diff";

import type {PerseusArticle, PerseusRenderer} from "@khanacademy/perseus-core";

type ArticleDiffProps = {
    after: PerseusArticle;
    before: PerseusArticle;
    dependencies: PerseusDependenciesV2;
};

type ArticleDiffState = {
    // Externally we allow both arrays and single PerseusRenderer objects.
    // Internally we convert to arrays.
    before: PerseusRenderer[];
    after: PerseusRenderer[];
};

class ArticleDiff extends React.Component<ArticleDiffProps, ArticleDiffState> {
    static _stateFromProps: (arg1: ArticleDiffProps) => ArticleDiffState = (
        props,
    ) => {
        const {before, after} = props;
        return {
            before: Array.isArray(before) ? before : [before],
            after: Array.isArray(after) ? after : [after],
        };
    };

    state: ArticleDiffState = ArticleDiff._stateFromProps(this.props);

    UNSAFE_componentWillReceiveProps(nextProps: ArticleDiffProps) {
        this.setState(ArticleDiff._stateFromProps(nextProps));
    }

    render(): React.ReactNode {
        const {before, after} = this.state;

        const sectionCount = Math.max(before.length, after.length);

        const sections = _.times(sectionCount, (n) => (
            <RendererDiff
                before={n < before.length ? before[n] : undefined}
                after={n < after.length ? after[n] : undefined}
                title={`Section ${n + 1}`}
                showAlignmentOptions={true}
                showSeparator={n < sectionCount - 1}
                key={n}
            />
        ));

        return (
            <Dependencies.DependenciesContext.Provider
                value={this.props.dependencies}
            >
                <div className="framework-perseus">{sections}</div>
            </Dependencies.DependenciesContext.Provider>
        );
    }
}

export default ArticleDiff;
