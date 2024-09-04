import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelXSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import Heading from "./heading";

type Props = {
    ariaLabelValue: string;
    ariaDescribedbyValue: string;
    onChange: (type: "label" | "description", value: string) => void;
};

export default function InteractiveGraphDescription(props: Props) {
    const {ariaLabelValue, ariaDescribedbyValue, onChange} = props;

    const [isOpen, setIsOpen] = React.useState(true);

    function handleChange(type: "label" | "description", newValue: string) {
        onChange(type, newValue);
    }

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
                    <LabelLarge>
                        Title
                        <TextField
                            value={ariaLabelValue}
                            onChange={(newValue) =>
                                handleChange("label", newValue)
                            }
                        />
                    </LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    <LabelLarge>
                        Description
                        {/* TODO: Change this to a WB TextArea */}
                        <TextField
                            value={ariaDescribedbyValue}
                            onChange={(newValue) =>
                                handleChange("description", newValue)
                            }
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
});
