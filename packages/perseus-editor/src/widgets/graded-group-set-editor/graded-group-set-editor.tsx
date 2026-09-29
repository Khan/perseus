import {gradedGroupSetLogic} from "@khanacademy/perseus-core";
import * as React from "react";

import GradedGroupEditor from "../graded-group-editor";

import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {PerseusGradedGroupSetWidgetOptions} from "@khanacademy/perseus-core";

interface Props extends PerseusGradedGroupSetWidgetOptions {
    apiOptions?: APIOptionsWithDefaults;
    onChange: (options: PerseusGradedGroupSetWidgetOptions) => void;
}

class GradedGroupSetEditor extends React.Component<Props> {
    _editors: Array<GradedGroupEditor | null> = [];

    static defaultProps: PerseusGradedGroupSetWidgetOptions =
        gradedGroupSetLogic.defaultWidgetOptions;

    getSaveWarnings: () => ReadonlyArray<any> = () => {
        return [].concat(
            ...this._editors.map((editor) =>
                editor ? editor.getSaveWarnings() : [],
            ),
        );
    };

    serialize = () => {
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
                    this.props.onChange({
                        gradedGroups: setArrayItem(gradedGroups, i, data),
                    })
                }
            />
        ));
    };

    addGroup = () => {
        const newGroup = GradedGroupEditor.defaultProps;
        this.props.onChange({
            gradedGroups: this.props.gradedGroups.concat([newGroup]),
        });
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

// TODO(benchristel): Replace usages of this function with Array#with(), once
//  that's available in our supported browsers.
const setArrayItem = (list, i: any, value) => [
    ...list.slice(0, i),
    value,
    ...list.slice(i + 1),
];

export default GradedGroupSetEditor;
