import {components} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelXSmall} from "@khanacademy/wonder-blocks-typography";
import pencilCircle from "@phosphor-icons/core/regular/pencil-circle.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

const {InfoTip} = components;

type Props = {
    ariaLabel: string | undefined;
    /**
     * The async function that generates the prepopulated aria label
     * for the locked figure with math details converted to spoken words.
     */
    getPrepopulatedAriaLabel: () => Promise<string>;
    onChangeProps: (props: {ariaLabel?: string | undefined}) => void;
};

function LockedFigureAria(props: Props) {
    const {ariaLabel, getPrepopulatedAriaLabel, onChangeProps} = props;
    const id = React.useId();
    const ariaLabelId = `aria-label-${id}`;

    const [loading, setLoading] = React.useState(false);

    return (
        <View>
            <Strut size={spacing.xSmall_8} />
            <View style={styles.row}>
                <LabelMedium tag="label" htmlFor={ariaLabelId}>
                    Aria label
                </LabelMedium>
                <Spring />
                <InfoTip>
                    Aria label is used by screen readers to describe content to
                    users who may be visually impaired. <br />
                    <br />
                    Populating this field will make it so that users can use a
                    screen reader to navigate to this point and hear the
                    description.
                    <br />
                    <br />
                    If you leave this field blank, the point will be hidden from
                    screen readers. Users will not be able to navigate to this
                    point using a screen reader.
                </InfoTip>
            </View>
            <Strut size={spacing.xxSmall_6} />
            <LabelXSmall style={styles.caption}>
                The figure is hidden from screen readers if this field is left
                blank.
            </LabelXSmall>
            <Strut size={spacing.xxSmall_6} />
            <TextArea
                id={ariaLabelId}
                value={loading ? "Loading..." : (ariaLabel ?? "")}
                onChange={(newValue) => {
                    onChangeProps({
                        // Save as undefined if the field is empty.
                        ariaLabel: newValue || undefined,
                    });
                }}
                placeholder="Ex. Point at (x, y)"
                rows={1}
                resizeType="vertical"
            />

            <Button
                kind="tertiary"
                startIcon={pencilCircle}
                style={styles.button}
                onClick={() => {
                    setLoading(true);
                    getPrepopulatedAriaLabel().then((ariaLabel) => {
                        setLoading(false);
                        onChangeProps({ariaLabel});
                    });
                }}
            >
                Auto-generate
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        alignSelf: "start",
    },
    caption: {
        color: color.offBlack64,
    },
});

export default LockedFigureAria;
