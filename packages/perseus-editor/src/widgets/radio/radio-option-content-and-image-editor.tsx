import {sizing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import ImageEditorAccordion from "./image-editor-accordion";
import RadioOptionContentField from "./radio-option-content-field";
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

    const [niceContent, setNiceContent] = React.useState<string>("");
    const [images, setImages] = React.useState<
        {url: string; altText: string}[]
    >([]);

    React.useEffect(() => {
        const [niceContent, images] = setNiceContentAndImages(content);
        setNiceContent(niceContent);
        setImages(images);
    }, [content]);

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

    return (
        <div style={{marginBlockEnd: sizing.size_120}}>
            <RadioOptionContentField
                index={choiceIndex}
                inputRef={inputRef}
                content={niceContent}
                isNoneOfTheAbove={isNoneOfTheAbove ?? false}
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
        </div>
    );
};
