import * as React from "react";

import Keys from "../../../data/key-configs";
import Key from "../../../data/keys";
import {KeypadButton} from "../keypad-button";

type Props = {
    extraKeys: ReadonlyArray<Key>;
    onClickKey: (keyConfig: string) => void;
};

const columns = 4;

export default function ExtrasPage(props: Props) {
    const {extraKeys, onClickKey} = props;
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
