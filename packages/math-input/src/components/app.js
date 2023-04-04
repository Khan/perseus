import {StyleSheet} from "aphrodite";
import * as React from "react";

import {View} from "../fake-react-native-web/index";
import {Keypad, KeypadInput, KeypadTypes} from "../index";

class App extends React.Component {
    state = {
        keypadElement: null,
        value: "",
        keypadType: KeypadTypes.EXPRESSION,
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
                            <option value={KeypadTypes.FRACTION}>
                                FRACTION
                            </option>
                            <option value={KeypadTypes.EXPRESSION}>
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

export default App;
