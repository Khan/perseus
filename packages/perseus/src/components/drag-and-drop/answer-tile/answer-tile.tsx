import {useDraggable} from "@dnd-kit/react";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import checkIcon from "@phosphor-icons/core/regular/check.svg";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import classNames from "classnames";
import * as React from "react";

import Renderer from "../../../renderer";
import a11yStyles from "../../../styles/a11y.module.css";
import {usePerseusI18n} from "../../i18n-context";
import {cssVariable} from "../css-variable";
import {DndActionMenu} from "../dnd-action-menu";
import {tileDragId} from "../drag-ids";

import styles from "./answer-tile.module.css";

import type {MoveTarget} from "../dnd-action-menu";

/** What a scored tile shows. Each value names a CSS class in the module. */
export type TileScoring = "correct" | "incorrect" | "unused";

export interface AnswerTileProps {
    /** The tile that moves, named as the widget's placements name it. */
    tileId: string;
    /**
     * The blank this tile sits in. Omit for a tile in the choice bank.
     * The tile reports both ids to dnd-kit, so a drop knows what moved
     * and where it came from.
     */
    fromBlankId?: string;
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
     * The result the tile shows once the question is scored. A placed tile
     * is "correct" or "incorrect"; a tile the learner left in the choice
     * bank is "unused", which dims it. Omit it before scoring.
     *
     * A scored tile has no menu and cannot be dragged, whichever result
     * it shows.
     */
    scoring?: TileScoring;
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
     * Set true for a tile whose menu stays hidden until hover or focus.
     * Fill in the Blank uses this for a tile in an inline blank, to keep
     * the line of text short at rest.
     */
    hidesMenuAtRest?: boolean;
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
 * leading edge. The parent widget sets `scoring` once the question is
 * scored.
 */
export function AnswerTile(props: AnswerTileProps): React.ReactElement {
    const {
        content,
        label,
        scoring,
        moveTargets,
        onMove,
        clearFromLabel,
        onClear,
        remainingUses,
        menuRef,
        tileId,
        fromBlankId,
        hidesMenuAtRest,
        fillsBlank,
        onContentRender,
        imageHeight,
        compact,
    } = props;
    const {strings} = usePerseusI18n();

    // A scored tile loses its drag function (per the Drag-and-Drop
    // Overview spec).
    const isDraggable = scoring == null;
    const dragData = {tileId, fromBlankId};
    const {ref: dragRef, isDragging} = useDraggable({
        id: tileDragId(dragData),
        data: dragData,
        disabled: !isDraggable,
    });

    // Whitespace-only content would render an invisible, unlabeled tile.
    const isEmpty = content.trim() === "";

    const tileClasses = classNames(
        styles.tile,
        scoring != null && styles[scoring],
        isDraggable && styles.draggable,
        isDragging && styles.dragging,
        hidesMenuAtRest && styles.hidesMenuAtRest,
        fillsBlank && styles.fillsBlank,
        compact && styles.compact,
    );

    // What the tile leads with, one branch per scoring state.
    const renderTileStart = () => {
        // An unused tile leads with nothing: it has no action to offer
        // and no result to report.
        if (scoring === "unused") {
            return null;
        }
        if (scoring == null) {
            return (
                <DndActionMenu
                    ref={menuRef}
                    tileLabel={label}
                    moveTargets={moveTargets}
                    onMove={onMove}
                    clearFromLabel={clearFromLabel}
                    onClear={onClear}
                    remainingUses={remainingUses}
                />
            );
        }
        // The icon is decoration: the widget announces the result to
        // screen readers, not the tile.
        return (
            <PhosphorIcon
                aria-hidden="true"
                icon={scoredIcons[scoring]}
                size="medium"
            />
        );
    };
    const tileStart = renderTileStart();

    const imageHeightStyle =
        imageHeight != null
            ? cssVariable("--answer-tile-image-height", `${imageHeight}px`)
            : undefined;

    // A semantics-free root: the tile renders inside a ChoiceBank list
    // item, inside a blank, or standalone, so any landmark or list
    // semantics belong to those containers, not the tile.
    return (
        <div className={tileClasses} style={imageHeightStyle} ref={dragRef}>
            {tileStart != null && (
                <div className={styles.startContainer}>{tileStart}</div>
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
