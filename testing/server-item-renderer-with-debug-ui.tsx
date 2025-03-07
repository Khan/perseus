import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import * as React from "react";

import {
    type PerseusItem,
    type KEScore,
    type PerseusRenderer,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";

import * as Perseus from "../packages/perseus/src/index";
import {keScoreFromPerseusScore} from "../packages/perseus/src/util/scoring";

import KEScoreUI from "./ke-score-ui";
import SideBySide from "./split-view";
import {storybookDependenciesV2} from "./test-dependencies";

import type {APIOptions} from "../packages/perseus/src/types";
import type {KeypadAPI} from "@khanacademy/math-input";

type Props = {
    item: PerseusItem;
    apiOptions?: APIOptions;
    keypadElement?: KeypadAPI | null | undefined;
    answerless?: boolean;
};

export const ServerItemRendererWithDebugUI = ({
    item,
    apiOptions,
    keypadElement,
    answerless = false,
}: Props): React.ReactElement => {
    const ref = React.useRef<Perseus.ServerItemRendererComponent>(null);
    const [state, setState] = React.useState<KEScore | null | undefined>(null);
    const options = apiOptions || Object.freeze({});

    const getKeScore = () => {
        const renderer = ref.current;
        if (!renderer) {
            return;
        }

        const userInput = renderer.getUserInput();
        const score = scorePerseusItem(item.question, userInput, "en");

        // Continue to include an empty guess for the now defunct answer area.
        // TODO(alex): Check whether we rely on the format here for
        //             analyzing ProblemLogs. If not, remove this layer.
        const maxCompatGuess = [renderer.getUserInputLegacy(), []];
        return keScoreFromPerseusScore(
            score,
            maxCompatGuess,
            renderer.getSerializedState().question,
        );
    };

    const renderedQuestion: PerseusRenderer = answerless
        ? splitPerseusItem(item.question)
        : item.question;

    const renderedItem: PerseusItem = {
        ...item,
        question: renderedQuestion,
    };

    return (
        <SideBySide
            rendererTitle="Renderer"
            renderer={
                <>
                    <Perseus.ServerItemRenderer
                        ref={ref}
                        problemNum={0}
                        apiOptions={options}
                        item={renderedItem}
                        dependencies={storybookDependenciesV2}
                        keypadElement={keypadElement}
                    />
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Button
                            onClick={() => {
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
                                ref.current?.showRationalesForCurrentlySelectedChoices();
                            }}
                        >
                            Show Rationales
                        </Button>
                    </View>
                    <KEScoreUI score={state} />
                </>
            }
            jsonObject={item}
        />
    );
};
