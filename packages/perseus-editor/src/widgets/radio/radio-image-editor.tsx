import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import * as React from "react";

import {AutoResizingTextArea} from "../../components/auto-resizing-text-area";

import styles from "./radio-editor.module.css";

// Flexible props to work for both the "add image" tile and
// the "edit image" accordion cases.
interface RadioImageEditorProps {
    initialImageUrl: string;
    initialImageAltText: string;
    containerClassName?: string;
    onSave: (imageUrl: string, imageAltText: string) => void;
    onClose?: () => void;
    onDelete?: () => void;
}

export default function RadioImageEditor({
    initialImageUrl,
    initialImageAltText,
    containerClassName,
    onSave,
    onClose,
    onDelete,
}: RadioImageEditorProps): React.ReactElement {
    const [imageUrl, setImageUrl] = React.useState(initialImageUrl);
    const [imageAltText, setImageAltText] = React.useState(initialImageAltText);

    // Keep the image URL and alt text in sync with changes.
    React.useEffect(() => {
        setImageUrl(initialImageUrl ?? "");
        setImageAltText(initialImageAltText ?? "");
    }, [initialImageUrl, initialImageAltText]);

    const uniqueId = React.useId();
    const imageUrlTextAreaId = `${uniqueId}-image-url-textarea`;
    const imageAltTextTextAreaId = `${uniqueId}-image-alt-text-textarea`;

    function handleClose() {
        setImageUrl("");
        setImageAltText("");
        onClose?.();
    }

    function handleSave() {
        onSave(imageUrl, imageAltText);
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
            <AutoResizingTextArea
                id={imageUrlTextAreaId}
                value={imageUrl}
                placeholder="cdn.kastatic.org/..."
                onChange={(value) => {
                    setImageUrl(value);
                }}
                style={{marginBlockEnd: sizing.size_080}}
            />

            {/* Image Alt Text textarea */}
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
                placeholder="Example: Graph of a linear function..."
                onChange={(value) => {
                    setImageAltText(value);
                }}
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
