import Button from "@khanacademy/wonder-blocks-button";
import {TextField} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import caretDoubleDownIcon from "@phosphor-icons/core/bold/caret-double-down-bold.svg";
import caretDoubleUpIcon from "@phosphor-icons/core/bold/caret-double-up-bold.svg";
import caretDownIcon from "@phosphor-icons/core/bold/caret-down-bold.svg";
import caretUpIcon from "@phosphor-icons/core/bold/caret-up-bold.svg";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";

// TODO(LEMS-4371): The info tips below render their popover at the top of the
// page instead of beside the icon. Not the shared component's fault — the
// image widget's "Alignment" row uses this same module and positions
// correctly, with block children too. Something about the placement here.
// Cheapest things to try: the flex `.field-header` wrapper; putting the tip
// after the field rather than after its `<label>` (Alignment puts it after
// the control); the `<code>` elements in the tip body. Also worth ruling out:
// two copies of `wonder-blocks-tooltip` are installed against different
// `@popperjs/core` versions.
import InfoTip from "../../components/info-tip";
import PerseusEditorAccordion from "../../components/perseus-editor-accordion";

import TileImageEditor from "./tile-image-editor";
import {IMAGE_HEIGHTS, toImageMarkdown} from "./tile-image-utils";
import styles from "./tile-row-editor.module.css";
import {getTileContentKind} from "./validation";

import type {FillInTheBlankTile} from "@khanacademy/perseus";

export type ChoiceMovement = "top" | "up" | "down" | "bottom";

interface Props {
    index: number;
    tile: FillInTheBlankTile;
    showMove: boolean;
    showDelete: boolean;
    editingDisabled: boolean;
    onChange: (changes: Partial<FillInTheBlankTile>) => void;
    onMove: (movement: ChoiceMovement) => void;
    onDelete: () => void;
}

/**
 * An editor for a single answer tile (a "choice").
 *
 * Laid out as a card, following the radio editor's per-choice tile: the
 * choice's fields stacked, its move and delete controls along the bottom.
 *
 * The tile's `id` is deliberately not editable: each blank's `correctId`
 * points at it, so letting an author retype it would silently break the
 * correct answers. Reordering and deleting are the only structural edits.
 */
