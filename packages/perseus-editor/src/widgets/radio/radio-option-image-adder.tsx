import Button from "@khanacademy/wonder-blocks-button";
import {TextField, TextArea} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import * as React from "react";

type Props = {
    index: number;
    inputRef: React.RefObject<HTMLTextAreaElement>;
    content: string;
    onContentChange: (choiceIndex: number, newContent: string) => void;
};

export const RadioOptionImageAdder = (props: Props) => {
    const {index, inputRef, content, onContentChange} = props;

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
            {addingImage && (
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
                </>
            )}
        </>
    );
};
