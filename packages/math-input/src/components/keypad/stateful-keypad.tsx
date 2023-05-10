import * as React from "react";
import {Provider} from "react-redux";

import {
    activateKeypad,
    dismissKeypad,
    setKeyHandler,
} from "../../store/actions";
import {createStore} from "../../store/index";
import {KeyHandler} from "../../types";

import Keypad from "./index";

type Props = {
    handleClickKey: KeyHandler;
    showKeypad: boolean;
};

function StatefulKeypad({handleClickKey, showKeypad}: Props) {
    const [store, setStore] = React.useState<any>();

    React.useEffect(() => {
        if (!store) {
            setStore(createStore());
        }
    }, [store, setStore]);

    React.useEffect(() => {
        store?.dispatch(setKeyHandler(handleClickKey));
    }, [store, handleClickKey]);

    React.useEffect(() => {
        const action = showKeypad ? activateKeypad : dismissKeypad;
        store?.dispatch(action());
    }, [store, showKeypad]);

    if (!store) {
        return null;
    }

    return (
        <Provider store={store}>
            <Keypad
                onClickKey={handleClickKey}
                trigonometry
                preAlgebra
                logarithms
                basicRelations
                advancedRelations
                multiplicationDot
                divisionKey
            />
        </Provider>
    );
}

export default StatefulKeypad;
