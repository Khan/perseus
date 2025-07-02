import * as React from "react";

import RadioOld from "./radio-component";
import RadioNew from "./radio.class.new";

import type {RenderProps} from "./radio-component";
import type {ChoiceState, WidgetProps} from "../../types";
import type {
    PerseusRadioRubric,
    PerseusRadioUserInput,
} from "@khanacademy/perseus-core";

type Props = WidgetProps<
    RenderProps,
    PerseusRadioUserInput,
    PerseusRadioRubric
>;

type State = {
    choiceStates: ChoiceState[] | undefined;
};

/**
 * This is a wrapper around the old radio widget that allows us to
 * conditionally render the new radio widget when the feature flag is on.
 *
 * This is necessary to ensure that we do not interrupt the assessment studies
 * that are currently running.
 *
 * TODO(LEMS-2994): Clean up this file.
 */
// class Radio extends RadioOld
class Radio extends RadioOld {
    ffIsOn = false;
    radioRef = React.createRef<RadioOld>();

    state: State = {
        choiceStates: undefined,
    };

    constructor(props: Props) {
        super(props);
        this.ffIsOn = props.apiOptions.flags?.["new-radio-widget"] ?? false;
    }

    _handleChange(arg: Partial<State>) {
        this.props.onChange(arg);
        if (arg.choiceStates) {
            this.setState({choiceStates: arg.choiceStates}, () => {
                const props = this._mergePropsAndState();
                const unshuffledUserInput =
                    RadioNew.getUserInputFromProps(props);
                this.props.handleUserInput(unshuffledUserInput);
            });
        } else {
            throw new Error("unhandled onChange call in Radio!");
        }
    }

    _mergePropsAndState() {
        return {
            ...this.props,
            choiceStates: this.state.choiceStates,
            onChange: (arg: any) => this._handleChange(arg),
        };
    }

    // This is a legacy method that we need to support for the old radio widget.
    // It is not present in the new radio widget.
    focus(choiceIndex?: number | null): boolean {
        if (this.radioRef.current?.focus) {
            return this.radioRef.current.focus(choiceIndex);
        }
        return false;
    }

    render(): React.ReactNode {
        const props = this._mergePropsAndState();

        // Only return the new radio widget if the feature flag is on.
        // Otherwise, return the old radio widget and pass the ref to
        // it for handling legacy focus methods.
        return this.ffIsOn ? (
            <RadioNew {...props} />
        ) : (
            <RadioOld ref={this.radioRef} {...props} />
        );
    }
}

export default Radio;
