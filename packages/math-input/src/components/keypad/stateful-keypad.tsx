import * as React from "react";
import {Provider} from "react-redux";

import {createStore} from "../../store/index";

import Keypad from "./index";

function StatefulKeypad({handleClickKey}) {
    const [store, setStore] = React.useState();

    React.useEffect(() => {
        if (!store) {
            setStore(createStore());
        }
    }, [store, setStore]);

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
