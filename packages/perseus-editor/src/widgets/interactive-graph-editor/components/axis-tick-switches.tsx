import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import React from "react";

import LabeledSwitch from "../../../components/labeled-switch";

import type {ShowAxisTicks} from "@khanacademy/perseus-core";

interface AxisTickSwitchesProps {
    showAxisTicks: ShowAxisTicks;
    onChange: (axis: keyof ShowAxisTicks) => void;
    disabled: boolean;
}

export default function AxisTickSwitches(props: AxisTickSwitchesProps) {
    const {showAxisTicks, onChange, disabled} = props;

    return (
        <>
            <BodyText size="small">Ticks</BodyText>
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
                        label="x-axis"
                        labelSide="start"
                        size="small"
                        checked={showAxisTicks.x}
                        disabled={disabled}
                        onChange={() => onChange("x")}
                    />
                </div>
                <div className="perseus-widget-right-col">
                    <LabeledSwitch
                        label="y-axis"
                        labelSide="start"
                        size="small"
                        checked={showAxisTicks.y}
                        disabled={disabled}
                        onChange={() => onChange("y")}
                    />
                </div>
            </div>
        </>
    );
}
