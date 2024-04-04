import * as React from "react";

import KeyConfigs from "../../../data/key-configs";
import {useI18n} from "../../i18n-context";
import {KeypadButton} from "../keypad-button";

import type Key from "../../../data/keys";
import type {ClickKeyCallback} from "../../../types";

type Props = {
    extraKeys: ReadonlyArray<Key>;
    onClickKey: ClickKeyCallback;
};

const columns = 3;

export default function ExtrasPage(props: Props) {
    const {extraKeys, onClickKey} = props;
    const {strings} = useI18n();
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
