import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import * as React from "react";

import {AutoResizingTextArea} from "./auto-resizing-text-area";
import ImageEditorAccordion from "./image-editor-accordion";
import styles from "./radio-editor.module.css";
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
    const uniqueId = React.useId();
    const contentTextAreaId = `${uniqueId}-content-textarea`;
    const imageUrlTextAreaId = `${uniqueId}-image-url-textarea`;
    const imageAltTextTextAreaId = `${uniqueId}-image-alt-text-textarea`;

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
        const [niceContent, images] = setNiceContentAndImages(content ?? "");
        setNiceContent(niceContent);
        setImages(images);
    }, [content]);

    // Add the image markdown where the caret currently is in the textarea.
    const handleAddImage = (
        choiceIndex: number,
        imageUrl: string,
        imageAltText: string,
    ) => {
        const newContent = `${content}\n![${imageAltText}](${imageUrl})`;
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

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const imageURL = e.clipboardData.getData("text");
        if (
            imageURL.includes("cdn.kastatic.org") ||
            imageURL.includes("graphie")
        ) {
            e.preventDefault();
            handleAddImage(choiceIndex, imageURL, "");
        }
    };

    if (isNoneOfTheAbove) {
        return (
            <>
                <HeadingXSmall tag="label" htmlFor={contentTextAreaId}>
                    Content
                </HeadingXSmall>
                <AutoResizingTextArea
                    id={contentTextAreaId}
                    value="None of the above"
                    disabled={true}
                    onChange={() => {}}
                />
            </>
        );
    }

    return (
        <>
            <HeadingXSmall
                tag="label"
                htmlFor={contentTextAreaId}
                style={{marginBlockEnd: sizing.size_040}}
            >
                Content
            </HeadingXSmall>
            <AutoResizingTextArea
                id={contentTextAreaId}
                value={niceContent}
                placeholder="Type a choice here..."
                onChange={(value) => {
                    handleContentChange(choiceIndex, value);
                }}
                onPaste={handlePaste}
            />

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
                <div className={styles.imageEditorContainer}>
                    <IconButton
                        icon={xIcon}
                        size="small"
                        kind="tertiary"
                        onClick={() => {
                            setAddingImage(false);
                            setImageUrl("");
                            setImageAltText("");
                        }}
                        style={{position: "absolute", top: 4, right: 4}}
                    />
                    <HeadingXSmall
                        tag="label"
                        htmlFor={imageUrlTextAreaId}
                        style={{marginBlockEnd: sizing.size_040}}
                    >
                        Image URL
                    </HeadingXSmall>
                    <AutoResizingTextArea
                        id={imageUrlTextAreaId}
                        value={imageUrl}
                        placeholder="cdn.kastatic.org/..."
                        onChange={(value) => {
                            setImageUrl(value);
                        }}
                        style={{marginBlockEnd: sizing.size_080}}
                    />
                    <HeadingXSmall
                        tag="label"
                        htmlFor={imageAltTextTextAreaId}
                        style={{marginBlockEnd: sizing.size_040}}
                    >
                        Image Alt Text
                    </HeadingXSmall>
                    <AutoResizingTextArea
                        id={imageAltTextTextAreaId}
                        value={imageAltText}
                        placeholder="The Moon appears as a bright gray circle in black space..."
                        onChange={(value) => {
                            setImageAltText(value);
                        }}
                    />
                    <Button
                        size="small"
                        style={{
                            alignSelf: "flex-end",
                            marginBlockStart: 8,
                        }}
                        onClick={() => {
                            setAddingImage(false);
                            setImageUrl("");
                            setImageAltText("");
                            handleAddImage(choiceIndex, imageUrl, imageAltText);
                        }}
                    >
                        Save image
                    </Button>
                </div>
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
        </>
    );
};
