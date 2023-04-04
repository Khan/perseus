import * as React from "react";
import ReactDOM from "react-dom";

import KeyConfigs from "./data/key-configs";
import {View} from "./fake-react-native-web/index";

import {KeypadInput} from "./index";

// eslint-disable-next-line react/prop-types
const ManualInput = ({handler}) => {
    return (
        <div>
            {Object.keys(KeyConfigs).map((k) => (
                <button
                    style={{display: "block"}}
                    disabled={!handler}
                    onClick={() => handler(k)}
                >
                    {k} : {KeyConfigs[k].ariaLabel}
                </button>
            ))}
        </div>
    );
};

class App extends React.Component {
    state = {
        active: false,
        handler: null,
        keypadElement: {
            activate: () => this.setState({active: true}),
            dismiss: () => this.setState({active: false}),
            // eslint-disable-next-line no-console
            configure: (config) => console.log("configure:", config),
            // eslint-disable-next-line no-console
            setCursor: (cursor) => console.log("Cursor:", cursor),
            setKeyHandler: (handler) => this.setState({handler}),
            getDOMNode: () => null,
        },
        value: "",
    };

    render() {
        return (
            <View>
                <div
                    style={{
                        marginTop: 10,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 40,
                    }}
                >
                    <KeypadInput
                        value={this.state.value}
                        ref={(inp) => (this.inp = inp)}
                        keypadElement={this.state.keypadElement}
                        onChange={(value, cb) => this.setState({value}, cb)}
                        onFocus={() => this.state.keypadElement.activate()}
                        onBlur={() => this.state.keypadElement.dismiss()}
                    />
                </div>
                <div>
                    <button
                        style={{display: "block"}}
                        onClick={() => this.inp.focus()}
                    >
                        Focus
                    </button>
                </div>
                <div style={{padding: 20}}>
                    Handler assigned: {"" + !!this.state.handler}
                    <br />
                    Active: {"" + this.state.active}
                </div>
                <br />
                <br />
                <ManualInput handler={this.state.handler} />
            </View>
        );
    }
}

// eslint-disable-next-line no-restricted-syntax
ReactDOM.render(<App />, document.getElementById("root"));
