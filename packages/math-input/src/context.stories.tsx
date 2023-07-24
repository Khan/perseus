// eslint-disable-next-line import/no-extraneous-dependencies
import {ServerItemRenderer, ApiOptions} from "@khanacademy/perseus";
import * as React from "react";
import {useState, useEffect} from "react";

import Keypad from "./components/keypad";
import keypadContext, {VisibilityCallback} from "./context";
import {CursorContext, KeyHandler, KeypadConfiguration} from "./types";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Renderers/Server Item Renderer",
} as Story;

function ExerciseChrome() {
    return (
        <keypadContext.Consumer>
            {({showKeypadCallback}) => (
                <ServerItemRenderer
                    item={expressionItem}
                    apiOptions={{
                        ...ApiOptions.defaults,
                        isMobile: true,
                        customKeypad: true,
                    }}
                    showKeypadCallback={showKeypadCallback}
                />
            )}
        </keypadContext.Consumer>
    );
}

function MobileKeypad(props) {
    const {setShowKeypadCallback, keyHandler, cursorContext} = props;
    const [show, setShow] = useState(true);

    useEffect(() => {
        setShowKeypadCallback?.(() => {
            console.log("here");
            return (visibility) => {
                console.log("hello");
                setShow(visibility);
            };
        });
    }, [setShowKeypadCallback]);

    const wrapperStyles = {
        position: "fixed",
        right: 0,
        bottom: 0,
        left: 0,
        transform: show ? "translate3d(0, 0, 0)" : "translate3d(0, 100%, 0)",
    };

    console.log(cursorContext);

    return (
        <div style={wrapperStyles}>
            <Keypad
                onClickKey={keyHandler}
                cursorContext={cursorContext?.context}
                sendEvent={async () => {}}
            />
        </div>
    );
}

function ExerciseFooter() {
    return (
        <keypadContext.Consumer>
            {({keyHandler, cursorContext, config, setShowKeypadCallback}) => {
                console.log(keyHandler);
                return (
                    <MobileKeypad
                        keyHandler={keyHandler}
                        cursorContext={cursorContext}
                        config={config}
                        setShowKeypadCallback={setShowKeypadCallback}
                    />
                );
            }}
        </keypadContext.Consumer>
    );
}

export const ExperimentalContext = (args: StoryArgs): React.ReactElement => {
    const [cursorContext, setCursorContext] = useState<CursorContext>();
    const [keyHandler, setKeyHandler] = useState<KeyHandler>();
    const [config, setConfig] = useState<KeypadConfiguration>();
    const [showKeypadCallback, setShowKeypadCallback] =
        useState<VisibilityCallback>(() => {});

    return (
        <keypadContext.Provider
            value={{
                cursorContext,
                setCursorContext,
                keyHandler,
                setKeyHandler,
                config,
                setConfig,
                showKeypadCallback,
                setShowKeypadCallback,
            }}
        >
            <ExerciseChrome />
            <ExerciseFooter />
        </keypadContext.Provider>
    );
};

const expressionItem = {
    answerArea: {
        calculator: false,
        chi2Table: false,
        periodicTable: false,
        tTable: false,
        zTable: false,
    },
    _multi: null,
    answer: null,
    hints: [],
    itemDataVersion: {major: 0, minor: 1},
    question: {
        content:
            "### Practice Problem\n\n$8\\cdot(11i+2)=$ [[☃ expression 1]]  \n*Your answer should be a complex number in the form $a+bi$ where $a$ and $b$ are real numbers.*",
        images: {},
        widgets: {
            "expression 1": {
                alignment: "default",
                graded: true,
                options: {
                    answerForms: [
                        {
                            considered: "correct",
                            form: true,
                            key: "0",
                            simplify: false,
                            value: "16+88i",
                        },
                    ],
                    buttonSets: ["basic"],
                    functions: ["f", "g", "h"],
                    times: false,
                },
                static: false,
                type: "expression",
                version: {major: 1, minor: 0},
            },
        },
    },
};
