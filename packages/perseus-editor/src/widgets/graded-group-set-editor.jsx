/* eslint-disable react/forbid-prop-types, react/no-unsafe */
// @flow
import {ApiOptions, Changeable} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import GradedGroupEditor from "./graded-group-editor.jsx";

type Props = $FlowFixMe;

class GradedGroupSetEditor extends React.Component<Props> {
    // eslint-disable-next-line ft-flow/no-mutable-array
    _editors: Array<$FlowFixMe>;

    static propTypes = {
        ...Changeable.propTypes,
        apiOptions: ApiOptions.propTypes,
        gradedGroups: PropTypes.array,
        onChange: PropTypes.func.isRequired,
    };

    static widgetName: "graded-group-set" = "graded-group-set";

    static defaultProps: Props = {
        gradedGroups: [],
    };

    // TODO(jangmi, CP-3288): Remove usage of `UNSAFE_componentWillMount`
    UNSAFE_componentWillMount() {
        this._editors = [];
    }

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    getSaveWarnings: () => $ReadOnlyArray<$FlowFixMe> = () => {
        return [].concat(
            ...this._editors.map((editor) =>
                editor ? editor.getSaveWarnings() : [],
            ),
        );
    };

    serialize: () => {|gradedGroups: $FlowFixMe|} = () => {
        return {
            gradedGroups: this.props.gradedGroups,
        };
    };

    renderGroups: () => React.Node = () => {
        if (!this.props.gradedGroups) {
            return null;
        }
        return this.props.gradedGroups.map((group, i) => (
            <GradedGroupEditor
                key={i}
                ref={(el) => (this._editors[i] = el)}
                {...group}
                apiOptions={this.props.apiOptions}
                widgetEnabled={true}
                immutableWidgets={false}
                onChange={(data) =>
                    this.change(
                        "gradedGroups",
                        setArrayItem(this.props.gradedGroups, i, {
                            ...this.props.gradedGroups[i],
                            ...data,
                        }),
                    )
                }
            />
        ));
    };

    addGroup: () => void = () => {
        const groups = this.props.gradedGroups || [];
        this.change(
            "gradedGroups",
            groups.concat([GradedGroupEditor.defaultProps]),
        );
    };

    render(): React.Node {
        return (
            <div className="perseus-group-editor">
                {this.renderGroups()}
                <button onClick={this.addGroup}>Add group</button>
            </div>
        );
    }
}

const setArrayItem = (list, i, value) => [
    ...list.slice(0, i),
    value,
    ...list.slice(i + 1),
];

export default GradedGroupSetEditor;
