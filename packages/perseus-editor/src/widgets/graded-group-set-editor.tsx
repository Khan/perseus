/* eslint-disable react/forbid-prop-types, react/no-unsafe */
import {ApiOptions, Changeable} from "@khanacademy/perseus";
import {gradedGroupLogic} from "@khanacademy/perseus-core";
import PropTypes from "prop-types";
import * as React from "react";

import GradedGroupEditor from "./graded-group-editor";

type Props = any;

class GradedGroupSetEditor extends React.Component<Props> {
    // @ts-expect-error - TS2564 - Property '_editors' has no initializer and is not definitely assigned in the constructor.
    _editors: Array<any>;

    static propTypes = {
        ...Changeable.propTypes,
        apiOptions: ApiOptions.propTypes,
        gradedGroups: PropTypes.array,
        onChange: PropTypes.func.isRequired,
    };

    static widgetName = "graded-group-set" as const;

    // TODO(jangmi, CP-3288): Remove usage of `UNSAFE_componentWillMount`
    UNSAFE_componentWillMount() {
        this._editors = [];
    }

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    getSaveWarnings: () => ReadonlyArray<any> = () => {
        return [].concat(
            ...this._editors.map((editor) =>
                editor ? editor.getSaveWarnings() : [],
            ),
        );
    };

    serialize: () => {
        gradedGroups: any;
    } = () => {
        return {
            gradedGroups: this.props.gradedGroups,
        };
    };

    renderGroups: () => React.ReactElement = () => {
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
                    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
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
        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
        this.change(
            "gradedGroups",
            groups.concat([gradedGroupLogic.initializeWidgetOptions?.() || {}]),
        );
    };

    render(): React.ReactNode {
        return (
            <div className="perseus-group-editor">
                {this.renderGroups()}
                <button onClick={this.addGroup}>Add group</button>
            </div>
        );
    }
}

const setArrayItem = (list, i: any, value) => [
    ...list.slice(0, i),
    value,
    ...list.slice(i + 1),
];

export default GradedGroupSetEditor;
