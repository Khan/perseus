const React = require("react");
const {StyleSheet} = require("aphrodite");

const {View} = require("../fake-react-native-web");
const {components, consts} = require("../index");

const {Keypad, KeypadInput} = components;

class App extends React.Component {
    state = {
        keypadElement: null,
        value: "",
        keypadType: consts.KeypadTypes.EXPRESSION,
    };

    handleChange = (e) => {
        this.state.keypadElement.configure({
            keypadType: e.target.value,
            extraKeys: ["x", "y", "PI", "THETA"],
        });
        this.setState({keypadType: e.target.value});
    };

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <KeypadInput
                        value={this.state.value}
                        keypadElement={this.state.keypadElement}
                        onChange={(value, cb) => this.setState({value}, cb)}
                        onFocus={() => this.state.keypadElement.activate()}
                        onBlur={() => this.state.keypadElement.dismiss()}
                    />
                    <View style={styles.selectContainer}>
                        Keypad type:
                        <select
                            onChange={this.handleChange}
                            value={this.state.keypadType}
                        >
                            <option value={consts.KeypadTypes.FRACTION}>
                                FRACTION
                            </option>
                            <option value={consts.KeypadTypes.EXPRESSION}>
                                EXPRESSION
                            </option>
                        </select>
                    </View>
                </View>
                <Keypad
                    onElementMounted={(node) => {
                        if (node && !this.state.keypadElement) {
                            this.setState({keypadElement: node});
                        }
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 40,
    },
    selectContainer: {
        marginTop: 16,
        flexDirection: "row",
    },
});

module.exports = App;
