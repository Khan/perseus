import * as React from "react";

import RadioOld from "./radio-component";
import RadioNew from "./radio-component.new";

import type {PerseusRadioRubric} from "@khanacademy/perseus-core";
import type {RenderProps} from "./radio-component";
import type {WidgetProps} from "../../types";

type Props = WidgetProps<RenderProps, PerseusRadioRubric>;

// CLEANUP: Remove this file when feature flag is no longer needed (https://khanacademy.atlassian.net/browse/LEMS-2994)
class Radio extends RadioOld {
    ffIsOn = false;

    constructor(props: Props) {
        super(props);
        this.ffIsOn = props.apiOptions.flags?.["new-radio-widget"] ?? this.ffIsOn;
    }

    render(): React.ReactNode {
        const RadioProper = this.ffIsOn ? RadioNew : RadioOld;
        return <RadioProper {...this.props} />;
    }
}

export default Radio