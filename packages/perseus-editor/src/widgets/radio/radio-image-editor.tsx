import Button from "@khanacademy/wonder-blocks-button";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";

import ImagePreview from "../../components/image-preview";

import styles from "./radio-editor.module.css";

// Flexible props to work for both the "add image" tile and
// the "edit image" accordion cases.
interface RadioImageEditorProps {
    imageUrl: string;
    imageAltText: string;
    imageWidth?: number;
    imageHeight?: number;
    onSave: (
        imageUrl: string,
        imageAltText: string,
        width?: number,
        height?: number,
    ) => void;
    onDelete: () => void;
}

export default function RadioImageEditor({
    imageUrl,
    imageAltText,
    imageWidth,
    imageHeight,
    onSave,
    onDelete,
}: RadioImageEditorProps): React.ReactElement {
    const uniqueId = React.useId();
    const imageUrlTextAreaId = `${uniqueId}-image-url-textarea`;
    const imageAltTextTextAreaId = `${uniqueId}-image-alt-text-textarea`;

    function handleUrlChange(value: string) {
        onSave(value, imageAltText, imageWidth, imageHeight);
    }

    function handleAltTextChange(value: string) {
        onSave(imageUrl, value, imageWidth, imageHeight);
    }

    return (
        <div>
            {/* Preview */}
            {imageUrl ? (
                <LabeledField
                    label="Preview"
                    field={
                        <ImagePreview
                            src={imageUrl}
                            alt={`Preview: ${imageAltText ?? "No alt text"}`}
                            width={imageWidth}
                            height={imageHeight}
                        />
                    }
                    // TODO(LEMS-3686): Use CSS modules after Wonder Blocks
                    // styles are moved to a different layer.
                    styles={{root: {marginBlockEnd: sizing.size_160}}}
                />
            ) : (
                <BodyText
                    // TODO(LEMS-3686): Use CSS modules after Wonder Blocks
                    // styles are moved to a different layer.
                    style={{
                        color: semanticColor.core.foreground.critical.default,
                        marginBlockEnd: sizing.size_160,
                    }}
                >
                    Missing image URL
                </BodyText>
            )}

            {/* Image URL textarea */}
            <BodyText
                size="small"
                weight="bold"
                tag="label"
                htmlFor={imageUrlTextAreaId}
                style={{marginBlockEnd: sizing.size_040}}
            >
                Image URL
            </BodyText>
            <TextArea
                id={imageUrlTextAreaId}
                value={imageUrl}
                placeholder="cdn.kastatic.org/..."
                onChange={(value) => {
                    handleUrlChange(value);
                }}
                style={{marginBlockEnd: sizing.size_080}}
                autoResize={true}
            />

            {/* Image Alt Text textarea */}
            <BodyText
                size="small"
                weight="bold"
                tag="label"
                htmlFor={imageAltTextTextAreaId}
                style={{marginBlockEnd: sizing.size_040}}
            >
                Image Alt Text
            </BodyText>
            <TextArea
                id={imageAltTextTextAreaId}
                value={imageAltText}
                placeholder="Example: Graph of a linear function..."
                onChange={(value) => handleAltTextChange(value)}
                autoResize={true}
            />

            {/* Delete button */}
            <span className={styles.buttonRow}>
                <Button
                    size="small"
                    kind="tertiary"
                    startIcon={trashIcon}
                    style={{alignSelf: "flex-start"}}
                    onClick={onDelete}
                >
                    Delete this image
                </Button>
            </span>
        </div>
    );
}
