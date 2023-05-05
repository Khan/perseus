import React from "react";

import Keys from "../../../data/key-configs";
import {SecondaryKeypadButton} from "../keypad-page-items";

type Props = {
    onClickKey: (keyConfig: string) => void;
};

export const PreAlgebra = ({onClickKey}: Props): React.ReactElement => (
    <React.Fragment>
        <SecondaryKeypadButton keyConfig={Keys.EXP_2} onClickKey={onClickKey} />
        <SecondaryKeypadButton keyConfig={Keys.EXP} onClickKey={onClickKey} />
        <SecondaryKeypadButton keyConfig={Keys.SQRT} onClickKey={onClickKey} />
        <SecondaryKeypadButton
            keyConfig={Keys.RADICAL}
            onClickKey={onClickKey}
        />
    </React.Fragment>
);
