/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/no-unsafe */
/**
 * Controlled editor image marker on the question image.
 *
 * Allows to select which label choices are the answers for each marker, using
 * the dropdown component.
 */

import {globalConstants, globalStyles} from "@khanacademy/perseus";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import Option, {OptionGroup} from "../../components/dropdown-option";
import FormWrappedTextField from "../../components/form-wrapped-text-field";

import type {MarkerType} from "@khanacademy/perseus";

const {colors, borderRadius} = globalStyles;

type Props = MarkerType & {
    // The list of possible answer choices.
    choices: ReadonlyArray<string>;
    // Callback for when any of the marker props are changed.
    onChange: (marker: MarkerType) => void;
    // Callback to remove marker from the question image.
    onRemove: () => void;
};

type State = {
    // Whether answer choices dropdown is shown, controlled by the user clicking
    // on the marker icon.
    showDropdown: boolean;
};

export default class Marker extends React.Component<Props, State> {
    _marker: HTMLElement | null | undefined;

    constructor(props: Props) {
        super(props);

        this.state = {
            showDropdown: false,
        };
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClick, true);
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        const {answers} = this.props;

        // Exclude those answers that are no longer present in choices.
        const filteredAnswers = answers.filter((answer) =>
            nextProps.choices.includes(answer),
        );

        if (JSON.stringify(answers) !== JSON.stringify(filteredAnswers)) {
            // Update marker on the next frame when these props take affect.
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
            // eslint-disable-next-line no-restricted-syntax
            setTimeout(() => this.updateMarker({answers: filteredAnswers}));
        }
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick, true);
    }

    openDropdown() {
        this.setState({showDropdown: true});
    }

    updateMarker(props: any) {
        const {answers, label, onChange, x, y} = this.props;

        onChange({
            answers,
            label,
            x,
            y,
            // Overwrite with updated prop(s).
            ...props,
        });
    }

    handleClick: (e: MouseEvent) => void = (e: MouseEvent) => {
        const {showDropdown} = this.state;

        if (this._marker === e.target) {
            this.setState({showDropdown: !showDropdown});
        } else if (showDropdown) {
            // Close dropdown if click event was registered anywhere outside it.
            if (this._marker && !this._marker.contains(e.target as any)) {
                // Ensure other listeners are not triggered on click event that
                // closes the dropdown. A specific case this addresses is when
                // user clicks on question image to close dropdown, a new marker
                // will be created, this is bad for usability.
                e.stopPropagation();

                this.setState({showDropdown: false});
            }
        }
    };

    handleLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
        e,
    ) => {
        this.updateMarker({label: e.target.value});
    };

    handleSelectAnswer: (toggleAnswer: string) => void = (
        toggleAnswer: string,
    ) => {
        let {answers} = this.props;

        if (answers.includes(toggleAnswer)) {
            answers = answers.filter((answer) => answer !== toggleAnswer);
        } else {
            answers = [...answers, toggleAnswer];
        }

        this.updateMarker({answers});
    };

    render(): React.ReactNode {
        const {answers, choices, label, onRemove, x, y} = this.props;

        const {showDropdown} = this.state;

        return (
            <div
                className={css(
                    styles.marker,
                    answers.length > 0 && styles.markerWithAnswers,
                    showDropdown && styles.markerSelected,
                )}
                ref={(node) => (this._marker = node)}
                style={{
                    left: `${x}%`,
                    top: `${y}%`,
                }}
                title={
                    "Click to select marker answers or to delete marker. " +
                    "Repositioning marker is not implemented."
                }
            >
                {showDropdown && (
                    <div>
                        <div
                            className={css(
                                styles.dropdownBody,
                                styles.dropdownPositionWithArrow,
                            )}
                        >
                            <Option value="" onClick={() => onRemove()}>
                                Delete marker
                            </Option>

                            <hr className={css(styles.dividerHorizontal)} />

                            <OptionGroup
                                onSelected={this.handleSelectAnswer}
                                // TODO(WB-1096): make selectedValues immutable in wonder-blocks
                                // @ts-expect-error - TS2769 - No overload matches this call.
                                selectedValues={answers}
                            >
                                {choices.map((choice) => (
                                    <Option key={choice} value={choice}>
                                        {choice}
                                    </Option>
                                ))}
                            </OptionGroup>

                            <div className={css(styles.labelContainer)}>
                                <FormWrappedTextField
                                    placeholder="ARIA label (for screen readers)"
                                    onChange={this.handleLabelChange}
                                    value={label}
                                    width="100%"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    marker: {
        position: "absolute",

        boxSizing: "content-box",

        width: 16,
        height: 16,
        marginLeft: -8,
        marginTop: -8,

        cursor: "pointer",

        background:
            "linear-gradient(to bottom, rgba(33, 36, 44, 0.2), rgba(33, 36, 44, 0.5))",

        border: "solid 2px #ffffff",
        borderRadius: 16,

        boxShadow: "0 2px 10px 0 rgba(33, 36, 44, 0.1)",
    },

    markerSelected: {
        width: 28,
        height: 28,
        marginLeft: -12,
        marginTop: -12,

        border: "none",
        borderRadius: 28,

        // Render selected marker border as inset.
        "::before": {
            content: "''",
            display: "block",

            width: 20,
            height: 20,
            marginLeft: 2,
            marginTop: 2,

            border: "solid 2px #ffffff",
            borderRadius: 20,
        },
    },

    markerWithAnswers: {
        background: "#1865f2",
    },

    dropdownPositionWithArrow: {
        // Position dropdown to the top right of the marker.
        left: 46,
        bottom: -12,

        // With an arrow pointing left towards the marker.
        "::before": {
            content: "''",
            display: "block",
            position: "absolute",

            width: 0,
            height: 0,
            left: -16,
            bottom: 8,

            borderRight: `solid 16px ${colors.gray98}`,
            borderTop: "solid 16px transparent",
            borderBottom: "solid 16px transparent",
        },
    },

    labelContainer: {
        padding: 4,
    },

    dividerHorizontal: {
        height: 0,
        margin: 0,

        border: `solid ${colors.gray85}`,
        borderWidth: "0 0 1px",

        boxShadow: "none",
    },

    // TODO (josh): This should probably be its own component, rather than
    // sharing styles this way.
    dropdownBody: {
        position: "absolute",
        border: "solid 1px rgba(0, 0, 0, 0.1)",
        zIndex: globalConstants.zindexDropdown,
        color: colors.gray17,
        backgroundColor: colors.gray98,
        borderRadius: borderRadius,
        maxHeight: 320,
        cursor: "pointer",
    },
});
