import {Util} from "@khanacademy/perseus";
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
    onSave: (imageUrl: string, imageAltText: string) => void;
    onDelete: () => void;
}

export default function RadioImageEditor({
    imageUrl,
    imageAltText,
    onSave,
    onDelete,
}: RadioImageEditorProps): React.ReactElement {
    const uniqueId = React.useId();
    const imageUrlTextAreaId = `${uniqueId}-image-url-textarea`;
    const imageAltTextTextAreaId = `${uniqueId}-image-alt-text-textarea`;

    // Dimensions are needed to keep the preview from overflowing its
    // container.
    const [dimensions, setDimensions] = React.useState<{
        width?: number;
        height?: number;
    }>({});

    // Fetch the image's dimensions whenever its URL changes. Editing alt text
    // doesn't touch `imageUrl`, so typing alt text never triggers a re-fetch.
    React.useEffect(() => {
        if (!imageUrl) {
            setDimensions({});
            return;
        }

        let cancelled = false;
        async function fetchDimensions() {
            try {
                const size = await Util.getImageSizeModern(imageUrl);
                if (!cancelled) {
                    setDimensions({width: size[0], height: size[1]});
                }
            } catch (error) {
                // If we can't get dimensions, render without them.
                if (!cancelled) {
                    setDimensions({});
                }
            }
        }

        void fetchDimensions();

        // Cleanup function to cancel the fetch if the component unmounts.
        return () => {
            cancelled = true;
        };
    }, [imageUrl]);

    function handleUrlChange(value: string) {
        onSave(value, imageAltText);
    }

    function handleAltTextChange(value: string) {
        onSave(imageUrl, value);
    }

    return (
        <>
            {/* Preview */}
            {imageUrl ? (
                <LabeledField
                    label="Preview"
                    field={
                        <ImagePreview
                            src={imageUrl}
                            alt={`Preview: ${imageAltText ?? "No alt text"}`}
                            width={dimensions.width}
                            height={dimensions.height}
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
        </>
    );
}
