const React = require("react");
const ReactDOM = require("react-dom");

const {View} = require("./fake-react-native-web");
const {components} = require("./index");

const {Keypad, KeypadInput} = components;
const KeyConfigs = require("./data/key-configs.js");

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
            configure: (config) => console.log("configure:", config),
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

ReactDOM.render(<App />, document.getElementById("root"));
