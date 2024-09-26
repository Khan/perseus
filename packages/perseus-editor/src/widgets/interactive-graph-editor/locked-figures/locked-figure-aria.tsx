import {components} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import pencilCircle from "@phosphor-icons/core/regular/pencil-circle.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

const {InfoTip} = components;

type Props = {
    ariaLabel: string | undefined;
    prePopulatedAriaLabel: string;
    onChangeProps: (props: {ariaLabel?: string | undefined}) => void;
};

function LockedFigureAria(props: Props) {
    const {ariaLabel, prePopulatedAriaLabel, onChangeProps} = props;

    return (
        <View>
            <LabeledTextField
                label={
                    <View style={styles.row}>
                        <LabelMedium>Aria label</LabelMedium>
                        <Spring />
                        <InfoTip>
                            Aria label is used by screen readers to describe
                            content to users who may be visually impaired.{" "}
                            <br />
                            <br />
                            Populating this field will make it so that users can
                            use a screen reader to navigate to this point and
                            hear the description.
                            <br />
                            <br />
                            If you leave this field blank, the point will be
                            hidden from screen readers. Users will not be able
                            to navigate to this point using a screen reader.
                        </InfoTip>
                    </View>
                }
                description={`The figure is hidden from screen readers
                            if this field is left blank.`}
                value={ariaLabel ?? ""}
                onChange={(newValue) => {
                    onChangeProps({
                        // Save as undefined if the field is empty.
                        ariaLabel: newValue || undefined,
                    });
                }}
                placeholder="Ex. Point at (x, y)"
                style={styles.ariaLabelTextField}
            />

            <Button
                kind="tertiary"
                startIcon={pencilCircle}
                style={styles.button}
                onClick={() => {
                    onChangeProps({
                        ariaLabel: prePopulatedAriaLabel,
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
    ariaLabelTextField: {
        marginTop: spacing.xSmall_8,
    },
});

export default LockedFigureAria;
