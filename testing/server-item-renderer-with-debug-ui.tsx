import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Switch from "@khanacademy/wonder-blocks-switch";
import deviceMobile from "@phosphor-icons/core/regular/device-mobile.svg";
import * as React from "react";

import {splitPerseusItem} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";

import {KeypadContext} from "../packages/keypad-context/src/keypad-context";
import {ServerItemRenderer} from "../packages/perseus/src/server-item-renderer";
import {keScoreFromPerseusScore} from "../packages/perseus/src/util/scoring";

import KEScoreUI from "./ke-score-ui";
import SplitView from "./split-view";
import {storybookDependenciesV2} from "./test-dependencies";
import TestKeypadContextWrapper from "./test-keypad-context-wrapper";

import type {APIOptions} from "../packages/perseus/src/types";
import type {
    PerseusItem,
    KEScore,
    ShowSolutions,
} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

type Props = {
    title?: string;
    item: PerseusItem;
    apiOptions?: APIOptions;
    linterContext?: LinterContextProps;
    // Temporary measure testing rendering with answerless data;
    // only exists until all widgets are renderable with answerless data
    startAnswerless?: boolean;
    reviewMode?: boolean;
    showSolutions?: ShowSolutions;
};

export const ServerItemRendererWithDebugUI = ({
    title = "Widget",
    item,
    apiOptions = Object.freeze({}),
    linterContext,
    reviewMode = false,
    startAnswerless = false,
    showSolutions,
}: Props): React.ReactElement => {
    const ref = React.useRef<ServerItemRenderer>(null);
    const [state, setState] = React.useState<KEScore | null | undefined>(null);
    const [isMobile, setIsMobile] = React.useState(
        apiOptions.isMobile ?? false,
    );
    const [hintsVisible, setHintsVisible] = React.useState(0);
    const [answerless, setAnswerless] =
        React.useState<boolean>(startAnswerless);
    const options = {
        ...apiOptions,
        isMobile,
        customKeypad: isMobile, // Use the mobile keypad for mobile
    };

    const getKeScore = () => {
        const renderer = ref.current;
        if (!renderer) {
            return;
        }

        const userInput = renderer.getUserInput();
        const score = scorePerseusItem(item.question, userInput, "en");

        return keScoreFromPerseusScore(
            score,
            userInput,
            renderer.getSerializedState().question,
        );
    };

    // `reviewMode` and `showSolutions` require answerful data by definition,
    // so only use answerless data if those are not enabled. Also makes the
    // startAnswerless toggle actually switch between answerless and answerful
    // data, though a page refresh is needed to see the change.
    const shouldUseAnswerless =
        answerless &&
        !reviewMode &&
        (showSolutions === "none" || !showSolutions);

    const renderedItem: PerseusItem = shouldUseAnswerless
        ? splitPerseusItem(item)
        : item;

    return (
        <TestKeypadContextWrapper>
            <SplitView
                rendererTitle={
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        {title}
                        <View style={{marginLeft: "auto"}}>
                            <Switch
                                icon={<PhosphorIcon icon={deviceMobile} />}
                                checked={isMobile}
                                onChange={setIsMobile}
                            />
                        </View>
                    </View>
                }
                renderer={
                    <>
                        <View className={isMobile ? "perseus-mobile" : ""}>
                            <KeypadContext.Consumer>
                                {({keypadElement}) => {
                                    return (
                                        <ServerItemRenderer
                                            ref={ref}
                                            problemNum={0}
                                            score={state}
                                            apiOptions={options}
                                            item={renderedItem}
                                            dependencies={
                                                storybookDependenciesV2
                                            }
                                            keypadElement={keypadElement}
                                            linterContext={linterContext}
                                            reviewMode={reviewMode}
                                            showSolutions={showSolutions}
                                            hintsVisible={hintsVisible}
                                        />
                                    );
                                }}
                            </KeypadContext.Consumer>
                        </View>
                        <View
                            style={{flexDirection: "row", alignItems: "center"}}
                        >
                            <Button
                                onClick={() => {
                                    setAnswerless(false);
                                    if (!ref.current) {
                                        return;
                                    }
                                    setState(getKeScore());
                                }}
                            >
                                Check
                            </Button>
                            <Strut size={8} />
                            <Button
                                onClick={() => {
                                    setAnswerless(false);
                                    ref.current?.showRationalesForCurrentlySelectedChoices();
                                }}
                            >
                                Show Rationales
                            </Button>
                            <Strut size={8} />
                            <Button
                                disabled={hintsVisible >= item.hints.length}
                                onClick={() => {
                                    setHintsVisible(hintsVisible + 1);
                                }}
                            >
                                {hintsVisible >= item.hints.length
                                    ? "No hints left"
                                    : `Take Hint ${hintsVisible + 1}`}
                            </Button>
                        </View>
                        <KEScoreUI score={state} />
                    </>
                }
                jsonObject={renderedItem}
            />
        </TestKeypadContextWrapper>
    );
};
