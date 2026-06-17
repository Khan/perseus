import {components} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import pencilCircle from "@phosphor-icons/core/regular/pencil-circle.svg";
import * as React from "react";

import styles from "./locked-figure-aria.module.css";

const {InfoTip} = components;

interface Props {
    ariaLabel: string | undefined;
    /**
     * The async function that generates the prepopulated aria label
     * for the locked figure with math details converted to spoken words.
     */
    getPrepopulatedAriaLabel: () => Promise<string>;
    onChangeProps: (props: {ariaLabel?: string | undefined}) => void;
}

function LockedFigureAria(props: Props) {
    const {ariaLabel, getPrepopulatedAriaLabel, onChangeProps} = props;
    const id = React.useId();
    const ariaLabelId = `aria-label-${id}`;

    const [loading, setLoading] = React.useState(false);

    return (
        <View className={styles.container}>
            <View className={styles.row}>
                <BodyText tag="label" htmlFor={ariaLabelId}>
                    Aria label
                </BodyText>
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
            <BodyText size="xsmall" className={styles.caption}>
                The figure is hidden from screen readers if this field is left
                blank.
            </BodyText>
            <TextArea
                id={ariaLabelId}
                value={loading ? "Loading..." : ariaLabel ?? ""}
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
                className={styles.button}
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

export default LockedFigureAria;
