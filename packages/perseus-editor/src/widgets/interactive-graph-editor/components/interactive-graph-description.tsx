import {View} from "@khanacademy/wonder-blocks-core";
import {TextArea, TextField} from "@khanacademy/wonder-blocks-form";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import Heading from "../../../components/heading";

import styles from "./interactive-graph-description.module.css";

import type {Props as EditorProps} from "../interactive-graph-editor";

interface Props {
    ariaLabelValue: string;
    ariaDescriptionValue: string;
    onChange: (graphProps: Partial<EditorProps>) => void;
}

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
                <View className={styles.container}>
                    <BodyText size="xsmall" className={styles.caption}>
                        Use these fields to describe the graph as a whole. These
                        are used by screen readers to describe content to users
                        who may be visually impaired.
                    </BodyText>

                    <BodyText size="xsmall" className={styles.caption}>
                        Aria description required when using locked figures.
                        Locked figures aren't automatically described.
                    </BodyText>

                    <BodyText size="medium" weight="bold" tag="label">
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
                            style={{marginTop: sizing.size_040}}
                        />
                    </BodyText>
                    <BodyText
                        size="medium"
                        weight="bold"
                        tag="label"
                        htmlFor={descriptionTextAreaId}
                    >
                        Description
                    </BodyText>
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
