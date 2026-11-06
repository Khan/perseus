import {lockedFigureColors, PolarMath} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import InfoTip from "../../components/info-tip";
import PerseusEditorAccordion from "../../components/perseus-editor-accordion";
import ScrolllessNumberTextField from "../../components/scrollless-number-text-field";
import {TypedSingleSelect} from "../../components/typed-single-select";
import ColorSelect from "../interactive-graph-editor/locked-figures/color-select";
import {labelSizeOptions} from "../interactive-graph-editor/locked-figures/line-stroke-select";
import LockedFigureSettingsActions from "../interactive-graph-editor/locked-figures/locked-figure-settings-actions";

import type {LockedLabelType} from "@khanacademy/perseus-core";

type Props = {
    label: LockedLabelType;
    editingDisabled: boolean;
    /**
     * A label of its own picks a color; a figure's labels take the
     * figure's color, as on interactive graph.
     */
    showColor: boolean;
    expanded: boolean;
    onToggle: (expanded: boolean) => void;
    onChangeProps: (changed: Partial<LockedLabelType>) => void;
    onRemove: () => void;
};

const rowStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xSmall_8,
} as const;
// A <label> is inline by default, so it needs the flex display too.
const labelRowStyle = {display: "flex", ...rowStyle} as const;

/** Two decimals is enough to read a position back without float noise. */
function round(value: number): number {
    return Math.round(value * 100) / 100;
}

/**
 * One TeX label's settings, mirroring interactive graph's locked label,
 * except that its position is given as a radius and an angle.
 */
export function PolarLockedLabelSettings(props: Props) {
    const {
        label,
        editingDisabled,
        showColor,
        expanded,
        onToggle,
        onChangeProps,
        onRemove,
    } = props;
    const {coord, text, color, size} = label;
    const {r, thetaDegrees} = PolarMath.toPolar(coord);
    const radius = round(r);
    const angle = round(thetaDegrees);

    return (
        <PerseusEditorAccordion
            expanded={expanded}
            onToggle={onToggle}
            header={
                <View style={rowStyle}>
                    <BodyText size="medium" weight="bold" tag="span">
                        {`Label (${radius}, ${angle}°)`}
                    </BodyText>
                    {text !== "" && (
                        <BodyText
                            size="medium"
                            weight="bold"
                            tag="span"
                            style={{color: lockedFigureColors[color]}}
                        >
                            {text}
                        </BodyText>
                    )}
                </View>
            }
        >
            <View style={{gap: spacing.xSmall_8}}>
                <View style={rowStyle}>
                    <BodyText tag="label" style={labelRowStyle}>
                        radius
                        <ScrolllessNumberTextField
                            value={radius}
                            min={0}
                            disabled={editingDisabled}
                            onChange={(next) =>
                                onChangeProps({
                                    coord: PolarMath.fromPolar(next, angle),
                                })
                            }
                            style={{width: 72}}
                        />
                    </BodyText>
                    <BodyText tag="label" style={labelRowStyle}>
                        angle (°)
                        <ScrolllessNumberTextField
                            value={angle}
                            disabled={editingDisabled}
                            onChange={(next) =>
                                onChangeProps({
                                    coord: PolarMath.fromPolar(radius, next),
                                })
                            }
                            style={{width: 72}}
                        />
                    </BodyText>
                </View>
                <View style={rowStyle}>
                    <BodyText tag="label" style={labelRowStyle}>
                        text
                        <TextField
                            value={text}
                            placeholder="ex. $r = 3$ or $\frac{1}{2}$"
                            disabled={editingDisabled}
                            onChange={(text) => onChangeProps({text})}
                        />
                    </BodyText>
                    <InfoTip>
                        Surround your text with $ for TeX.
                        <br />
                        Example: {`This circle has radius $\\frac{1}{2}$.`}
                        <br />
                        <br />
                        TeX matters for accessibility: a screen reader reads the
                        example as &quot;This circle has radius one-half&quot;.
                    </InfoTip>
                </View>
                <View style={rowStyle}>
                    {showColor && (
                        <ColorSelect
                            selectedValue={color}
                            editingDisabled={editingDisabled}
                            onChange={(color) => onChangeProps({color})}
                        />
                    )}
                    <BodyText tag="label" style={labelRowStyle}>
                        size
                        <TypedSingleSelect
                            options={labelSizeOptions}
                            selectedValue={size}
                            disabled={editingDisabled}
                            onChange={(size) => onChangeProps({size})}
                        />
                    </BodyText>
                </View>
                <LockedFigureSettingsActions
                    figureType="label"
                    editingDisabled={editingDisabled}
                    onRemove={onRemove}
                />
            </View>
        </PerseusEditorAccordion>
    );
}
