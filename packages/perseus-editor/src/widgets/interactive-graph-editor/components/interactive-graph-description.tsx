import {View} from "@khanacademy/wonder-blocks-core";
import {TextArea, TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelXSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import Heading from "../../../components/heading";

import type {Props as EditorProps} from "../interactive-graph-editor";

type Props = {
    ariaLabelValue: string;
    ariaDescriptionValue: string;
    onChange: (graphProps: Partial<EditorProps>) => void;
};

export default function InteractiveGraphDescription(props: Props) {
    const {ariaLabelValue, ariaDescriptionValue, onChange} = props;

    const [isOpen, setIsOpen] = React.useState(true);

    const uniqueId = React.useId();
    const descriptionTextAreaId = `${uniqueId}-description-textarea`;

    return (
        <>
            <Heading
                title="Description"
                isCollapsible={true}
                isOpen={isOpen}
                onToggle={setIsOpen}
            />
            {isOpen && (
                <View>
                    <LabelXSmall style={styles.caption}>
                        Use these fields to describe the graph as a whole. These
                        are used by screen readers to describe content to users
                        who may be visually impaired.
                    </LabelXSmall>
                    <LabelLarge tag="label">
                        Title
                        <TextField
                            value={ariaLabelValue}
                            onChange={(newValue) =>
                                onChange({
                                    fullGraphAriaLabel:
                                        // Save as undefined if the new value
                                        // is an empty string.
                                        newValue || undefined,
                                })
                            }
                            style={styles.spaceAbove}
                        />
                    </LabelLarge>
                    <Strut size={spacing.small_12} />
                    <LabelLarge tag="label" htmlFor={descriptionTextAreaId}>
                        Description
                    </LabelLarge>
                    <TextArea
                        id={descriptionTextAreaId}
                        value={ariaDescriptionValue}
                        onChange={(newValue) =>
                            onChange({
                                fullGraphAriaDescription:
                                    // Save as undefined if the new value
                                    // is an empty string.
                                    newValue || undefined,
                            })
                        }
                        autoResize={true}
                    />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    caption: {
        color: semanticColor.core.foreground.neutral.subtle,
        paddingTop: spacing.xxSmall_6,
        paddingBottom: spacing.xxSmall_6,
    },
    spaceAbove: {
        marginTop: spacing.xxxSmall_4,
    },
});
