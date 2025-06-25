import Button from "@khanacademy/wonder-blocks-button";
import {TextField, TextArea} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import * as React from "react";

import ImageEditorAccordion from "./image-editor-accordion";
import styles from "./radio-option-content-and-image-editor.module.css";
import {
    setContentFromNiceContentAndImages,
    setNiceContentAndImages,
} from "./utils";

type Props = {
    isNoneOfTheAbove: boolean;
    content: string;
    choiceIndex: number;
    onContentChange: (choiceIndex: number, content: string) => void;
};

export const RadioOptionContentAndImageEditor = (props: Props) => {
    const {content, choiceIndex, onContentChange, isNoneOfTheAbove} = props;

    const inputRef = React.useRef<HTMLTextAreaElement>(null);

    // States for updating content and images
    const [niceContent, setNiceContent] = React.useState<string>("");
    const [images, setImages] = React.useState<
        {url: string; altText: string}[]
    >([]);

    // States for adding an image
    const [addingImage, setAddingImage] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState("");
    const [imageAltText, setImageAltText] = React.useState("");

    React.useEffect(() => {
        const [niceContent, images] = setNiceContentAndImages(content);
        setNiceContent(niceContent);
        setImages(images);
    }, [content]);

    // Add the image markdown where the caret currently is in the textarea.
    const handleAddImage = (
        choiceIndex: number,
        imageUrl: string,
        imageAltText: string,
    ) => {
        const caretPosition = inputRef.current?.selectionStart;
        const newContent = `${content.slice(0, caretPosition)}![${imageAltText}](${imageUrl})${content.slice(caretPosition)}`;
        onContentChange(choiceIndex, newContent);
    };

    const handleDeleteImage = (imageIndex: number) => {
        const substr = `![Image ${imageIndex + 1}]`;
        const newNiceContent = niceContent.replace(substr, "");
        setNiceContent(newNiceContent);

        const newContent = setContentFromNiceContentAndImages(
            newNiceContent,
            images,
        );
        onContentChange(choiceIndex, newContent);
    };

    const handleUpdateImage = (
        imageIndex: number,
        url: string,
        altText: string,
    ) => {
        const newImages = [...images];
        newImages[imageIndex] = {url, altText};
        setImages(newImages);

        const newNiceContent = setContentFromNiceContentAndImages(
            niceContent,
            newImages,
        );
        setNiceContent(newNiceContent);

        const newContent = setContentFromNiceContentAndImages(
            newNiceContent,
            newImages,
        );
        onContentChange(choiceIndex, newContent);
    };

    const handleContentChange = (
        choiceIndex: number,
        newNiceContent: string,
    ) => {
        setNiceContent(newNiceContent);

        const newContent = setContentFromNiceContentAndImages(
            newNiceContent,
            images,
        );
        onContentChange(choiceIndex, newContent);
    };

    if (isNoneOfTheAbove) {
        return (
            <HeadingXSmall tag="label">
                Content
                <TextArea
                    value="None of the above"
                    disabled={true}
                    onChange={() => {}}
                />
            </HeadingXSmall>
        );
    }

    return (
        <div style={{marginBlockEnd: sizing.size_120}}>
            <HeadingXSmall tag="label">
                Content
                <TextArea
                    ref={inputRef}
                    value={niceContent}
                    placeholder="Type a choice here..."
                    // This unfortunately doesn't match the dynamic resizing
                    // behavior that it had before, but we should be able to add
                    // that in after WB-1843 is completed.
                    resizeType="vertical"
                    onChange={(value) => {
                        handleContentChange(choiceIndex, value);
                    }}
                    onPaste={(e) => {
                        const imageURL = e.clipboardData.getData("text");

                        if (
                            imageURL.includes("cdn.kastatic.org") ||
                            imageURL.includes("graphie")
                        ) {
                            e.preventDefault();
                            handleAddImage(choiceIndex, imageURL, "");
                        }
                    }}
                />
            </HeadingXSmall>

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
                    <HeadingXSmall
                        tag="label"
                        style={{marginBlockEnd: sizing.size_080}}
                    >
                        Image Alt Text
                        <TextArea
                            value={imageAltText}
                            placeholder="The Moon appears as a bright gray circle in black space..."
                            onChange={(value) => {
                                setImageAltText(value);
                            }}
                        />
                    </HeadingXSmall>
                    <span className={styles.rowDirection}>
                        <Button
                            size="small"
                            style={{alignSelf: "flex-start"}}
                            onClick={() => {
                                setAddingImage(false);
                                setImageUrl("");
                                setImageAltText("");
                                handleAddImage(
                                    choiceIndex,
                                    imageUrl,
                                    imageAltText,
                                );
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
            {images?.map((image, imageIndex) => (
                <ImageEditorAccordion
                    key={`${imageIndex}-${image.url}`}
                    image={image}
                    imageIndex={imageIndex}
                    onDeleteImage={handleDeleteImage}
                    onUpdateImage={handleUpdateImage}
                />
            )) ?? null}
        </div>
    );
};
