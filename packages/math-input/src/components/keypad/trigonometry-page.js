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
type State = {};
export default class TrigonometryInputPage extends React.Component<
    Props,
    State,
> {
    render(): React.Node {
        const {onClickKey} = this.props;
        return (
            <KeypadPageContainer>
                {/* Row 1 */}
                <SecondaryKeypadButton
                    keyConfig={Keys.SIN}
                    onClickKey={onClickKey}
                />
                <SecondaryKeypadButton
                    keyConfig={Keys.COS}
                    onClickKey={onClickKey}
                />
                <SecondaryKeypadButton
                    keyConfig={Keys.TAN}
                    onClickKey={onClickKey}
                />

                <SecondaryKeypadButton
                    keyConfig={Keys.LEFT_PAREN}
                    onClickKey={onClickKey}
                    style={{
                        gridColumn: 5,
                    }}
                />
                <SecondaryKeypadButton
                    keyConfig={Keys.RIGHT_PAREN}
                    onClickKey={onClickKey}
                    style={{
                        gridColumn: 6,
                    }}
                />
                {/* Row 2 */}
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
                        gridColumn: "6",
                    }}
                    onClickKey={onClickKey}
                />
                {/* Row 4 */}
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
