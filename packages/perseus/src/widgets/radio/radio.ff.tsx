import * as React from "react";

import RadioOld from "./radio-component";
import RadioNew from "./radio-component.new";

import type {RenderProps} from "./radio-component";
import type {WidgetProps} from "../../types";
import type {PerseusRadioRubric} from "@khanacademy/perseus-core";
import type {FocusFunction} from "./base-radio";

type Props = WidgetProps<RenderProps, PerseusRadioRubric>;

// CLEANUP: Remove this file when feature flag is no longer needed (https://khanacademy.atlassian.net/browse/LEMS-2994)
class Radio extends RadioOld {
    ffIsOn = false;

    constructor(props: Props) {
        super(props);
        // eslint-disable-next-line no-console
        // console.log(`Flags: `, props.apiOptions.flags);
        this.ffIsOn =
            props.apiOptions.flags?.["new-radio-widget"] ?? this.ffIsOn;
        // eslint-disable-next-line no-console
        // console.log(`ffIsOn: `, this.ffIsOn);
    }

    focus(choiceIndex?: number | null): boolean {
        console.log("Focus (radio.ff)");
        return super.focus(choiceIndex);
    }

    registerFocusFunction(fun: FocusFunction): void {
        console.log("Register Focus (radio.ff)");
        super.registerFocusFunction(fun);
    }

    render(): React.ReactNode {
        console.log("Render (radio.ff)");
        const RadioProper = this.ffIsOn ? RadioNew : RadioOld;
        return <RadioProper {...this.props} />;
    }
}

export default Radio;
