/**
 * Controlled component to display and change widget options.
 */

import {bodyXsmallBold} from "@khanacademy/perseus";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import Checkbox from "../../components/checkbox";
import {gray17} from "../../styles/global-colors";

type Props = {
    // Whether multiple answer choices may be selected for markers.
    multipleAnswers: boolean;
    // Whether to hide answer choices from user instructions.
    hideChoicesFromInstructions: boolean;

    // Callback for when widget options change.
    onChange: (options: {
        multipleAnswers?: boolean;
        hideChoicesFromInstructions?: boolean;
    }) => void;
};

const Behavior = ({
    multipleAnswers,
    hideChoicesFromInstructions,
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
        </ul>
    </div>
);

const styles = StyleSheet.create({
    title: {
        ...bodyXsmallBold,

        marginBottom: 6,

        color: gray17,
    },

    option: {
        display: "flex",

        padding: "6px 0",
    },

    label: {
        // TODO: could we use WB typography?
        fontFamily: "inherit",
        fontSize: 15,
        lineHeight: 1.25,

        marginLeft: 16,

        color: gray17,
    },
});

export default Behavior;
