import * as React from "react";

import KeyConfigs from "../../../data/key-configs";
import {useMathInputI18n} from "../../i18n-context";
import {KeypadButton} from "../keypad-button";
import {getCursorContextConfig} from "../utils";

import type {ClickKeyCallback} from "../../../types";
import type {CursorContext} from "../../input/cursor-contexts";

type Props = {
    onClickKey: ClickKeyCallback;
    cursorContext?: (typeof CursorContext)[keyof typeof CursorContext];
};

export default function FractionsPage(props: Props) {
    const {onClickKey, cursorContext} = props;
    const {strings} = useMathInputI18n();
    const cursorKeyConfig = getCursorContextConfig(strings, cursorContext);
    // These keys are arranged sequentially so that tabbing follows numerical order. This
    // allows us to visually mimic a keypad without affecting a11y. The visual order of the
    // keys in the keypad is determined by their coordinates, not their order in the DOM.
    const Keys = KeyConfigs(strings);
    return (
        <>
            {/* Row 4 */}
            <KeypadButton
                keyConfig={Keys.NUM_1}
                onClickKey={onClickKey}
                coord={[0, 2]}
            />
            <KeypadButton
                keyConfig={Keys.NUM_2}
                onClickKey={onClickKey}
                coord={[1, 2]}
            />
            <KeypadButton
                keyConfig={Keys.NUM_3}
                onClickKey={onClickKey}
                coord={[2, 2]}
            />

            {/* Row 3 */}
            <KeypadButton
                keyConfig={Keys.NUM_4}
                onClickKey={onClickKey}
                coord={[0, 1]}
            />
            <KeypadButton
                keyConfig={Keys.NUM_5}
                onClickKey={onClickKey}
                coord={[1, 1]}
            />
            <KeypadButton
                keyConfig={Keys.NUM_6}
                onClickKey={onClickKey}
                coord={[2, 1]}
            />

            {/* Row 2 */}
            <KeypadButton
                keyConfig={Keys.NUM_7}
                onClickKey={onClickKey}
                coord={[0, 0]}
            />
            <KeypadButton
                keyConfig={Keys.NUM_8}
                onClickKey={onClickKey}
                coord={[1, 0]}
            />
            <KeypadButton
                keyConfig={Keys.NUM_9}
                onClickKey={onClickKey}
                coord={[2, 0]}
            />

            {/* Row 1 */}
            <KeypadButton
                keyConfig={Keys.NUM_0}
                onClickKey={onClickKey}
                coord={[0, 3]}
            />
            <KeypadButton
                keyConfig={Keys.DECIMAL}
                onClickKey={onClickKey}
                coord={[1, 3]}
            />
            <KeypadButton
                keyConfig={Keys.NEGATIVE}
                onClickKey={onClickKey}
                coord={[2, 3]}
            />
            {/* Side Column */}
            <KeypadButton
                keyConfig={Keys.PERCENT}
                onClickKey={onClickKey}
                coord={[3, 0]}
                secondary
            />
            <KeypadButton
                keyConfig={Keys.PI}
                onClickKey={onClickKey}
                coord={[3, 1]}
                secondary
            />
            <KeypadButton
                keyConfig={Keys.FRAC}
                onClickKey={onClickKey}
                coord={[3, 2]}
                secondary
            />
            {cursorKeyConfig && (
                <KeypadButton
                    keyConfig={cursorKeyConfig}
                    onClickKey={onClickKey}
                    coord={[3, 3]}
                    secondary
                />
            )}
            <KeypadButton
                keyConfig={Keys.BACKSPACE}
                onClickKey={onClickKey}
                coord={[4, 3]}
                secondary
            />
        </>
    );
}
