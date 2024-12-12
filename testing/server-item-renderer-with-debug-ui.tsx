import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import * as React from "react";

import * as Perseus from "../packages/perseus/src/index";
import {mockStrings} from "../packages/perseus/src/strings";
import {keScoreFromPerseusScore} from "../packages/perseus/src/util/scoring";

import KEScoreUI from "./ke-score-ui";
import SideBySide from "./side-by-side";
import {storybookDependenciesV2} from "./test-dependencies";

import type {PerseusItem} from "../packages/perseus/src/perseus-types";
import type {APIOptions} from "../packages/perseus/src/types";
import type {KeypadAPI} from "@khanacademy/math-input";
import type {KEScore} from "@khanacademy/perseus-core";

type Props = {
    item: PerseusItem;
    apiOptions?: APIOptions;
    keypadElement?: KeypadAPI | null | undefined;
};

export const ServerItemRendererWithDebugUI = ({
    item,
    apiOptions,
    keypadElement,
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
        const score = Perseus.scorePerseusItem(
            item.question,
            userInput,
            mockStrings,
            "en",
        );

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

    return (
        <SideBySide
            leftTitle="Renderer"
            left={
                <>
                    <Perseus.ServerItemRenderer
                        ref={ref}
                        problemNum={0}
                        apiOptions={options}
                        item={item}
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
