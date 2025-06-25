import {OnePaneDialog} from "@khanacademy/wonder-blocks-modal";
import * as React from "react";

import ImageEditorAccordion from "./image-editor-accordion";
import RadioOptionContentField from "./radio-option-content-field";

const imageRegex = /!\[(.*?)\]\((.*?)\)/g;

type Props = {
    content: string;
    choiceIndex: number;
    onContentChange: (choiceIndex: number, content: string) => void;
};

export const RadioOptionImageEditModal = (props: Props) => {
    const {content, choiceIndex, onContentChange} = props;

    const inputRef = React.useRef<HTMLTextAreaElement>(null);

    // Array of image strings
    // ex. ["![abc](https://...)", "![def](https://...)"]
    let imageMatches: string[] | null;
    // Array of image objects containing the url and alt text
    const images: {url: string; altText: string}[] = [];

    while ((imageMatches = imageRegex.exec(content)) !== null) {
        const [, altText, url] = imageMatches;
        images.push({altText, url});
    }

    const handleDeleteImage = (imageIndex: number) => {
        return;
    };

    return (
        <OnePaneDialog
            title="Edit images"
            content={
                <>
                    <RadioOptionContentField
                        index={choiceIndex}
                        inputRef={inputRef}
                        content={content}
                        isNoneOfTheAbove={false}
                        inModal={true}
                        onContentChange={onContentChange}
                    />
                    {images?.map((image, imageIndex) => (
                        <ImageEditorAccordion
                            key={`${imageIndex}-${image.url}`}
                            image={image}
                            imageIndex={imageIndex}
                            onDeleteImage={handleDeleteImage}
                        />
                    )) ?? null}
                </>
            }
        />
    );
};
