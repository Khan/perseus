import * as React from "react";

import Keys from "../../../data/key-configs";
import {ClickKeyCallback} from "../../../types";
import {
    KeypadPageContainer,
    KeypadButton,
    SecondaryKeypadButton,
    KeypadActionButton,
} from "../keypad-page-items";

import {NumbersPageOptions} from "./types";

type Props = {
    onClickKey: ClickKeyCallback;
} & NumbersPageOptions;

export default class NumbersPage extends React.Component<Props> {
    render(): React.ReactNode {
        const {onClickKey} = this.props;
        return (
            <KeypadPageContainer>
                {/* Row 1 */}
                <KeypadButton keyConfig={Keys.NUM_7} onClickKey={onClickKey} />
                <KeypadButton keyConfig={Keys.NUM_8} onClickKey={onClickKey} />
                <KeypadButton keyConfig={Keys.NUM_9} onClickKey={onClickKey} />
                <SecondaryKeypadButton
                    keyConfig={Keys.DIVIDE}
                    style={
                        this.props.divisionKey
                            ? {
                                  gridColumn: "4",
                                  gridRow: "1",
                              }
                            : {
                                  display: "none",
                              }
                    }
                    onClickKey={onClickKey}
                />
                <SecondaryKeypadButton
                    keyConfig={
                        this.props.multiplicationDot ? Keys.CDOT : Keys.TIMES
                    }
                    style={
                        this.props.divisionKey && {
                            gridColumn: "4",
                            gridRow: "2",
                        }
                    }
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
                <KeypadButton keyConfig={Keys.NUM_4} onClickKey={onClickKey} />
                <KeypadButton keyConfig={Keys.NUM_5} onClickKey={onClickKey} />
                <KeypadButton keyConfig={Keys.NUM_6} onClickKey={onClickKey} />

                <SecondaryKeypadButton
                    keyConfig={Keys.MINUS}
                    style={
                        this.props.divisionKey && {
                            gridColumn: "4",
                            gridRow: "3",
                        }
                    }
                    onClickKey={onClickKey}
                />

                <SecondaryKeypadButton
                    keyConfig={Keys.FRAC_INCLUSIVE}
                    onClickKey={onClickKey}
                    style={{
                        gridColumn: "5 / 7",
                    }}
                />
                {/* Row 3 */}
                <KeypadButton keyConfig={Keys.NUM_1} onClickKey={onClickKey} />
                <KeypadButton keyConfig={Keys.NUM_2} onClickKey={onClickKey} />
                <KeypadButton keyConfig={Keys.NUM_3} onClickKey={onClickKey} />

                <SecondaryKeypadButton
                    keyConfig={Keys.PLUS}
                    style={
                        this.props.divisionKey
                            ? {
                                  gridColumn: "4",
                                  gridRow: "4",
                              }
                            : {
                                  gridColumn: "4",
                                  gridRowStart: "3",
                                  gridRowEnd: "5",
                              }
                    }
                    onClickKey={onClickKey}
                />

                <KeypadActionButton
                    keyConfig={Keys.BACKSPACE}
                    style={{
                        gridColumn: "6",
                    }}
                    onClickKey={onClickKey}
                />

                {/* Row 4 */}
                <KeypadButton keyConfig={Keys.NUM_0} onClickKey={onClickKey} />
                <KeypadButton
                    keyConfig={Keys.DECIMAL}
                    onClickKey={onClickKey}
                />
                <KeypadButton
                    keyConfig={Keys.NEGATIVE}
                    onClickKey={onClickKey}
                />

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
