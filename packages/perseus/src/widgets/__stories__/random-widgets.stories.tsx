import * as React from "react";

import Button from "@khanacademy/wonder-blocks-button";

import { RendererWithDebugUI } from "../../../../../testing/renderer-with-debug-ui";
import { randomCategorizerGenerator } from "../__testdata__/categorizer.testdata";
import { randomDropdownGenerator } from "../__testdata__/dropdown.testdata";
import { randomExplanationGenerator } from "../__testdata__/explanation.testdata";
import { randomExpressionGenerator } from "../__testdata__/expression.testdata";
import { randomInteractiveGraphGenerator } from "../__testdata__/interactive-graph-random.testdata";
import { randomRadioGenerator } from "../__testdata__/radio.testdata";

import type {PerseusRenderer} from "@khanacademy/perseus";

export default {
    title: "Random Widgets",
};

const randomizedWidgetContainer = (randomizer: (type?: string) => PerseusRenderer, type?: string) : React.ReactElement => {
    const [question, setQuestion] = React.useState(
        randomizer(type),
    );
    const randomize = () => {
        setQuestion(randomizer(type));
    };

    return (
        <div>
            <Button size="small" style={{marginBottom: 24}} onClick={randomize}>Randomize</Button>

            <RendererWithDebugUI question={question} />
        </div>
    );
}

export const randomCategorizer = (): React.ReactElement => {
    return randomizedWidgetContainer(randomCategorizerGenerator);
};

export const randomDropdown = (): React.ReactElement => {
    return randomizedWidgetContainer(randomDropdownGenerator);
};

export const randomExplanation = (): React.ReactElement => {
    return randomizedWidgetContainer(randomExplanationGenerator);
};

export const randomExpression = (): React.ReactElement => {
    return randomizedWidgetContainer(randomExpressionGenerator);
};

export const randomInteractiveGraph = (): React.ReactElement => {
    return randomizedWidgetContainer(randomInteractiveGraphGenerator);
};

export const RandomRadio = (): React.ReactElement => {
    return randomizedWidgetContainer(randomRadioGenerator);
};
