import {Changeable, EditorJsonify} from "@khanacademy/perseus";
import {
    passageRefTargetLogic,
    type PassageRefTargetDefaultWidgetOptions,
} from "@khanacademy/perseus-core";
import PropTypes from "prop-types";
import * as React from "react";

type Props = any;

class PassageRefTargetEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        content: PropTypes.string,
    };

    static widgetName = "passage-ref-target" as const;

    static defaultProps: PassageRefTargetDefaultWidgetOptions =
        passageRefTargetLogic.defaultWidgetOptions;

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    handleContentChange: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (
        e,
    ) => {
        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
        this.change({content: e.target.value});
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        return (
            <div>
                Content:
                <input
                    type="text"
                    value={this.props.content}
                    onChange={this.handleContentChange}
                />
            </div>
        );
    }
}

export default PassageRefTargetEditor;
