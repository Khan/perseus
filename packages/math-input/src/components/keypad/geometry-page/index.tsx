import * as React from "react";

import Keys from "../../../data/key-configs";
import {ClickKeyCallback} from "../../../types";
import {
    KeypadPageContainer,
    SecondaryKeypadButton,
    KeypadActionButton,
} from "../keypad-page-items";

type Props = {
    onClickKey: ClickKeyCallback;
};

export default class GeometryPage extends React.Component<Props> {
    render(): React.ReactNode {
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
                    keyConfig={Keys.x}
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
