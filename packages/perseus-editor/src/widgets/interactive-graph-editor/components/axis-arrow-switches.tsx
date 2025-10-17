import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import React from "react";

import LabeledSwitch from "../../../components/labeled-switch";

import type {ShowAxisArrows} from "@khanacademy/perseus-core";

interface AxisArrowSwitchesProps {
    showAxisArrows: ShowAxisArrows;
    onChange: (axis: keyof ShowAxisArrows) => void;
    disabled: boolean;
}

export default function AxisArrowSwitches(props: AxisArrowSwitchesProps) {
    const {showAxisArrows, onChange, disabled} = props;

    return (
        <>
            <LabelSmall>Arrows</LabelSmall>
            <div
                className="perseus-widget-row"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: sizing.size_060,
                }}
            >
                <div className="perseus-widget-left-col">
                    <LabeledSwitch
                        label="x min"
                        labelSide="start"
                        size="small"
                        checked={showAxisArrows.xMin}
                        disabled={disabled}
                        onChange={() => onChange("xMin")}
                    />
                </div>
                <div className="perseus-widget-right-col">
                    <LabeledSwitch
                        label="y min"
                        labelSide="start"
                        size="small"
                        checked={showAxisArrows.yMin}
                        disabled={disabled}
                        onChange={() => onChange("yMin")}
                    />
                </div>
            </div>
            <div
                className="perseus-widget-row"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: sizing.size_060,
                }}
            >
                <div className="perseus-widget-left-col">
                    <LabeledSwitch
                        label="x max"
                        labelSide="start"
                        size="small"
                        checked={showAxisArrows.xMax}
                        disabled={disabled}
                        onChange={() => onChange("xMax")}
                    />
                </div>
                <div className="perseus-widget-right-col">
                    <LabeledSwitch
                        label="y max"
                        labelSide="start"
                        size="small"
                        checked={showAxisArrows.yMax}
                        disabled={disabled}
                        onChange={() => onChange("yMax")}
                    />
                </div>
            </div>
        </>
    );
}
