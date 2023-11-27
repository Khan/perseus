/**
 * Controlled component to display and change widget options.
 */

import {globalStyles} from "@khanacademy/perseus";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import Checkbox from "../../components/checkbox";

const {colors, typography} = globalStyles;

export type PreferredPopoverDirection =
    | "NONE"
    | "UP"
    | "DOWN"
    | "LEFT"
    | "RIGHT";

type Props = {
    // Whether multiple answer choices may be selected for markers.
    multipleAnswers: boolean;
    // Whether to hide answer choices from user instructions.
    hideChoicesFromInstructions: boolean;

    preferredPopoverDirection: PreferredPopoverDirection;
    // Callback for when widget options change.
    onChange: (options: {
        multipleAnswers?: boolean;
        hideChoicesFromInstructions?: boolean;
        preferredPopoverDirection?: PreferredPopoverDirection;
    }) => void;
};

const Behavior = ({
    multipleAnswers,
    hideChoicesFromInstructions,
    preferredPopoverDirection,
    onChange,
}: Props): React.ReactElement => (
    <div>
        <div className={css(styles.title)}>Behavior</div>

        <ul>
            <li className={css(styles.option)}>
                <Checkbox
                    checked={multipleAnswers}
                    onChange={() =>
                        onChange({multipleAnswers: !multipleAnswers})
                    }
                />

                <span className={css(styles.label)}>
                    Allow multiple answers per marker
                </span>
            </li>

            <li className={css(styles.option)}>
                <Checkbox
                    checked={hideChoicesFromInstructions}
                    onChange={() =>
                        onChange({
                            hideChoicesFromInstructions:
                                !hideChoicesFromInstructions,
                        })
                    }
                />

                <span className={css(styles.label)}>
                    Do not display answer choices in instructions
                </span>
            </li>

            <li className={css(styles.option)}>
                <span className={css(styles.label)}>
                    Preferred pop-over direction
                </span>
                <select
                    value={preferredPopoverDirection}
                    onChange={(e) => {
                        onChange({
                            preferredPopoverDirection: e.target
                                .value as PreferredPopoverDirection,
                        });
                    }}
                >
                    <option value="NONE"> No Preference </option>
                    <option value="UP"> Up </option>
                    <option value="DOWN"> Down </option>
                    <option value="LEFT"> Left </option>
                    <option value="RIGHT"> Right </option>
                </select>
            </li>
        </ul>
    </div>
);

const styles = StyleSheet.create({
    title: {
        ...typography.bodyXsmallBold,

        marginBottom: 6,

        color: colors.gray17,
    },

    option: {
        display: "flex",

        padding: "6px 0",
    },

    label: {
        ...typography.smallSubheadingMobile,

        marginLeft: 16,

        color: colors.gray17,
    },
});

export default Behavior;