export default function TileRowEditor({
    index,
    tile,
    showMove,
    showDelete,
    editingDisabled,
    onChange,
    onMove,
    onDelete,
}: Props) {
    const choiceNumber = index + 1;
    // Options can arrive as hand-edited JSON, so a field the type promises may
    // still be missing. Read defensively rather than throwing mid-render.
    const content = typeof tile.content === "string" ? tile.content : "";
    const label = typeof tile.label === "string" ? tile.label : "";
    const isImage = getTileContentKind(content) === "image";
    // Each control is named by the visible text around it rather than by an
    // `aria-label` repeating it. Pairing the choice's name with the field's
    // gives "Choice 2 Content" — unique across the list, and built only from
    // words that are on screen.
    const ids = React.useId();
    const choiceLabelId = `${ids}-choice`;
    const contentLabelId = `${ids}-content-label`;
    const contentFieldId = `${ids}-content`;
    const srLabelId = `${ids}-sr-label`;
    const srFieldId = `${ids}-sr`;

    return (
        <li className={styles.tile}>
            <BodyText id={choiceLabelId} size="small" weight="bold" tag="span">
                {`Choice ${choiceNumber}`}
            </BodyText>

            {!isImage && (
                <>
                    <div className={styles.fieldHeader}>
                        <BodyText
                            id={contentLabelId}
                            size="small"
                            weight="bold"
                            tag="label"
                            htmlFor={contentFieldId}
                        >
                            Content
                        </BodyText>
                        <InfoTip>
                            <p>
                                What the learner sees on the tile. A single word
                                or one character — not a phrase.
                            </p>
                            <p>
                                Plain text for a word, <code>$x^2$</code> for
                                TeX, or
                                <code>![description](url)</code> for an image.
                                Leave it empty for a blank tile.
                            </p>
                            <p>
                                Keep every choice the same kind: all text, all
                                TeX, or all images. Empty choices may be mixed
                                in.
                            </p>
                        </InfoTip>
                    </div>
                    <TextField
                        id={contentFieldId}
                        aria-labelledby={`${choiceLabelId} ${contentLabelId}`}
                        placeholder="a word, or $TeX$"
                        value={content}
                        disabled={editingDisabled}
                        onChange={(next) => onChange({content: next})}
                    />
                    <div className={styles.fieldHeader}>
                        <BodyText
                            id={srLabelId}
                            size="small"
                            weight="bold"
                            tag="label"
                            htmlFor={srFieldId}
                        >
                            Screen reader text
                        </BodyText>
                        <InfoTip>
                            <p>
                                What a screen reader announces in place of the
                                tile, including when it is moved into a blank.
                            </p>
                            <p>
                                For a word, usually the word itself. For TeX,
                                write how it should be read aloud — &ldquo;2
                                plus 2&rdquo; rather than &ldquo;$2 + 2$&rdquo;.
                                For an image, describe it. For an empty choice,
                                &ldquo;empty&rdquo;.
                            </p>
                        </InfoTip>
                    </div>
                    <TextField
                        id={srFieldId}
                        aria-labelledby={`${choiceLabelId} ${srLabelId}`}
                        placeholder="how this choice is read aloud"
                        value={label}
                        disabled={editingDisabled}
                        onChange={(next) => onChange({label: next})}
                    />
                </>
            )}

            {/* A choice is text or an image, never both, so the image
                editor replaces the content field rather than sitting beside
                it. "Add image" and the accordion follow the radio editor. */}
            {isImage ? (
                <PerseusEditorAccordion
                    header={`Choice ${choiceNumber} image`}
                    expanded={true}
                    containerStyle={{
                        // White, to contrast with the choice card.
                        backgroundColor:
                            semanticColor.core.background.base.default,
                        marginBlockStart: sizing.size_040,
                    }}
                    panelStyle={{paddingBlockEnd: sizing.size_120}}
                >
                    <TileImageEditor
                        choiceNumber={choiceNumber}
                        content={content}
                        imageHeight={tile.imageHeight}
                        editingDisabled={editingDisabled}
                        onChange={onChange}
                        onDelete={() =>
                            onChange({content: "", imageHeight: undefined})
                        }
                    />
                </PerseusEditorAccordion>
            ) : (
                <Button
                    size="small"
                    kind="tertiary"
                    startIcon={plusIcon}
                    aria-label={`Add image to choice ${choiceNumber}`}
                    className={styles.addImage}
                    disabled={editingDisabled}
                    onClick={() => {
                        // Switching to an image discards the text, since a
                        // choice cannot hold both. Only worth confirming when
                        // there is something to lose.
                        if (
                            content.trim() !== "" &&
                            // eslint-disable-next-line no-alert
                            !window.confirm(
                                "Adding an image will replace this choice's " +
                                    "text and screen reader text, since a " +
                                    "choice can hold text or an image but " +
                                    "not both. Do you want to continue?",
                            )
                        ) {
                            return;
                        }
                        // The old screen reader text described the old text,
                        // so it goes with it. An image choice's alt text is
                        // its screen reader text.
                        onChange({
                            content: toImageMarkdown("", ""),
                            label: "",
                            imageHeight: IMAGE_HEIGHTS[2],
                        });
                    }}
                >
                    Add image
                </Button>
            )}

            {/* Mirrors the radio editor's per-choice actions. */}
            <div className={styles.actions}>
                {showDelete && (
                    <Button
                        size="small"
                        kind="tertiary"
                        startIcon={trashIcon}
                        disabled={editingDisabled}
                        // Reads "Remove" like the radio editor's, but names
                        // the choice for assistive tech: a Fill in the Blank
                        // can hold many, and one "Remove" repeated gives no
                        // way to tell them apart. The visible word is part of
                        // the name, so the two still agree.
                        aria-label={`Remove choice ${choiceNumber}`}
                        onClick={() => {
                            if (
                                // eslint-disable-next-line no-alert
                                window.confirm(
                                    `Are you sure you want to remove this choice? \n\n${
                                        content || label
                                    }`,
                                )
                            ) {
                                onDelete();
                            }
                        }}
                    >
                        Remove
                    </Button>
                )}
                {showMove && (
                    <>
                        <Spring />
                        {/* Numbered, unlike the radio editor's: a Fill in the
                            Blank can hold many choices, and "Move choice up"
                            repeated verbatim gives a screen reader user no way
                            to tell which choice a button moves. */}
                        <IconButton
                            icon={caretDoubleUpIcon}
                            kind="tertiary"
                            size="xsmall"
                            disabled={editingDisabled}
                            aria-label={`Move choice ${choiceNumber} to the top`}
                            onClick={() => onMove("top")}
                        />
                        <IconButton
                            icon={caretUpIcon}
                            kind="tertiary"
                            size="xsmall"
                            disabled={editingDisabled}
                            aria-label={`Move choice ${choiceNumber} up`}
                            onClick={() => onMove("up")}
                        />
                        <IconButton
                            icon={caretDownIcon}
                            kind="tertiary"
                            size="xsmall"
                            disabled={editingDisabled}
                            aria-label={`Move choice ${choiceNumber} down`}
                            onClick={() => onMove("down")}
                        />
                        <IconButton
                            icon={caretDoubleDownIcon}
                            kind="tertiary"
                            size="xsmall"
                            disabled={editingDisabled}
                            aria-label={`Move choice ${choiceNumber} to the bottom`}
                            onClick={() => onMove("bottom")}
                        />
                    </>
                )}
            </div>
        </li>
    );
}
