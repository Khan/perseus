/* eslint-disable react/no-unsafe */
/**
 * A side by side diff view for Perseus articles.
 */

import {Dependencies, type PerseusDependenciesV2} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import RendererDiff from "./renderer-diff";

const rendererProps = PropTypes.shape({
    content: PropTypes.string,
    images: PropTypes.objectOf(PropTypes.any),
    widgets: PropTypes.objectOf(PropTypes.any),
});

interface Props {
    after: any;
    before: any;
    dependencies: PerseusDependenciesV2;
}

type State = any;

class ArticleDiff extends React.Component<Props, State> {
    static propTypes = {
        // TODO(alex): Check whether we still have any Perseus articles whose
        // top-level json is an object, not an array. If not, simplify here.
        after: PropTypes.oneOfType([
            rendererProps,
            PropTypes.arrayOf(rendererProps),
        ]).isRequired,
        before: PropTypes.oneOfType([
            rendererProps,
            PropTypes.arrayOf(rendererProps),
        ]).isRequired,
    };

    static _stateFromProps: (arg1: Props) => State = (props) => {
        const {before, after} = props;
        return {
            before: Array.isArray(before) ? before : [before],
            after: Array.isArray(after) ? after : [after],
        };
    };

    state: State = ArticleDiff._stateFromProps(this.props);

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
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
