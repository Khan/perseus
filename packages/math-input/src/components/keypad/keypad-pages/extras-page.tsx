import * as React from "react";

import Keys from "../../../data/key-configs";
import {KeypadButton} from "../keypad-button";

import type Key from "../../../data/keys";
import type {MathInputStrings, ClickKeyCallback} from "../../../types";

type Props = {
    extraKeys: ReadonlyArray<Key>;
    onClickKey: ClickKeyCallback;
    strings: MathInputStrings;
    locale: string;
};

const columns = 3;

export default function ExtrasPage(props: Props) {
    const {extraKeys, onClickKey, strings, locale} = props;
    return (
        <>
            {extraKeys.map((key, i) => {
                // Map 1D array to Cartesian coordinates
                const coordX = i % columns;
                const coordY = i / columns;
                return (
                    <KeypadButton
                        key={key}
                        locale={locale}
                        keyConfig={Keys(strings)[key]}
                        onClickKey={onClickKey}
                        coord={[coordX, coordY]}
                    />
                );
            })}
        </>
    );
}
