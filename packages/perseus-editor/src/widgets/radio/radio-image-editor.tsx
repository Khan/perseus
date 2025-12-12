import {Util} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import * as React from "react";

import styles from "./radio-editor.module.css";

// Flexible props to work for both the "add image" tile and
// the "edit image" accordion cases.
interface RadioImageEditorProps {
    initialImageUrl: string;
    initialImageAltText: string;
    initialImageWidth?: number;
    initialImageHeight?: number;
    containerClassName?: string;
    onSave: (
        imageUrl: string,
        imageAltText: string,
        width?: number,
        height?: number,
    ) => void;
    onClose?: () => void;
    onDelete?: () => void;
}

export default function RadioImageEditor({
    initialImageUrl,
    initialImageAltText,
    initialImageWidth,
    initialImageHeight,
    containerClassName,
    onSave,
    onClose,
    onDelete,
}: RadioImageEditorProps): React.ReactElement {
    const [imageUrl, setImageUrl] = React.useState(initialImageUrl);
    const [imageAltText, setImageAltText] = React.useState(initialImageAltText);
    const [imageWidth, setImageWidth] = React.useState(initialImageWidth);
    const [imageHeight, setImageHeight] = React.useState(initialImageHeight);

    // Keep the image URL and alt text in sync with changes.
    React.useEffect(() => {
        setImageUrl(initialImageUrl ?? "");
        setImageAltText(initialImageAltText ?? "");
        setImageWidth(initialImageWidth);
        setImageHeight(initialImageHeight);
    }, [
        initialImageUrl,
        initialImageAltText,
        initialImageWidth,
        initialImageHeight,
    ]);

    const uniqueId = React.useId();
    const imageUrlTextAreaId = `${uniqueId}-image-url-textarea`;
    const imageAltTextTextAreaId = `${uniqueId}-image-alt-text-textarea`;

    // Fetch image dimensions when URL changes, this will be used for the
    // proper display of the preview on the left side of the editor
    React.useEffect(() => {
        async function fetchDimensions() {
            if (!imageUrl) {
                setImageWidth(undefined);
                setImageHeight(undefined);
                return;
            }

            try {
                const size = await Util.getImageSizeModern(imageUrl);
                setImageWidth(size[0]);
                setImageHeight(size[1]);
            } catch (error) {
                // If we can't get dimensions, that's okay - the image will
                // still render, just without responsive sizing
                setImageWidth(undefined);
                setImageHeight(undefined);
            }
        }

        // Only fetch if URL changed and we don't already have dimensions
        if (imageUrl !== initialImageUrl) {
            void fetchDimensions();
        }
    }, [imageUrl, initialImageUrl]);

    function handleClose() {
        setImageUrl("");
        setImageAltText("");
        setImageWidth(undefined);
        setImageHeight(undefined);
        onClose?.();
    }

    function handleSave() {
        onSave(imageUrl, imageAltText, imageWidth, imageHeight);
        handleClose();
    }

    return (
        <div className={containerClassName}>
            {/* Close button */}
            {onClose && (
                <IconButton
                    aria-label="Close"
                    icon={xIcon}
                    size="small"
                    kind="tertiary"
                    onClick={handleClose}
                    style={{position: "absolute", top: 4, right: 4}}
                />
            )}

            {/* Image URL textarea */}
            <HeadingXSmall
                tag="label"
                htmlFor={imageUrlTextAreaId}
                style={{marginBlockEnd: sizing.size_040}}
            >
                Image URL
            </HeadingXSmall>
            <TextArea
                id={imageUrlTextAreaId}
                value={imageUrl}
                placeholder="cdn.kastatic.org/..."
                onChange={(value) => {
                    setImageUrl(value);
                }}
                style={{marginBlockEnd: sizing.size_080}}
                autoResize={true}
            />

            {/* Image Alt Text textarea */}
            <HeadingXSmall
                tag="label"
                htmlFor={imageAltTextTextAreaId}
                style={{marginBlockEnd: sizing.size_040}}
            >
                Image Alt Text
            </HeadingXSmall>
            <TextArea
                id={imageAltTextTextAreaId}
                value={imageAltText}
                placeholder="Example: Graph of a linear function..."
                onChange={(value) => {
                    setImageAltText(value);
                }}
                autoResize={true}
            />

            {/* Save and delete buttons */}
            <span className={styles.buttonRow}>
                {onDelete && (
                    <Button
                        size="small"
                        kind="tertiary"
                        startIcon={trashIcon}
                        style={{alignSelf: "flex-start"}}
                        onClick={onDelete}
                    >
                        Delete this image
                    </Button>
                )}
                <Spring />
                <Button
                    size="small"
                    disabled={
                        imageUrl === initialImageUrl &&
                        imageAltText === initialImageAltText
                    }
                    style={{
                        alignSelf: "flex-start",
                    }}
                    onClick={handleSave}
                >
                    Save image
                </Button>
            </span>
        </div>
    );
}
