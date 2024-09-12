import {View} from "@khanacademy/wonder-blocks-core";
import {TextArea, TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelXSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import Heading from "./heading";

import type {Props as EditorProps} from "../widgets/interactive-graph-editor/interactive-graph-editor";

type Props = {
    ariaLabelValue: string;
    ariaDescriptionValue: string;
    onChange: (graphProps: Partial<EditorProps>) => void;
};

export default function InteractiveGraphDescription(props: Props) {
    const {ariaLabelValue, ariaDescriptionValue, onChange} = props;

    const [isOpen, setIsOpen] = React.useState(true);

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
                        who are visually impaired.
                    </LabelXSmall>
                    <LabelLarge tag="label">
                        Title
                        <TextField
                            value={ariaLabelValue}
                            onChange={(newValue) =>
                                onChange({fullGraphAriaLabel: newValue})
                            }
                            style={styles.spaceAbove}
                        />
                    </LabelLarge>
                    <Strut size={spacing.small_12} />
                    <LabelLarge tag="label">
                        Description
                        <TextArea
                            rows={8}
                            resizeType="vertical"
                            value={ariaDescriptionValue}
                            onChange={(newValue) =>
                                onChange({
                                    fullGraphAriaDescription: newValue,
                                })
                            }
                            style={styles.spaceAbove}
                        />
                    </LabelLarge>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    caption: {
        color: color.offBlack64,
        paddingTop: spacing.xxSmall_6,
        paddingBottom: spacing.xxSmall_6,
    },
    spaceAbove: {
        marginTop: spacing.xxxSmall_4,
    },
});
