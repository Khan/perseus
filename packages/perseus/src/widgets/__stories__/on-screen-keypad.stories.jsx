// @flow
import {Keypad} from "@khanacademy/math-input";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {ItemRenderer} from "../../index.js";
import KeypadContext from "../../keypad-context.js";
import {expressionItem3} from "../__testdata__/expression_testdata.js";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Demos/On Screen Keypad",
}: Story);

const Content = (): React.Node => {
    return (
        <KeypadContext.Consumer>
            {({keypadElement, setRenderer, scrollableElement}) => (
                <>
                    <ItemRenderer
                        ref={setRenderer}
                        problemNum={0}
                        apiOptions={{
                            customKeypad: true,
                            onFocusChange: (
                                newFocusPath,
                                oldFocusPath,
                                keypadElement,
                                focusedElement,
                            ) => {},
                        }}
                        item={expressionItem3}
                        savedState={null}
                    />
                    <div id="workarea" />
                    <div id="hintsarea" />
                </>
            )}
        </KeypadContext.Consumer>
    );
};

const Footer = (): React.Node => {
    return (
        <View
            style={[
                styles.keypadContainer,
                {
                    // NOTE: in webapp we normally get this from problemProgress
                    // from the exercise state store.
                    height: 240,
                },
            ]}
        >
            <KeypadContext.Consumer>
                {({keypadElement, setKeypadElement, renderer}) => (
                    <Keypad
                        onElementMounted={setKeypadElement}
                        onDismiss={() => renderer && renderer.blur()}
                        style={styles.keypad}
                    />
                )}
            </KeypadContext.Consumer>
        </View>
    );
};

const Demo = () => {
    const [keypadElement, setKeypadElement] = React.useState(null);
    const [renderer, setRenderer] = React.useState(null);
    const [scrollableElement, setScrollableElement] = React.useState(
        document.body,
    );

    return (
        <KeypadContext.Provider
            value={{
                setKeypadElement,
                keypadElement,
                setRenderer,
                renderer,
                setScrollableElement,
                scrollableElement,
            }}
        >
            <Content />
            <Footer />
        </KeypadContext.Provider>
    );
};

export const CustomKeypad = (args: StoryArgs): React.Node => <Demo />;

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
    },
});
