import React from "react";

import Keys from "../../../data/key-configs";
import {ClickKeyCallback} from "../../../types";
import {PlaceHolderButtons, SecondaryKeypadButton} from "../keypad-page-items";

type Props = {
    onClickKey: ClickKeyCallback;
    placeholder?: boolean;
};

export const PreAlgebra = ({
    onClickKey,
    placeholder,
}: Props): React.ReactElement =>
    placeholder ? (
        <PlaceHolderButtons count={4} />
    ) : (
        <React.Fragment>
            <SecondaryKeypadButton
                keyConfig={Keys.EXP_2}
                onClickKey={onClickKey}
            />
            <SecondaryKeypadButton
                keyConfig={Keys.EXP}
                onClickKey={onClickKey}
            />
            <SecondaryKeypadButton
                keyConfig={Keys.SQRT}
                onClickKey={onClickKey}
            />
            <SecondaryKeypadButton
                keyConfig={Keys.RADICAL}
                onClickKey={onClickKey}
            />
        </React.Fragment>
    );
