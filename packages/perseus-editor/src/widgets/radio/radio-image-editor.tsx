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

    const [stateImageUrl, setStateImageUrl] = React.useState<string>(imageUrl);

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

        // The `cancelled` flag guards against a stale async write.
        // Since content authors can edit the image URL while the image
        // dimensions are still being fetched, we need to guard against
        // saving stale dimensions.
        //
        // Example:
        //
        //   1. `imageUrl` is changed to "A.png". The effect runs, creates a
        //      new `cancelled` flag (let's call it cancelledA = false), and
        //      runs `fetchDimensions()`. That function awaits `getImageSizeModern`,
        //      which loads the image over the network. This can take a while,
        //      so the function suspends mid-flight with the await still pending.
        //   2. Before "A.png" finishes loading, `imageUrl` changes again to
        //      "B.png" (e.g. the author edits the URL and blurs the field).
        //      React first runs the previous effect's cleanup (setting
        //      cancelledA = true) then runs the effect again with a brand-new
        //      `cancelled` flag (cancelledB = false) and a second in-flight
        //      `fetchDimensions()`.
        //   3. "A.png" finally loads and its `await` resolves, resuming the
        //      first `fetchDimensions()`. It checks its own `cancelled`
        //      (cancelledA), sees `true`, and skips `setDimensions`. Without
        //      this check, it would overwrite the dimensions with the stale
        //      "A.png" size, even though the preview now shows "B.png".
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

        // Cleanup function
        return () => {
            cancelled = true;
        };
    }, [imageUrl]);

    return (
        <>
            {/* Preview */}
            {imageUrl ? (
                <LabeledField
                    label="Preview"
                    field={
                        <ImagePreview
                            src={imageUrl}
                            alt={`Preview: ${imageAltText}`}
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
                value={stateImageUrl}
                placeholder="cdn.kastatic.org/..."
                onChange={setStateImageUrl}
                onBlur={() => onSave(stateImageUrl, imageAltText)}
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
                onChange={(value) => onSave(imageUrl, value)}
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
