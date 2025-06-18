import * as React from "react";

import RadioOld from "./radio-component";
import RadioNew from "./radio.class.new";

import type {RenderProps} from "./radio-component";
import type {WidgetProps} from "../../types";
import type {
    PerseusRadioRubric,
    PerseusRadioUserInput,
} from "@khanacademy/perseus-core";

type Props = WidgetProps<
    RenderProps,
    PerseusRadioUserInput,
    PerseusRadioRubric
>;

/**
 * This is a wrapper around the old radio widget that allows us to
 * conditionally render the new radio widget when the feature flag is on.
 *
 * This is necessary to ensure that we do not interrupt the assessment studies
 * that are currently running.
 *
 * TODO(LEMS-2994): Clean up this file.
 */
class Radio extends RadioOld {
    ffIsOn = false;
    radioRef = React.createRef<RadioOld>();

    constructor(props: Props) {
        super(props);
        this.ffIsOn = props.apiOptions.flags?.["new-radio-widget"] ?? false;
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
        // Only return the new radio widget if the feature flag is on.
        // Otherwise, return the old radio widget and pass the ref to
        // it for handling legacy focus methods.
        return this.ffIsOn ? (
            <RadioNew {...this.props} />
        ) : (
            <RadioOld ref={this.radioRef} {...this.props} />
        );
    }
}

export default Radio;
