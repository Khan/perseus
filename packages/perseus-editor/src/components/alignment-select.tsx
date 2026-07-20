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
    // Keys and labels are the same alignment string. `ValueT` is `string` here
    // (the options come from a prop), so no narrowing is gained; the value is
    // re-wrapped into a synthetic event below to match the parent's onChange.
    const alignmentOptions: Record<string, string> = Object.fromEntries(
        supportedAlignments.map((alignment) => [alignment, alignment]),
    );
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
                selectedValue={widgetInfo.alignment ?? "default"}
                disabled={isEditingDisabled}
                options={alignmentOptions}
                onChange={(value) => {
                    // Create a synthetic-like event to match the existing
                    // onChange signature expected by WidgetEditor
                    // eslint-disable-next-line no-restricted-syntax
                    const syntheticEvent = {
                        currentTarget: {value},
                    } as React.ChangeEvent<HTMLSelectElement>;
                    onChange(syntheticEvent);
                }}
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
