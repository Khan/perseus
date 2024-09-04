import Button from "@khanacademy/wonder-blocks-button";
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {randomInteractiveGraphGenerator} from "../__testdata__/interactive-graph-random.testdata";
import {randomCategorizerGenerator} from "../categorizer/categorizer.testdata";
import {randomDropdownGenerator} from "../dropdown/dropdown.testdata";
import {randomExplanationGenerator} from "../explanation/explanation.testdata";
import {randomExpressionGenerator} from "../expression/expression.testdata";
import {randomRadioGenerator} from "../radio/__tests__/radio.testdata";

import type {PerseusRenderer} from "../../perseus-types";

export default {
    title: "Perseus/Randomized Widgets",
};

const RandomizedWidgetContainer = (
    randomizer: () => PerseusRenderer,
): React.ReactElement => {
    const [question, setQuestion] = React.useState(randomizer());
    const randomize = () => {
        setQuestion(randomizer());
    };

    return (
        <div>
            <Button size="small" style={{marginBottom: 24}} onClick={randomize}>
                Randomize
            </Button>

            <RendererWithDebugUI question={question} />
        </div>
    );
};

export const RandomCategorizer = (): React.ReactElement => {
    return RandomizedWidgetContainer(randomCategorizerGenerator);
};

export const RandomDropdown = (): React.ReactElement => {
    return RandomizedWidgetContainer(randomDropdownGenerator);
};

export const RandomExplanation = (): React.ReactElement => {
    return RandomizedWidgetContainer(randomExplanationGenerator);
};

export const RandomExpression = (): React.ReactElement => {
    return RandomizedWidgetContainer(randomExpressionGenerator);
};

export const RandomInteractiveGraph = (): React.ReactElement => {
    return RandomizedWidgetContainer(randomInteractiveGraphGenerator);
};

export const RandomRadio = (): React.ReactElement => {
    return RandomizedWidgetContainer(randomRadioGenerator);
};
