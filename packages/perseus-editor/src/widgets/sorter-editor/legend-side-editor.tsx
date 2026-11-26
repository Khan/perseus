import {TextField} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import * as React from "react";

import InfoTip from "../../components/info-tip";
import {TypedSingleSelect} from "../../components/typed-single-select";

import styles from "./legend-side-editor.module.css";

import type {SorterLegendCap} from "@khanacademy/perseus-core";

const capOptions = {
    arrow: "Arrow",
    bar: "Bar",
    none: "None",
} satisfies Record<SorterLegendCap, string>;

type Props = {
    side: "Start" | "End";
    label: string;
    cap: SorterLegendCap;
    onLabelChange: (label: string) => void;
    onCapChange: (cap: SorterLegendCap) => void;
};

function LegendSideEditor({
    side,
    label,
    cap,
    onLabelChange,
    onCapChange,
}: Props) {
    return (
        <div className={styles.legendSide}>
            <LabeledField
                label={`${side} label`}
                field={<TextField value={label} onChange={onLabelChange} />}
                contextLabel={
                    <InfoTip>
                        Labels can include text and TeX, but not Markdown. Wrap
                        TeX in dollar signs, for example $x^2$. To show a dollar
                        sign, type \$.
                    </InfoTip>
                }
                styles={{
                    contextLabel: {
                        marginInlineEnd: "auto",
                    },
                }}
            />
            <LabeledField
                label={`${side} cap`}
                field={
                    <TypedSingleSelect
                        options={capOptions}
                        selectedValue={cap}
                        onChange={onCapChange}
                    />
                }
            />
        </div>
    );
}

export default LegendSideEditor;
