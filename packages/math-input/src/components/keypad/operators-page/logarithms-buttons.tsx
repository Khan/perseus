import React from "react";

import Keys from "../../../data/key-configs";
import {ClickKeyCallback} from "../../../types";
import {PlaceHolderButtons, SecondaryKeypadButton} from "../keypad-page-items";

type Props = {
    onClickKey: ClickKeyCallback;
    placeholder?: boolean;
};

export const Logarithms = ({
    onClickKey,
    placeholder,
}: Props): React.ReactElement =>
    placeholder ? (
        <PlaceHolderButtons count={3} />
    ) : (
        <React.Fragment>
            <SecondaryKeypadButton
                keyConfig={Keys.LOG}
                onClickKey={onClickKey}
            />
            <SecondaryKeypadButton
                keyConfig={Keys.LOG_N}
                onClickKey={onClickKey}
            />
            <SecondaryKeypadButton
                keyConfig={Keys.LN}
                onClickKey={onClickKey}
            />
        </React.Fragment>
    );
