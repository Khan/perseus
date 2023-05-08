import * as React from "react";

import Keys from "../../../data/key-configs";
import {
    KeypadPageContainer,
    SecondaryKeypadButton,
    KeypadActionButton,
    PlaceHolderButtons,
} from "../keypad-page-items";

import {BasicRelations} from "./basic-relations-buttons";
import {PreAlgebra} from "./pre-algebra-buttons";
import {OperatorsButtonSets} from "./types";

type Props = {
    onClickKey: (keyConfig: string) => void;
} & OperatorsButtonSets;

export default class OperatorsPage extends React.Component<Props> {
    render(): React.ReactNode {
        const {onClickKey} = this.props;
        return (
            <KeypadPageContainer>
                {/* Row 1 */}
                <PreAlgebra
                    onClickKey={onClickKey}
                    placeholder={!this.props.preAlgebra}
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
                {/* TODO: implement logarithms buttons */}
                {this.props.logarithms ? (
                    <PlaceHolderButtons count={3} />
                ) : (
                    <PlaceHolderButtons count={3} />
                )}
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
                {/* TODO: implement relatons buttons */}
                <BasicRelations
                    onClickKey={onClickKey}
                    placeholder={!this.props.basicRelations}
                />
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
                {/* TODO: implement advancedRelations buttons */}
                {this.props.advancedRelations ? (
                    <PlaceHolderButtons count={3} />
                ) : (
                    <PlaceHolderButtons count={3} />
                )}
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
