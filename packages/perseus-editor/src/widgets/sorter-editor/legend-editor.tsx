import {
    SORTER_MAX_HORIZONTAL_CARDS,
    type SorterLegend,
    type SorterLegendCap,
    type SorterVariant,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import * as React from "react";

import InfoTip from "../../components/info-tip";
import {TypedSingleSelect} from "../../components/typed-single-select";

import styles from "./legend-editor.module.css";
import LegendSideEditor from "./legend-side-editor";

const positionOptions = {
    above: "Above",
    below: "Below",
} satisfies Record<SorterLegend["position"], string>;

const defaultCaps = {
    scale: "arrow",
    timeline: "bar",
} satisfies Record<SorterVariant, SorterLegendCap>;

// Not in the sorter's default options, which would add a legend to every
// existing sorter.
export function getDefaultLegend(variant: SorterVariant): SorterLegend {
    return {
        startCap: defaultCaps[variant],
        endCap: defaultCaps[variant],
        startLabel: "",
        endLabel: "",
        ariaLabel: "",
        position: "below",
    };
}

type Props = {
    legend?: SorterLegend;
    variant: SorterVariant;
    displaysVertically: boolean;
    onChange: (legend: SorterLegend) => void;
};

/**
 * An editor for the sorter's legend: its labels, caps, position and
 * description.
 */
function LegendEditor({legend, variant, displaysVertically, onChange}: Props) {
    // Until the author edits a legend field, the fields show the defaults
    // without adding a legend to the content.
    const displayedLegend = legend ?? getDefaultLegend(variant);

    function handleChange(changes: Partial<SorterLegend>) {
        onChange({...displayedLegend, ...changes});
    }

    return (
        <View className={styles.legend}>
            <div className={styles.legendEnds}>
                <LegendSideEditor
                    side="Start"
                    label={displayedLegend.startLabel}
                    cap={displayedLegend.startCap}
                    onLabelChange={(startLabel) => handleChange({startLabel})}
                    onCapChange={(startCap) => handleChange({startCap})}
                />
                <LegendSideEditor
                    side="End"
                    label={displayedLegend.endLabel}
                    cap={displayedLegend.endCap}
                    onLabelChange={(endLabel) => handleChange({endLabel})}
                    onCapChange={(endCap) => handleChange({endCap})}
                />
            </div>
            <LabeledField
                label="Position"
                field={
                    <TypedSingleSelect
                        options={positionOptions}
                        selectedValue={displayedLegend.position}
                        disabled={displaysVertically}
                        onChange={(position) => handleChange({position})}
                    />
                }
                contextLabel={
                    displaysVertically && (
                        <InfoTip>
                            <p>
                                Position only applies to sorters that display
                                horizontally. This sorter displays vertically
                                because of its layout or because it has more
                                than {SORTER_MAX_HORIZONTAL_CARDS} cards.
                            </p>
                        </InfoTip>
                    )
                }
                styles={{
                    contextLabel: {
                        marginInlineEnd: "auto",
                    },
                }}
            />
            <LabeledField
                label="Description"
                field={
                    <TextField
                        value={displayedLegend.ariaLabel}
                        aria-required={true}
                        onChange={(ariaLabel) => handleChange({ariaLabel})}
                    />
                }
                contextLabel={
                    <>
                        Required{" "}
                        <InfoTip>
                            Describe the order of the cards, and include the
                            words from the start and end labels. For example:
                            “Interest rates, lowest at the start to highest at
                            the end.” Write any math in words, since screen
                            readers read this text as it’s typed.
                        </InfoTip>
                    </>
                }
                styles={{
                    contextLabel: {
                        marginInlineEnd: "auto",
                    },
                }}
            />
        </View>
    );
}

export default LegendEditor;
