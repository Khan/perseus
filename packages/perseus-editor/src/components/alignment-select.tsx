import {components} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useId} from "react";

import {TypedSingleSelect} from "./typed-single-select";
import {alignmentInfoMap} from "./util";

import type {Alignment, PerseusWidget} from "@khanacademy/perseus-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const {InfoTip} = components;

interface Props {
    supportedAlignments: ReadonlyArray<Alignment>;
    widgetInfo: PerseusWidget;
    isEditingDisabled: boolean;
    onChange: (newAlignment: Alignment) => void;
    style?: StyleType;
}

export function AlignmentSelect({
    supportedAlignments,
    widgetInfo,
    isEditingDisabled,
    onChange,
    style,
}: Props) {
    const labelId = useId();
    return (
        <View
            style={[
                {
                    flexDirection: "row",
                    alignItems: "center",
                    gap: sizing.size_080,
                },
                style,
            ]}
        >
            <BodyText id={labelId} tag="span">
                Alignment
            </BodyText>
            <TypedSingleSelect
                aria-labelledby={labelId}
                // TODO(benchristel): properly type widgetInfo.alignment and
                //  remove this cast.
                // eslint-disable-next-line no-restricted-syntax
                selectedValue={(widgetInfo.alignment as Alignment) ?? "default"}
                disabled={isEditingDisabled}
                options={{
                    default:
                        supportedAlignments.includes("default") && "default",
                    block: supportedAlignments.includes("block") && "block",
                    "inline-block":
                        supportedAlignments.includes("inline-block") &&
                        "inline-block",
                    inline: supportedAlignments.includes("inline") && "inline",
                    "wrap-left":
                        supportedAlignments.includes("wrap-left") &&
                        "wrap-left",
                    "wrap-right":
                        supportedAlignments.includes("wrap-right") &&
                        "wrap-right",
                    "full-width":
                        supportedAlignments.includes("full-width") &&
                        "full-width",
                }}
                onChange={onChange}
                placeholder="Select alignment"
                style={styles.singleSelectShort}
            />
            <InfoTip>
                <ul>
                    {supportedAlignments.map((alignment, index) => (
                        <li
                            key={alignment}
                            style={{
                                marginBlockEnd:
                                    index < supportedAlignments.length - 1
                                        ? sizing.size_240
                                        : 0,
                            }}
                        >
                            {alignmentInfoMap[alignment]}
                        </li>
                    ))}
                </ul>
            </InfoTip>
        </View>
    );
}

const styles = StyleSheet.create({
    singleSelectShort: {
        height: sizing.size_260,
    },
});
