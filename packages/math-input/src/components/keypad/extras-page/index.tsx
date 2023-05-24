import * as React from "react";

import Keys from "../../../data/key-configs";
import Key from "../../../data/keys";
import {KeypadPageContainer, KeypadButton} from "../keypad-page-items";

type Props = {
    extraKeys: ReadonlyArray<Key>;
    onClickKey: (keyConfig: string) => void;
};

export default class ExtrasPage extends React.Component<Props> {
    render(): React.ReactNode {
        const {extraKeys, onClickKey} = this.props;
        return (
            <KeypadPageContainer>
                {extraKeys.map((key) => (
                    <KeypadButton
                        key={key}
                        keyConfig={Keys[key]}
                        onClickKey={onClickKey}
                    />
                ))}
            </KeypadPageContainer>
        );
    }
}
