import {components} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {sizing, spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useId} from "react";

import {alignmentInfoMap} from "./util";

import type {Alignment, PerseusWidget} from "@khanacademy/perseus-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const {InfoTip} = components;

interface Props {
    supportedAlignments: ReadonlyArray<Alignment>;
    widgetInfo: PerseusWidget;
    isEditingDisabled: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
                },
                style,
            ]}
        >
            <BodyText id={labelId} tag="span">
                Alignment
            </BodyText>
            <Strut size={spacing.xSmall_8} />
            <SingleSelect
                aria-labelledby={labelId}
                selectedValue={widgetInfo.alignment ?? "default"}
                disabled={isEditingDisabled}
                onChange={(value) => {
                    // Create a synthetic-like event to match the existing
                    // onChange signature expected by WidgetEditor
                    const syntheticEvent = {
                        currentTarget: {value},
                    } as React.ChangeEvent<HTMLSelectElement>;
                    onChange(syntheticEvent);
                }}
                placeholder="Select alignment"
                style={styles.singleSelectShort}
            >
                {supportedAlignments.map((alignment) => (
                    <OptionItem
                        key={alignment}
                        value={alignment}
                        label={alignment}
                    />
                ))}
            </SingleSelect>
            <Strut size={spacing.xxSmall_6} />
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
        height: 26,
    },
});
