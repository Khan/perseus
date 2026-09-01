import {useDraggable} from "@dnd-kit/react";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import checkIcon from "@phosphor-icons/core/regular/check.svg";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import classNames from "classnames";
import * as React from "react";

import Renderer from "../../../renderer";
import a11yStyles from "../../../styles/a11y.module.css";
import {usePerseusI18n} from "../../i18n-context";
import {DndActionMenu} from "../dnd-action-menu";

import styles from "./answer-tile.module.css";

import type {MoveTarget} from "../dnd-action-menu";

export interface AnswerTileProps {
    /**
     * The tile's drag-instance id, unique within the surrounding
     * PerseusDndProvider. The widgets encode the tile's location into
     * it (see drag-ids.ts), so one tile registers a different id in
     * the bank and in each blank.
     */
    tileId: string;
    /**
     * Perseus markdown for the tile face: text, TeX, or an image.
     * Use "" for an empty tile.
     */
    content: string;
    /**
     * Labels the tile's menu button for screen readers, as translated
     * plain text.
     */
    label: string;
    /**
     * Used to provide visible feedback regarding whether the user
     * answered the question correctly or incorrectly.
     *
     * Never pass this together with `disabled`: a scored tile is either
     * placed (showCorrectness) or unused (disabled).
     */
    showCorrectness?: "correct" | "incorrect";
    /**
     * Dims the tile and removes its menu and shadow. The widgets use
     * this for unused choice-bank tiles after scoring.
     */
    disabled?: boolean;
    /**
     * Blanks the tile can move to, which populate the menu.
     * An empty array is valid: a placed tile in a one-blank exercise
     * can only be cleared, due to no other legitimate moveTargets.
     */
    moveTargets: ReadonlyArray<MoveTarget>;
    /** Called with the target blank's id when a move action is selected. */
    onMove: (targetId: string) => void;
    /**
     * Label of the blank/column the tile currently sits in, which is used
     * as part of the aria-label for the "Clear" button in the Action Menu.
     */
    clearFromLabel?: string;
    /** Callback for removing the tile from its blank. */
    onClear?: () => void;
    /** Remaining uses for a multi-use tile, spoken by the menu opener. */
    remainingUses?: number;
    /**
     * This ref points to the menu's opener button. The parent uses it to
     * move focus after a tile moves.
     */
    menuRef?: React.Ref<HTMLButtonElement>;
    /**
     * Set true for a tile placed in an inline blank. The tile hides its
     * menu until hover or focus.
     */
    inBlank?: boolean;
    /**
     * Set true for a placed tile that stretches to fill its blank, with
     * the content at the start. The menu stays visible. The Sorter uses
     * this for placed tiles.
     */
    fillsBlank?: boolean;
    /** Called when the tile's content renders (TeX ready, image update). */
    onContentRender?: () => void;
    /**
     * Set true for a tile placed in a sub/superscript blank. The tile
     * rests as a small value chip until hover or focus.
     */
    compact?: boolean;
    /** Display height in pixels for an image tile's image. */
    imageHeight?: number;
}

/**
 * AnswerTile is the card that a learner moves into a blank. It is part of
 * the Drag-and-Drop widget family. The tile shows authored markdown
 * content: text, TeX, or an image. It puts the DndActionMenu at its
 * leading edge. The parent widget sets showCorrectness and disabled
 * after scoring.
 */
export function AnswerTile(props: AnswerTileProps): React.ReactElement {
    const {
        content,
        label,
        showCorrectness,
        disabled,
        moveTargets,
        onMove,
        clearFromLabel,
        onClear,
        remainingUses,
        menuRef,
        tileId,
        inBlank,
        fillsBlank,
        onContentRender,
        imageHeight,
        compact,
    } = props;
    const {strings} = usePerseusI18n();

    // Scored and unused tiles lose their drag function (per the
    // Drag-and-Drop Overview spec).
    const isDraggable = disabled !== true && showCorrectness == null;
    const {ref: dragRef, isDragging} = useDraggable({
        id: tileId,
        disabled: !isDraggable,
    });

    // Whitespace-only content would render an invisible, unlabeled tile.
    // This protection might not be needed, depending on how we implement
    // the Content Editor experience, but it seemed wise to add this for now.
    const isEmpty = content.trim() === "";

    // The tile starts with the actions menu or, when scored, an icon.
    // The two never show together: a scored tile has no menu.
    // A semantics-free root: the tile renders inside a ChoiceBank list
    // item, inside a blank, or standalone, so any landmark or list
    // semantics belong to those containers, not the tile.
    return (
        <div
            className={classNames(
                styles.tile,
                showCorrectness != null && styles[showCorrectness],
                disabled && styles.disabled,
                isDraggable && styles.draggable,
                isDragging && styles.dragging,
                inBlank && styles.inBlank,
                fillsBlank && styles.fillsBlank,
                compact && styles.compact,
            )}
            style={
                imageHeight != null
                    ? // eslint-disable-next-line no-restricted-syntax -- CSSProperties has no keys for CSS custom properties.
                      ({
                          "--answer-tile-image-height": `${imageHeight}px`,
                      } as React.CSSProperties)
                    : undefined
            }
            ref={dragRef}
        >
            {!disabled && (
                <span className={styles.startContainer}>
                    {showCorrectness == null ? (
                        <DndActionMenu
                            ref={menuRef}
                            label={label}
                            moveTargets={moveTargets}
                            onMove={onMove}
                            clearFromLabel={clearFromLabel}
                            onClear={onClear}
                            remainingUses={remainingUses}
                            // Always false: scored tiles remove the menu
                            // instead of disabling it, so a rendered menu
                            // is never disabled.
                            disabled={false}
                        />
                    ) : (
                        // An unlabeled PhosphorIcon is aria-hidden by
                        // default. The widget announces the result to
                        // screen readers, not the tile.
                        <PhosphorIcon
                            icon={scoredIcons[showCorrectness]}
                            size="medium"
                        />
                    )}
                </span>
            )}
            <div className={styles.content}>
                {isEmpty ? (
                    // An empty tile must have a spoken value.
                    <span className={a11yStyles.srOnly}>{label}</span>
                ) : (
                    <Renderer
                        content={content}
                        strings={strings}
                        onRender={onContentRender}
                    />
                )}
            </div>
        </div>
    );
}

const scoredIcons: Record<"correct" | "incorrect", string> = {
    correct: checkIcon,
    incorrect: xIcon,
};
