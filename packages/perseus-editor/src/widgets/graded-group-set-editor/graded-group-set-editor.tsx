import {gradedGroupSetLogic} from "@khanacademy/perseus-core";
import * as React from "react";

import {deprecatedChangeableChange} from "../../mixins/changeable";
import GradedGroupEditor from "../graded-group-editor";

import type {ChangeableProps} from "../../mixins/changeable";
import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {GradedGroupSetDefaultWidgetOptions} from "@khanacademy/perseus-core";

interface Props extends GradedGroupSetDefaultWidgetOptions, ChangeableProps {
    apiOptions?: APIOptionsWithDefaults;
}

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
        return deprecatedChangeableChange.apply(this, args);
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
        // `defaultProps` only fills in for `undefined`, so content with an
        // explicit `gradedGroups: null` still reaches us as null.
        const gradedGroups = this.props.gradedGroups ?? [];
        return gradedGroups.map((group, i) => (
            <GradedGroupEditor
                key={i}
                ref={(el) => (this._editors[i] = el)}
                {...group}
                apiOptions={this.props.apiOptions}
                onChange={(data) =>
                    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
                    this.change(
                        "gradedGroups",
                        setArrayItem(gradedGroups, i, {
                            ...gradedGroups[i],
                            ...data,
                        }),
                    )
                }
            />
        ));
    };

    addGroup: () => void = () => {
        const groups = this.props.gradedGroups ?? [];
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
