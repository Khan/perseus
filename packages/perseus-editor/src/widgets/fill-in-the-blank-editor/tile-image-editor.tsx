import {Util} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";

import ImagePreview from "../../components/image-preview";
import {TypedSingleSelect} from "../../components/typed-single-select";

import styles from "./tile-image-editor.module.css";
import {
    IMAGE_HEIGHTS,
    MAX_TILE_CONTENT_WIDTH,
    imageHeightOptions,
    imageHeightValues,
    parseImageMarkdown,
    toHeightValue,
    toImageMarkdown,
} from "./tile-image-utils";

import type {FillInTheBlankTile} from "@khanacademy/perseus";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

// Matches the shorter select the image widget's "Alignment" control uses.
const selectStyle: StyleType = {height: sizing.size_260};

interface Props {
    choiceNumber: number;
    /** The choice's content — image markdown, `![alt](url)`. */
    content: string;
    imageHeight: FillInTheBlankTile["imageHeight"];
    onChange: (changes: Partial<FillInTheBlankTile>) => void;
    onDelete: () => void;
    editingDisabled: boolean;
}

/**
 * The image half of a choice: preview, URL, alt text and display height.
 *
 * Follows the radio editor's image editor (`radio-image-editor.tsx`) — same
 * preview-then-fields order, same dimension fetch keyed on the URL, same
 * "Delete this image" button — with two additions the Drag-and-Drop spec asks
 * for: the seven fixed height presets, and live checks on the image's shape.
 *
 * The shape checks live here rather than in `validation.ts` because they need
 * the image's natural dimensions, which are fetched for the preview and are
 * deliberately **not** in the schema (the render plan's decision 5 keeps image
 * dimensions out of it). Save warnings only see the authored options.
 */
export default function TileImageEditor({
    choiceNumber,
    content,
    imageHeight,
    onChange,
    onDelete,
    editingDisabled,
}: Props) {
    const ids = React.useId();
    const urlId = `${ids}-url`;
    const altId = `${ids}-alt`;
    const heightLabelId = `${ids}-height-label`;

    const image = parseImageMarkdown(content);
    const url = image?.url ?? "";
    const alt = image?.alt ?? "";

    // Held locally so the author can type a URL without a re-fetch per
    // keystroke; committed on blur, as the radio editor does.
    const [draftUrl, setDraftUrl] = React.useState(url);

    const [dimensions, setDimensions] = React.useState<{
        width?: number;
        height?: number;
    }>({});

    // Fetch dimensions whenever the URL changes. `cancelled` guards against a
    // stale async write when the author edits the URL mid-flight.
    React.useEffect(() => {
        if (!url) {
            setDimensions({});
            return;
        }
        let cancelled = false;
        async function fetchDimensions() {
            try {
                const size = await Util.getImageSizeModern(url);
                if (!cancelled) {
                    setDimensions({width: size[0], height: size[1]});
                }
            } catch (error) {
                // Without dimensions we simply skip the shape checks.
                if (!cancelled) {
                    setDimensions({});
                }
            }
        }
        void fetchDimensions();
        return () => {
            cancelled = true;
        };
    }, [url]);

    // The spec: images prefer square; non-square is allowed only in landscape,
    // and the scaled width must fit the tile without scrolling. Both are
    // decidable here because the height is a fixed preset, so the displayed
    // width follows from the aspect ratio.
    const shapeWarnings: string[] = [];
    const {width: naturalWidth, height: naturalHeight} = dimensions;
    if (naturalWidth != null && naturalHeight != null && naturalHeight > 0) {
        if (naturalHeight > naturalWidth) {
            shapeWarnings.push(
                "This image is portrait. Drag-and-drop choices prefer square " +
                    "images, and only landscape is allowed otherwise.",
            );
        }
        const height = imageHeight ?? IMAGE_HEIGHTS[0];
        const displayedWidth = Math.round(
            naturalWidth * (height / naturalHeight),
        );
        if (displayedWidth > MAX_TILE_CONTENT_WIDTH) {
            shapeWarnings.push(
                `At ${height}px tall this image displays ${displayedWidth}px ` +
                    `wide, over the ${MAX_TILE_CONTENT_WIDTH}px a choice can ` +
                    `show. Pick a shorter height or a less wide image.`,
            );
        }
    }

    return (
        <div className={styles.imageEditor}>
            {url ? (
                <LabeledField
                    label="Preview"
                    field={
                        <ImagePreview
                            src={url}
                            alt={`Preview: ${alt}`}
                            width={dimensions.width}
                            height={dimensions.height}
                        />
                    }
                />
            ) : (
                <BodyText className={styles.missing}>
                    Missing image URL
                </BodyText>
            )}

            <BodyText size="small" weight="bold" tag="label" htmlFor={urlId}>
                Image URL
            </BodyText>
            <TextArea
                id={urlId}
                aria-label={`Choice ${choiceNumber} image URL`}
                value={draftUrl}
                placeholder="cdn.kastatic.org/..."
                onChange={setDraftUrl}
                onBlur={() =>
                    onChange({content: toImageMarkdown(draftUrl, alt)})
                }
                autoResize={true}
                disabled={editingDisabled}
            />

            {/* Also the tile's screen reader text: an image choice has no
                separate field for it, because two places to describe one
                image is two places to disagree. */}
            <BodyText size="small" weight="bold" tag="label" htmlFor={altId}>
                Image alt text
            </BodyText>
            <TextArea
                id={altId}
                aria-label={`Choice ${choiceNumber} image alt text`}
                value={alt}
                placeholder="Example: a stack of four pennies"
                onChange={(value) =>
                    onChange({
                        content: toImageMarkdown(url, value),
                        label: value,
                    })
                }
                autoResize={true}
                disabled={editingDisabled}
            />

            <div className={styles.heightField}>
                <BodyText id={heightLabelId} tag="span">
                    Height
                </BodyText>
                <TypedSingleSelect
                    // Names the control uniquely across choices while keeping
                    // the visible word in the name (WCAG 2.5.3).
                    aria-label={`Choice ${choiceNumber} Height`}
                    placeholder="Select a height"
                    options={imageHeightOptions}
                    selectedValue={
                        imageHeight == null ? null : toHeightValue(imageHeight)
                    }
                    onChange={(value) =>
                        onChange({imageHeight: imageHeightValues[value]})
                    }
                    style={selectStyle}
                    disabled={editingDisabled}
                />
            </div>

            {shapeWarnings.map((warning) => (
                <BodyText
                    key={warning}
                    size="small"
                    className={styles.shapeWarning}
                >
                    {warning}
                </BodyText>
            ))}

            <Button
                size="small"
                kind="tertiary"
                startIcon={trashIcon}
                aria-label={`Delete choice ${choiceNumber} image`}
                className={styles.deleteButton}
                disabled={editingDisabled}
                onClick={onDelete}
            >
                Delete this image
            </Button>
        </div>
    );
}
