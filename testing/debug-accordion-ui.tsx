import {
    Accordion,
    AccordionSection,
} from "@khanacademy/wonder-blocks-accordion";
import Button from "@khanacademy/wonder-blocks-button";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import styles from "./debug-accordion-ui.module.css";
import KEScoreUI from "./ke-score-ui";

import type {KEScore, PerseusItem} from "@khanacademy/perseus-core";

type DebugAccordionUIProps = {
    state: KEScore | null | undefined;
    perseusItem: PerseusItem;
    updateJson: (json: string) => boolean;
};

/**
 * ScoreHeader displays the score state with colored indicators
 */
const ScoreHeader = ({score}: {score: KEScore}): React.ReactElement => {
    // Create the status badge component for the score
    const StatusBadge = ({
        label,
        value,
        success,
    }: {
        label: string;
        value: boolean;
        success: boolean;
    }) => (
        <div
            className={`${styles["status-badge"]} ${success ? styles["status-badge-success"] : styles["status-badge-error"]}`}
        >
            <LabelSmall>{label}:</LabelSmall>
            <LabelSmall
                style={{
                    color: success
                        ? semanticColor.core.foreground.success.subtle
                        : semanticColor.core.foreground.critical.subtle,
                    fontWeight: "bold",
                }}
            >
                {value.toString()}
            </LabelSmall>
        </div>
    );

    return (
        <div className={styles["score-header-container"]}>
            Score
            <StatusBadge
                label="Empty"
                value={score?.empty}
                success={!score?.empty}
            />
            <StatusBadge
                label="Correct"
                value={score?.correct}
                success={score?.correct}
            />
        </div>
    );
};

/**
 * JsonEditor provides a textarea for editing the Perseus item JSON
 * with a button to update the Perseus item when ready.
 */
const JsonEditor = ({
    perseusItem,
    updateJson,
}: {
    perseusItem: PerseusItem;
    updateJson: (json: string) => boolean;
}): React.ReactElement => {
    const [jsonText, setJsonText] = React.useState(() =>
        JSON.stringify(perseusItem, null, 2),
    );
    const [hasInvalidJson, setHasInvalidJson] = React.useState(false);

    // Update local state when perseusItem changes from external sources
    React.useEffect(() => {
        setJsonText(JSON.stringify(perseusItem, null, 2));
        setHasInvalidJson(false); // Reset error state when item changes
    }, [perseusItem]);

    const handleTextareaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setJsonText(e.target.value);
        // Reset error state when user interacts with the textarea
        if (hasInvalidJson) {
            setHasInvalidJson(false);
        }
    };

    const handleUpdateJson = () => {
        const success = updateJson(jsonText);
        setHasInvalidJson(!success);
    };

    return (
        <div className={styles["json-editor-container"]}>
            <textarea
                wrap="off"
                rows={10}
                className={styles["textarea"]}
                value={jsonText}
                onChange={handleTextareaChange}
            />
            <div className={styles["button-container"]}>
                <Button onClick={handleUpdateJson} disabled={hasInvalidJson}>
                    {hasInvalidJson
                        ? "Invalid JSON. Please fix and then try again."
                        : "Update JSON"}
                </Button>
            </div>
        </div>
    );
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
     * Get the accordion sections for the debug UI,
     * which includes the score and the Perseus JSON sections
     */
    const getAccordionSections = () => {
        // Create the score section if we have a score
        const scoreSection =
            state != null
                ? [
                      <AccordionSection
                          header={<ScoreHeader score={state} />}
                          key="score"
                      >
                          <KEScoreUI score={state} />
                      </AccordionSection>,
                  ]
                : [];

        // Create the Perseus JSON section
        const jsonSection = (
            <AccordionSection header="Perseus JSON" key="json">
                <JsonEditor perseusItem={perseusItem} updateJson={updateJson} />
            </AccordionSection>
        );

        // Combine the sections
        return [...scoreSection, jsonSection];
    };

    return (
        <Accordion style={{margin: `${sizing.size_160} 0`}}>
            {getAccordionSections()}
        </Accordion>
    );
};
