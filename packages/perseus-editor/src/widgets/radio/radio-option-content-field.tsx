import Button from "@khanacademy/wonder-blocks-button";
import {TextField, TextArea} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";
import {ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import pencilIcon from "@phosphor-icons/core/bold/pencil-bold.svg";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import * as React from "react";

import styles from "./radio-option-content-field.module.css";
import {RadioOptionImageEditModal} from "./radio-option-image-edit-modal";

type Props = {
    index: number;
    inputRef: React.RefObject<HTMLTextAreaElement>;
    content: string;
    isNoneOfTheAbove: boolean;
    inModal?: boolean;
    onContentChange: (choiceIndex: number, newContent: string) => void;
};

const RadioOptionContentField = (props: Props) => {
    const {
        index,
        inputRef,
        content,
        isNoneOfTheAbove,
        inModal,
        onContentChange,
    } = props;

    const [addingImage, setAddingImage] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState("");
    const [imageAltText, setImageAltText] = React.useState("");

    // Add the image markdown where the caret currently is in the textarea.
    const handleAddImage = (
        choiceIndex: number,
        imageUrl: string,
        imageAltText: string,
    ) => {
        const caretPosition = inputRef.current?.selectionStart;
        const newContent = `${content.slice(0, caretPosition)} ![${imageAltText}](${imageUrl}) ${content.slice(caretPosition)}`;
        onContentChange(choiceIndex, newContent);
    };

    return (
        <>
            <HeadingXSmall tag="label">
                Content
                <TextArea
                    ref={inputRef}
                    value={isNoneOfTheAbove ? "None of the above" : content}
                    disabled={isNoneOfTheAbove}
                    placeholder="Type a choice here..."
                    // This unfortunately doesn't match the dynamic resizing
                    // behavior that it had before, but we should be able to add
                    // that in after WB-1843 is completed.
                    resizeType="vertical"
                    onChange={(value) => {
                        onContentChange(index, value);
                    }}
                    onPaste={(e) => {
                        const imageURL = e.clipboardData.getData("text");

                        if (
                            imageURL.includes("cdn.kastatic.org") ||
                            imageURL.includes("graphie")
                        ) {
                            e.preventDefault();
                            handleAddImage(index, imageURL, "");
                        }
                    }}
                />
            </HeadingXSmall>
            {!isNoneOfTheAbove && (
                <span className={styles.rowDirection}>
                    {!addingImage && (
                        <Button
                            startIcon={plusIcon}
                            size="small"
                            kind="tertiary"
                            style={{alignSelf: "flex-start"}}
                            onClick={() => {
                                setAddingImage(true);
                            }}
                        >
                            Add image
                        </Button>
                    )}
                    <Spring />
                    {!inModal && (
                        <ModalLauncher
                            modal={
                                <RadioOptionImageEditModal
                                    content={content}
                                    choiceIndex={index}
                                    onContentChange={onContentChange}
                                />
                            }
                        >
                            {({openModal}) => (
                                <Button
                                    startIcon={pencilIcon}
                                    size="small"
                                    kind="tertiary"
                                    style={{alignSelf: "flex-start"}}
                                    onClick={openModal}
                                >
                                    Edit images
                                </Button>
                            )}
                        </ModalLauncher>
                    )}
                </span>
            )}
            {addingImage && !isNoneOfTheAbove && (
                <>
                    <HeadingXSmall tag="label">
                        Image URL
                        <TextField
                            value={imageUrl}
                            placeholder="cdn.kastatic.org/..."
                            onChange={(value) => {
                                setImageUrl(value);
                            }}
                        />
                    </HeadingXSmall>
                    <HeadingXSmall tag="label">
                        Image Alt Text
                        <TextArea
                            value={imageAltText}
                            placeholder="The Moon appears as a bright gray circle in black space..."
                            onChange={(value) => {
                                setImageAltText(value);
                            }}
                        />
                    </HeadingXSmall>
                    <Strut size={spacing.small_12} />
                    <span className={styles.rowDirection}>
                        <Button
                            size="small"
                            style={{alignSelf: "flex-start"}}
                            onClick={() => {
                                setAddingImage(false);
                                setImageUrl("");
                                setImageAltText("");
                                handleAddImage(index, imageUrl, imageAltText);
                            }}
                        >
                            Save image
                        </Button>
                        <Spring />
                        <IconButton
                            icon={xIcon}
                            size="small"
                            kind="tertiary"
                            onClick={() => {
                                setAddingImage(false);
                                setImageUrl("");
                                setImageAltText("");
                            }}
                        />
                    </span>
                </>
            )}
        </>
    );
};

export default RadioOptionContentField;
