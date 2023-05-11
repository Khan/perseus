import React from "react";

import Keys from "../../../data/key-configs";
import {PlaceHolderButtons, SecondaryKeypadButton} from "../keypad-page-items";

type Props = {
    onClickKey: (keyConfig: string) => void;
    placeholder?: boolean;
};

export const AdvancedRelations = ({
    onClickKey,
    placeholder,
}: Props): React.ReactElement =>
    placeholder ? (
        <PlaceHolderButtons count={3} />
    ) : (
        <React.Fragment>
            <SecondaryKeypadButton
                keyConfig={Keys.NEQ}
                onClickKey={onClickKey}
            />
            <SecondaryKeypadButton
                keyConfig={Keys.LEQ}
                onClickKey={onClickKey}
            />
            <SecondaryKeypadButton
                keyConfig={Keys.GEQ}
                onClickKey={onClickKey}
            />
        </React.Fragment>
    );
