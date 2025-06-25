import {OnePaneDialog} from "@khanacademy/wonder-blocks-modal";
import * as React from "react";

import ImageEditorAccordion from "./image-editor-accordion";
import RadioOptionContentField from "./radio-option-content-field";

const imageRegex = /!\[(.*?)\]\((.*?)\)/g;

const setNiceContentAndImages = (
    content: string,
): [string, {url: string; altText: string}[]] => {
    // Replace the hard-to-read image markdown with a nice placeholder
    // ex. "![abc](https://...) -> "![Image 1]"

    let newContent: string = "";
    const images: {url: string; altText: string}[] = [];

    let isInImageAltText = false;
    let isInImageUrl = false;
    let imageIndex = 0;
    for (let i = 0; i < content.length; i++) {
        const char = content[i];

        // Start of an image
        if (char === "!" && i < content.length - 1 && content[i + 1] === "[") {
            isInImageAltText = true;
            newContent += "!";
            i++; // Skip the next character (the "[")
            images.push({altText: "", url: ""});
            continue;
        }

        // End of the image alt text (start of the image URL)
        if (char === "]" && isInImageAltText) {
            isInImageAltText = false;
            isInImageUrl = true;
            newContent += `[Image ${imageIndex + 1}]`;
            i++; // Skip the next character (the "(")
            continue;
        }

        // Save the alt text char while traversing the alt text
        if (isInImageAltText) {
            images[imageIndex].altText += char;
            continue;
        }

        // End of the image url
        if (isInImageUrl && char === ")") {
            isInImageUrl = false;
            imageIndex++;
            continue;
        }

        // Save the url char while traversing the url
        if (isInImageUrl) {
            images[imageIndex].url += char;
            continue;
        }

        // Save the non-image chars
        if (!isInImageAltText && !isInImageUrl) {
            newContent += char;
        }
    }

    return [newContent, images];
};

type Props = {
    content: string;
    choiceIndex: number;
    onContentChange: (choiceIndex: number, content: string) => void;
};

export const RadioOptionImageEditModal = (props: Props) => {
    const {content, choiceIndex, onContentChange} = props;

    const inputRef = React.useRef<HTMLTextAreaElement>(null);

    const [niceContent, setNiceContent] = React.useState<string | null>(null);
    const [images, setImages] = React.useState<
        {url: string; altText: string}[]
    >([]);

    React.useEffect(() => {
        const [niceContent, images] = setNiceContentAndImages(content);
        setNiceContent(niceContent);
        setImages(images);
    }, [content]);

    const handleDeleteImage = (imageIndex: number) => {
        console.log("delete image", imageIndex);
        return;
    };

    const handleUpdateImage = (
        imageIndex: number,
        url: string,
        altText: string,
    ) => {
        console.log("update image", imageIndex, url, altText);
        return;
    };

    const handleContentChange = (choiceIndex: number, newContent: string) => {
        // Set the nice content
        setNiceContent(newContent);

        // Update the actual props
    };

    return (
        <OnePaneDialog
            title="Edit images"
            content={
                <>
                    <RadioOptionContentField
                        index={choiceIndex}
                        inputRef={inputRef}
                        content={niceContent}
                        isNoneOfTheAbove={false}
                        inModal={true}
                        onContentChange={handleContentChange}
                    />
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
            }
        />
    );
};
