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
    trigonometry: boolean;
    preAlgebra: boolean;
    logarithms: boolean;
    basicRelations: boolean;
    advancedRelations: boolean;
    multiplicationDot: boolean;
    divisionKey: boolean;
};

function StatefulKeypad({
    handleClickKey,
    showKeypad,
    trigonometry,
    preAlgebra,
    logarithms,
    basicRelations,
    advancedRelations,
    multiplicationDot,
    divisionKey,
}: Props) {
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
                trigonometry={trigonometry}
                preAlgebra={preAlgebra}
                logarithms={logarithms}
                basicRelations={basicRelations}
                advancedRelations={advancedRelations}
                multiplicationDot={multiplicationDot}
                divisionKey={divisionKey}
            />
        </Provider>
    );
}

export default StatefulKeypad;
