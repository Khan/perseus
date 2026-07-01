/* eslint-disable react/no-unsafe */
import {Changeable} from "@khanacademy/perseus";
import {gradedGroupSetLogic} from "@khanacademy/perseus-core";
import * as React from "react";

import GradedGroupEditor from "./graded-group-editor";

import type {GradedGroupSetDefaultWidgetOptions} from "@khanacademy/perseus-core";

type Props = {
    onChange: (...args: ReadonlyArray<any>) => any;
    apiOptions?: any;
    gradedGroups?: ReadonlyArray<any>;
};

class GradedGroupSetEditor extends React.Component<Props> {
    // @ts-expect-error - TS2564 - Property '_editors' has no initializer and is not definitely assigned in the constructor.
    _editors: Array<any>;

    static widgetName = "graded-group-set" as const;

    static defaultProps: GradedGroupSetDefaultWidgetOptions =
        gradedGroupSetLogic.defaultWidgetOptions;

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

    renderGroups: () => React.ReactNode = () => {
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
                        setArrayItem(this.props.gradedGroups!, i, {
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            ...this.props.gradedGroups![i],
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
            groups.concat([GradedGroupEditor.defaultProps]),
        );
    };

    render(): React.ReactNode {
        const editingDisabled = this.props.apiOptions?.editingDisabled ?? false;
        return (
            <div className="perseus-group-editor">
                {this.renderGroups()}
                <button onClick={this.addGroup} disabled={editingDisabled}>
                    Add group
                </button>
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
