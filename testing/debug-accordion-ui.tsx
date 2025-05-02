import {
    Accordion,
    AccordionSection,
} from "@khanacademy/wonder-blocks-accordion";
import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import KEScoreUI from "./ke-score-ui";

import type {KEScore, PerseusItem} from "@khanacademy/perseus-core";

type DebugAccordionUIProps = {
    state: KEScore | null | undefined;
    perseusItem: PerseusItem;
    updateJson: (json: string) => void;
};

/**
 * A component that renders the debug accordion UI for Perseus items
 */
export const DebugAccordionUI = ({
    state,
    perseusItem,
    updateJson,
}: DebugAccordionUIProps): React.ReactElement => {
    /**
     * Get the accordion sections for the debug UI
     */
    const getAccordionSections = () => {
        const accordionSections: React.ReactElement[] = [];

        // Add the score section first if we have a score
        if (state !== null) {
            const headerElement = (
                <View
                    style={{
                        flexDirection: "row",
                        margin: spacing.medium_16,
                        gap: spacing.medium_16,
                    }}
                >
                    <span>Score</span>
                    <span> | </span>
                    <span>
                        Empty:{" "}
                        <span style={{color: state?.empty ? "red" : "green"}}>
                            {state?.empty.toString()}
                        </span>
                    </span>
                    <span> | </span>
                    <span>
                        Correct:{" "}
                        <span style={{color: state?.correct ? "green" : "red"}}>
                            {state?.correct.toString()}
                        </span>
                    </span>
                </View>
            );
            accordionSections.push(
                <AccordionSection header={headerElement} key={0}>
                    <KEScoreUI
                        score={state}
                        style={{padding: "0px 20px 20px 20px"}}
                    />
                </AccordionSection>,
            );
        }

        // Then add the Perseus JSON section
        accordionSections.push(
            <AccordionSection header="Perseus JSON" key={1}>
                <textarea
                    wrap={"off"}
                    rows={10}
                    style={{width: "100%", height: 400}}
                    value={JSON.stringify(perseusItem, null, 2)}
                    onChange={(e) => updateJson(e.target.value)}
                />
            </AccordionSection>,
        );

        return accordionSections;
    };

    return (
        <Accordion style={{margin: "20px 0px"}}>
            {getAccordionSections()}
        </Accordion>
    );
};
