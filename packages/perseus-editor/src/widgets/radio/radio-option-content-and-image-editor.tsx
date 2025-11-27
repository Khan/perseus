import {Util} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import * as React from "react";

import {AutoResizingTextArea} from "../../components/auto-resizing-text-area";
import ImagePreview from "../../components/image-preview";
import PerseusEditorAccordion from "../../components/perseus-editor-accordion";

import styles from "./radio-editor.module.css";
import RadioImageEditor from "./radio-image-editor";
import {
    setMarkdownContentFromImageProxy,
    setImageProxyFromMarkdownContent,
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

    // States for updating content and images
    const [proxiedContent, setProxiedContent] = React.useState<string>("");
    const [images, setImages] = React.useState<
        {url: string; altText: string; width?: number; height?: number}[]
    >([]);

    // States for adding an image
    const [addingImage, setAddingImage] = React.useState(false);

    React.useEffect(() => {
        const [proxiedContent, parsedImages] = setImageProxyFromMarkdownContent(
            content ?? "",
        );
        setProxiedContent(proxiedContent);

        // Set images immediately without dimensions so they render right away
        setImages(parsedImages);

        // Fetch dimensions for all images asynchronously
        async function fetchAllDimensions() {
            const imagesWithDimensions = await Promise.all(
                parsedImages.map(async (image) => {
                    try {
                        const size = await Util.getImageSizeModern(image.url);
                        return {
                            ...image,
                            width: size[0],
                            height: size[1],
                        };
                    } catch (error) {
                        // If we can't get dimensions, return image without them
                        return image;
                    }
                }),
            );
            // Update images with dimensions once fetched
            setImages(imagesWithDimensions);
        }

        void fetchAllDimensions();
    }, [content]);

    // Add the image markdown at the end of the content.
    const handleAddImage = (
        choiceIndex: number,
        imageUrl: string,
        imageAltText: string,
        width?: number,
        height?: number,
    ) => {
        const newContent = `${content}\n![${imageAltText}](${imageUrl})`;
        onContentChange(choiceIndex, newContent);
    };

    const handleDeleteImage = (imageIndex: number) => {
        const substr = `![Image ${imageIndex + 1}]`;
        const newProxiedContent = proxiedContent.replace(substr, "");
        setProxiedContent(newProxiedContent);

        const newContent = setMarkdownContentFromImageProxy(
            newProxiedContent,
            images,
        );
        onContentChange(choiceIndex, newContent);
    };

    const handleUpdateImage = (
        imageIndex: number,
        url: string,
        altText: string,
        width?: number,
        height?: number,
    ) => {
        const newImages = [...images];
        newImages[imageIndex] = {url, altText, width, height};
        setImages(newImages);

        const newContent = setMarkdownContentFromImageProxy(
            proxiedContent,
            newImages,
        );

        onContentChange(choiceIndex, newContent);
    };

    const handleContentChange = (
        choiceIndex: number,
        newProxiedContent: string,
    ) => {
        setProxiedContent(newProxiedContent);

        const newContent = setMarkdownContentFromImageProxy(
            newProxiedContent,
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

    const handleDeleteImageConfirmation = (imageIndex: number) => {
        if (
            // eslint-disable-next-line no-alert
            window.confirm("Are you sure you want to delete this image?")
        ) {
            handleDeleteImage(imageIndex);
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
            {/* Content textarea */}
            <HeadingXSmall
                tag="label"
                htmlFor={contentTextAreaId}
                style={{marginBlockEnd: sizing.size_040}}
            >
                Content
            </HeadingXSmall>
            <AutoResizingTextArea
                id={contentTextAreaId}
                value={proxiedContent}
                placeholder="Type a choice here..."
                onChange={(value) => {
                    handleContentChange(choiceIndex, value);
                }}
                onPaste={handlePaste}
            />

            {/* Add image button */}
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

            {/* "Add image" tile */}
            {addingImage && (
                <RadioImageEditor
                    initialImageUrl=""
                    initialImageAltText=""
                    containerClassName={styles.imageEditorContainer}
                    onSave={(imageUrl, imageAltText, width, height) => {
                        handleAddImage(
                            choiceIndex,
                            imageUrl,
                            imageAltText,
                            width,
                            height,
                        );
                    }}
                    onClose={() => {
                        setAddingImage(false);
                    }}
                />
            )}

            {/* Image editor accordions */}
            {images?.map((image, imageIndex) => (
                <PerseusEditorAccordion
                    key={image.url}
                    header={`Image ${imageIndex + 1}`}
                    expanded={true}
                    containerStyle={{
                        // White to contrast with the blue choice tile.
                        backgroundColor:
                            semanticColor.core.background.base.default,
                        marginBlockStart: sizing.size_040,
                        marginBlockEnd: sizing.size_040,
                    }}
                    panelStyle={{
                        // Set the bottom padding to match the side padding.
                        paddingBlockEnd: sizing.size_120,
                    }}
                >
                    <LabeledField
                        label="Preview"
                        field={
                            <ImagePreview
                                src={image.url}
                                alt={`Preview: ${image.altText ?? "No alt text"}`}
                                width={image.width}
                                height={image.height}
                            />
                        }
                    />
                    <div style={{marginTop: sizing.size_160}}>
                        <RadioImageEditor
                            initialImageUrl={image.url}
                            initialImageAltText={image.altText}
                            initialImageWidth={image.width}
                            initialImageHeight={image.height}
                            onSave={(imageUrl, imageAltText, width, height) => {
                                handleUpdateImage(
                                    imageIndex,
                                    imageUrl,
                                    imageAltText,
                                    width,
                                    height,
                                );
                            }}
                            onDelete={() => {
                                handleDeleteImageConfirmation(imageIndex);
                            }}
                        />
                    </div>
                </PerseusEditorAccordion>
            )) ?? null}
        </>
    );
};
