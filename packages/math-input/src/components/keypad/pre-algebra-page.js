// @flow
import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";

import Keys from "../../data/key-configs";
import {
    KeypadPageContainer,
    KeypadButton,
    SecondaryKeypadButton,
    KeypadActionButton,
    PlaceHolderButton,
} from "./keypad-page-items";

import type {KeyConfig} from "../../data/key-configs";

type Props = {|
    onClickKey: (keyConfig: string) => void,
|};
export default class NumericInputPage extends React.Component<Props> {
    render(): React.Node {
        const {onClickKey} = this.props;
        return (
            <KeypadPageContainer>
                {/* Row 1 */}
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

                <SecondaryKeypadButton
                    keyConfig={Keys.LEFT_PAREN}
                    onClickKey={onClickKey}
                />
                <SecondaryKeypadButton
                    keyConfig={Keys.RIGHT_PAREN}
                    onClickKey={onClickKey}
                />
                {/* Row 2 */}
                <PlaceHolderButton />
                <PlaceHolderButton />
                <PlaceHolderButton />
                <SecondaryKeypadButton
                    keyConfig={Keys.X}
                    onClickKey={onClickKey}
                    style={{
                        gridColumn: 5,
                    }}
                />
                <SecondaryKeypadButton
                    keyConfig={Keys.FRAC_INCLUSIVE}
                    onClickKey={onClickKey}
                    style={{
                        gridColumn: 6,
                    }}
                />
                {/* Row 3 */}
                <PlaceHolderButton />
                <PlaceHolderButton />
                <PlaceHolderButton />
                <SecondaryKeypadButton
                    keyConfig={Keys.PI}
                    onClickKey={onClickKey}
                    style={{
                        gridColumn: 5,
                    }}
                />
                <KeypadActionButton
                    keyConfig={Keys.BACKSPACE}
                    style={{
                        gridColumn: 6,
                    }}
                    onClickKey={onClickKey}
                />
                {/* Row 4 */}
                <PlaceHolderButton />
                <PlaceHolderButton />
                <PlaceHolderButton />
                <KeypadActionButton
                    keyConfig={Keys.DISMISS}
                    style={{
                        gridColumn: "6",
                    }}
                    onClickKey={onClickKey}
                />
            </KeypadPageContainer>
        );
    }
}
