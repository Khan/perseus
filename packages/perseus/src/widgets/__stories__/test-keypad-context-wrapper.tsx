import {LegacyKeypad, KeypadContext} from "@khanacademy/math-input";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

const Footer = (): React.ReactElement => {
    return (
        <View style={styles.keypadContainer}>
            <KeypadContext.Consumer>
                {({keypadElement, setKeypadElement, renderer}) => (
                    <LegacyKeypad
                        onElementMounted={setKeypadElement}
                        onDismiss={() => renderer && renderer.blur()}
                        style={styles.keypad}
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
    const [keypadElement, setKeypadElement] = React.useState(null);
    const [renderer, setRenderer] = React.useState(null);
    const [scrollableElement, setScrollableElement] = React.useState(
        document.body,
    );

    return (
        <KeypadContext.Provider
            value={{
                // @ts-expect-error [FEI-5003] - TS2322 - Type 'Dispatch<SetStateAction<HTMLElement>>' is not assignable to type '(scrollableElement?: HTMLElement | null | undefined) => void'.
                setKeypadElement,
                keypadElement,
                // @ts-expect-error [FEI-5003] - TS2322 - Type 'Dispatch<SetStateAction<HTMLElement>>' is not assignable to type '(scrollableElement?: HTMLElement | null | undefined) => void'.
                setRenderer,
                renderer,
                // @ts-expect-error [FEI-5003] - TS2322 - Type 'Dispatch<SetStateAction<HTMLElement>>' is not assignable to type '(scrollableElement?: HTMLElement | null | undefined) => void'.
                setScrollableElement,
                scrollableElement,
            }}
        >
            {props.children}
            <Footer />
        </KeypadContext.Provider>
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
