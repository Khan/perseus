/* eslint-disable no-useless-escape */
/**
 * This editor is for embedding Khan Academy Python programs.
 */

import {
    components,
    Changeable,
    EditorJsonify,
} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import BlurInput from "../components/blur-input";

const {NumberInput} = components;

const DEFAULT_HEIGHT = 400;

type Props = any;

/**
 * This is the main editor for this widget, to specify all the options.
 */
class PythonProgramEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        programID: PropTypes.number,
        height: PropTypes.number,
    };

    static widgetName = "python-program" as const;

    static defaultProps: any = {
        programID: null,
        height: DEFAULT_HEIGHT,
    };

    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

    _handleHeightChange: (arg1: string) => void = (height) => {
        this.change({height});
    };

    _handleProgramIDChange: (arg1: string) => void = (programID) => {
        this.change({programID});
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        return (
            <div>
                <label>
                    User Program ID:{" "}
                    <NumberInput
                        value={this.props.programID}
                        //onChange={this._handleProgramIDChange}
                        onChange={this.change("programID")}
                        placeholder="123"
                    />
                </label>
                <br />
                <label>
                    Height:{" "}
                    <NumberInput
                        value={this.props.height}
                        // onChange={this._handleHeightChange}
                        onChange={this.change("height")}
                        placeholder="400"
                    />
                </label>
            </div>
        );
    }
}

export default PythonProgramEditor;
