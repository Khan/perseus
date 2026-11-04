// The preview's controls, shared by the browser preview (shell.tsx) and the
// MCP Apps page: the preview options, and hints revealed on request.
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {CheckboxGroup, Choice} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import styles from "./controls.module.css";

import type {ShowSolutions} from "@khanacademy/perseus-core";
import type {HintsState, PreviewOptions} from "@khanacademy/perseus-preview";

function describeHintsState({
    hintsVisible,
    total,
    visibleCount,
    isFinalHelpPage,
}: HintsState): string {
    const revealed = `${hintsVisible} of ${total} hints revealed.`;
    if (isFinalHelpPage) {
        // HintsRenderer stays in this mode until the hints are hidden.
        return (
            `${revealed} More than one was revealed at once, so this is the ` +
            "final help page: every revealed hint shows, even ones marked " +
            "to replace the hint before them."
        );
    }
    if (visibleCount < hintsVisible) {
        return (
            `${revealed} ${visibleCount} showing: some replace the hint ` +
            "before them."
        );
    }
    return revealed;
}

export function HintControls({
    hintsState,
    revealHint,
}: {
    hintsState: HintsState | null;
    revealHint: (hintsVisible?: number) => void;
}) {
    const headingId = React.useId();
    const hintsVisible = hintsState?.hintsVisible ?? 0;
    const allRevealed =
        hintsState == null || hintsState.hintsVisible >= hintsState.total;
    return (
        <View
            tag="section"
            aria-labelledby={headingId}
            className={styles.group}
        >
            <Heading id={headingId} tag="h2" size="medium">
                Hints
            </Heading>
            {hintsState?.total === 0 ? (
                <BodyText>This item has no hints.</BodyText>
            ) : (
                <>
                    <View className={styles.row}>
                        <Button
                            kind="secondary"
                            size="small"
                            disabled={allRevealed}
                            onClick={() => revealHint()}
                        >
                            Show next hint
                        </Button>
                        <Button
                            kind="secondary"
                            size="small"
                            disabled={allRevealed}
                            onClick={() => revealHint(-1)}
                        >
                            Show all hints
                        </Button>
                        <Button
                            kind="secondary"
                            size="small"
                            disabled={hintsVisible === 0}
                            onClick={() => revealHint(0)}
                        >
                            Hide hints
                        </Button>
                    </View>
                    {hintsState != null && (
                        <BodyText>{describeHintsState(hintsState)}</BodyText>
                    )}
                </>
            )}
        </View>
    );
}

// The preview options the shell offers. The others (mobile, locale, color
// scheme) aren't supported by the preview yet.
export type OfferedOptions = Pick<
    PreviewOptions,
    "reviewMode" | "showSolutions" | "answerless" | "readOnly"
>;

const TOGGLES = {
    reviewMode: "Review mode",
    answerless: "Without answers, as learners get it",
    readOnly: "Read only",
} satisfies Record<Exclude<keyof OfferedOptions, "showSolutions">, string>;

type Toggle = keyof typeof TOGGLES;

function isToggle(value: string): value is Toggle {
    return Object.keys(TOGGLES).includes(value);
}

const SHOW_SOLUTIONS_TEXT: Record<ShowSolutions, string> = {
    none: "None",
    selected: "For the selected choices",
    all: "For every choice",
};

function isShowSolutions(value: string): value is ShowSolutions {
    return Object.keys(SHOW_SOLUTIONS_TEXT).includes(value);
}

export function OptionControls({
    options,
    onChange,
}: {
    options: OfferedOptions;
    onChange: (options: Partial<OfferedOptions>) => void;
}) {
    const toggles = Object.keys(TOGGLES).filter(isToggle);
    return (
        <View className={styles.row}>
            <CheckboxGroup
                label="Preview options"
                groupName="preview-options"
                selectedValues={toggles.filter((toggle) => options[toggle])}
                onChange={(selected) =>
                    onChange(
                        Object.fromEntries(
                            toggles.map((toggle) => [
                                toggle,
                                selected.includes(toggle),
                            ]),
                        ),
                    )
                }
            >
                {toggles.map((toggle) => (
                    <Choice
                        key={toggle}
                        label={TOGGLES[toggle]}
                        value={toggle}
                    />
                ))}
            </CheckboxGroup>
            <LabeledField
                label="Show solutions"
                field={
                    <SingleSelect
                        placeholder="Choose when to show solutions"
                        selectedValue={options.showSolutions}
                        onChange={(value) => {
                            if (isShowSolutions(value)) {
                                onChange({showSolutions: value});
                            }
                        }}
                    >
                        {Object.entries(SHOW_SOLUTIONS_TEXT).map(
                            ([value, text]) => (
                                <OptionItem
                                    key={value}
                                    label={text}
                                    value={value}
                                />
                            ),
                        )}
                    </SingleSelect>
                }
            />
        </View>
    );
}

export const DEFAULT_OFFERED_OPTIONS: OfferedOptions = {
    reviewMode: false,
    showSolutions: "none",
    answerless: false,
    readOnly: false,
};
