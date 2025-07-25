import Button from "@khanacademy/wonder-blocks-button";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";

import PerseusEditorAccordion from "../../components/perseus-editor-accordion";

import {AutoResizingTextArea} from "./auto-resizing-text-area";

const ImageEditorAccordion = (props: {
    image: {altText: string; url: string};
    imageIndex: number;
    onDeleteImage: (imageIndex: number) => void;
    onUpdateImage: (imageIndex: number, url: string, altText: string) => void;
}) => {
    const uniqueId = React.useId();
    const urlTextAreaId = `${uniqueId}-url-textarea`;
    const altTextTextAreaId = `${uniqueId}-alt-text-textarea`;

    const {image, imageIndex, onDeleteImage, onUpdateImage} = props;

    const [url, setUrl] = React.useState(image.url);
    const [altText, setAltText] = React.useState(image.altText);

    return (
        <PerseusEditorAccordion
            key={image.url}
            header={`Image ${imageIndex + 1}`}
            containerStyle={{
                backgroundColor: semanticColor.surface.primary,
                marginBlockStart: sizing.size_040,
                marginBlockEnd: sizing.size_040,
            }}
            headerStyle={{
                height: sizing.size_320,
            }}
        >
            <img
                src={image.url}
                alt={image.altText}
                style={{marginBlockEnd: sizing.size_080}}
            />
            <HeadingXSmall
                tag="label"
                htmlFor={urlTextAreaId}
                style={{marginBlockEnd: sizing.size_040}}
            >
                Image URL
            </HeadingXSmall>
            <AutoResizingTextArea
                value={url}
                placeholder="cdn.kastatic.org/..."
                onChange={(value) => {
                    setUrl(value);
                    onUpdateImage(imageIndex, value, altText);
                }}
                style={{marginBlockEnd: sizing.size_080}}
            />
            <HeadingXSmall
                tag="label"
                htmlFor={altTextTextAreaId}
                style={{marginBlockEnd: sizing.size_040}}
            >
                Image Alt Text
            </HeadingXSmall>
            <AutoResizingTextArea
                value={altText}
                placeholder="The Moon appears as a bright gray circle in black space..."
                onChange={(value) => {
                    setAltText(value);
                    onUpdateImage(imageIndex, url, value);
                }}
            />
            <Button
                size="small"
                kind="tertiary"
                startIcon={trashIcon}
                style={{alignSelf: "flex-start"}}
                onClick={() => {
                    if (
                        // eslint-disable-next-line no-alert
                        window.confirm(
                            "Are you sure you want to delete this image?",
                        )
                    ) {
                        onDeleteImage(imageIndex);
                    }
                }}
            >
                Delete this image
            </Button>
        </PerseusEditorAccordion>
    );
};

export default ImageEditorAccordion;
