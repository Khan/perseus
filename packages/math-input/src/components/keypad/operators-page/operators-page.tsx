import * as React from "react";

import Keys from "../../../data/key-configs";
import {
    KeypadPageContainer,
    SecondaryKeypadButton,
    KeypadActionButton,
    PlaceHolderButton,
} from "../keypad-page-items";

import {PreAlgebra} from "./pre-algebra-buttons";

type Props = {
    onClickKey: (keyConfig: string) => void;
} & OperatorsButtonSets;

export type OperatorsButtonSets = {
    preAlgebra?: boolean;
    logarithms?: boolean;
    relations?: boolean;
    advancedRelations?: boolean;
};

export default class PreAlgebraPage extends React.Component<Props> {
    render(): React.ReactNode {
        const {onClickKey} = this.props;
        return (
            <KeypadPageContainer>
                {/* Row 1 */}
                {this.props.preAlgebra ? (
                    <PreAlgebra onClickKey={onClickKey} />
                ) : (
                    <PlaceHolderButton count={4} />
                )}

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
                    <PlaceHolderButton count={3} />
                ) : (
                    <PlaceHolderButton count={3} />
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
                {this.props.relations ? (
                    <PlaceHolderButton count={3} />
                ) : (
                    <PlaceHolderButton count={3} />
                )}
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
                    <PlaceHolderButton count={3} />
                ) : (
                    <PlaceHolderButton count={3} />
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
