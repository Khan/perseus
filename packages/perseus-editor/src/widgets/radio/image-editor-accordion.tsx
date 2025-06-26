import Button from "@khanacademy/wonder-blocks-button";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";

import PerseusEditorAccordion from "../../components/perseus-editor-accordion";

const ImageEditorAccordion = (props: {
    image: {altText: string; url: string};
    imageIndex: number;
    onDeleteImage: (imageIndex: number) => void;
    onUpdateImage: (imageIndex: number, url: string, altText: string) => void;
}) => {
    const {image, imageIndex, onDeleteImage, onUpdateImage} = props;

    const [url, setUrl] = React.useState(image.url);
    const [altText, setAltText] = React.useState(image.altText);

    return (
        <PerseusEditorAccordion
            key={image.url}
            header={`Image ${imageIndex + 1}`}
            containerStyle={{
                backgroundColor: semanticColor.surface.primary,
            }}
        >
            <img
                src={image.url}
                alt={image.altText}
                style={{marginBlockEnd: sizing.size_080}}
            />
            <HeadingXSmall
                tag="label"
                style={{marginBlockEnd: sizing.size_080}}
            >
                Image URL
                <TextArea
                    value={url}
                    placeholder="cdn.kastatic.org/..."
                    onChange={(value) => {
                        setUrl(value);
                        onUpdateImage(imageIndex, value, altText);
                    }}
                    // Usually the size of an image URL takes up 3 rows
                    rows={3}
                />
            </HeadingXSmall>
            <HeadingXSmall tag="label">
                Image Alt Text
                <TextArea
                    value={altText}
                    placeholder="The Moon appears as a bright gray circle in black space..."
                    onChange={(value) => {
                        setAltText(value);
                        onUpdateImage(imageIndex, url, value);
                    }}
                />
            </HeadingXSmall>
            <Button
                size="small"
                kind="tertiary"
                startIcon={trashIcon}
                style={{alignSelf: "flex-start"}}
                onClick={() => {
                    onDeleteImage(imageIndex);
                }}
            >
                Delete this image
            </Button>
        </PerseusEditorAccordion>
    );
};

export default ImageEditorAccordion;
