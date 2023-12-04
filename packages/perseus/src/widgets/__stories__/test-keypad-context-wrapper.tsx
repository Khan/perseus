import {
    KeypadContext,
    StatefulKeypadContextProvider,
    MobileKeypad,
} from "@khanacademy/math-input";
import {View} from "@khanacademy/wonder-blocks-core";
import {action} from "@storybook/addon-actions";
import {StyleSheet} from "aphrodite";
import * as React from "react";

const Footer = (): React.ReactElement => {
    return (
        <View style={styles.keypadContainer}>
            <KeypadContext.Consumer>
                {({setKeypadElement, renderer}) => (
                    <MobileKeypad
                        onElementMounted={setKeypadElement}
                        onDismiss={() => renderer && renderer.blur()}
                        style={styles.keypad}
                        onAnalyticsEvent={async (e) => {
                            action("onAnalyticsEvent")(e);
                        }}
                    />
                )}
            </KeypadContext.Consumer>
        </View>
    );
};

type Props = {
    children: React.ReactElement;
};

const TestKeypadContextWrapper = (props: Props): React.ReactElement => {
    return (
        <StatefulKeypadContextProvider>
            {props.children}
            <Footer />
        </StatefulKeypadContextProvider>
    );
};

export default TestKeypadContextWrapper;

const styles = StyleSheet.create({
    keypad: {
        position: "absolute",
        // The keypad itself needs to respond to events even though
        // we've set its container to pointer-events: none;
        pointerEvents: "all",
    },
    keypadContainer: {
        position: "absolute",
        width: "100%",
        bottom: 0,
        // Hide the overflow of this container so when the keypad is
        // dismissed, it doesn't overlap the toolbar.
        overflow: "hidden",
        // Prevent container from swallowing events that the exercise
        // below it needs to respond to.
        pointerEvents: "none",
        // NOTE: in webapp we normally get this from problemProgress
        // from the exercise state store.
        height: 240,
    },
});
