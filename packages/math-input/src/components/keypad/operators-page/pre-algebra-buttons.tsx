import React from "react";

import Keys from "../../../data/key-configs";
import {PlaceHolderButtons, SecondaryKeypadButton} from "../keypad-page-items";

type Props = {
    onClickKey: (keyConfig: string) => void;
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
