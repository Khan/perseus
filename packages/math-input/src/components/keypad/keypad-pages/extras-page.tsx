import * as React from "react";

import KeyConfigs from "../../../data/key-configs";
import {useMathInputI18n} from "../../i18n-context";
import {KeypadButton} from "../keypad-button";

import type {ClickKeyCallback} from "../../../types";
import type {KeypadKey} from "@khanacademy/perseus-core";

type Props = {
    extraKeys: ReadonlyArray<KeypadKey>;
    onClickKey: ClickKeyCallback;
};

const columns = 3;

export default function ExtrasPage(props: Props) {
    const {extraKeys, onClickKey} = props;
    const {strings} = useMathInputI18n();
    const Keys = KeyConfigs(strings);
    return (
        <>
            {extraKeys.map((key, i) => {
                // Map 1D array to Cartesian coordinates
                const coordX = i % columns;
                const coordY = i / columns;
                return (
                    <KeypadButton
                        key={key}
                        keyConfig={Keys[key]}
                        onClickKey={onClickKey}
                        coord={[coordX, coordY]}
                    />
                );
            })}
        </>
    );
}
