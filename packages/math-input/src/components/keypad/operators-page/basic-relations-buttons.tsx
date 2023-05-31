import React from "react";

import Keys from "../../../data/key-configs";
import {ClickKeyCallback} from "../../../types";
import {PlaceHolderButtons, SecondaryKeypadButton} from "../keypad-page-items";

type Props = {
    onClickKey: ClickKeyCallback;
    placeholder?: boolean;
};

export const BasicRelations = ({
    onClickKey,
    placeholder,
}: Props): React.ReactElement =>
    placeholder ? (
        <PlaceHolderButtons count={3} />
    ) : (
        <React.Fragment>
            <SecondaryKeypadButton
                keyConfig={Keys.EQUAL}
                onClickKey={onClickKey}
            />
            <SecondaryKeypadButton
                keyConfig={Keys.LT}
                onClickKey={onClickKey}
            />
            <SecondaryKeypadButton
                keyConfig={Keys.GT}
                onClickKey={onClickKey}
            />
        </React.Fragment>
    );
