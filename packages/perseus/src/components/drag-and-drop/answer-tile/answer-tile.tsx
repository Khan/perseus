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

/** What a scored tile shows. Each value names a CSS class in the module. */
export type TileScoring = "correct" | "incorrect" | "unused";

export interface AnswerTileProps {
    /**
     * The unique identifier of an Answer Tile, which is used
     * for both scoring and dragging.
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
}

/**
 * AnswerTile is the card that a learner moves into a blank. It is part of
 * the Drag-and-Drop widget family. The tile shows authored markdown
 * content: text, TeX, or an image. It puts the DndActionMenu at its
 * leading edge. The parent widget sets `scoring` after scoring.
 *
 * The tile is only visual for now. A later ticket adds the drag wiring.
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
    } = props;
    const {strings} = usePerseusI18n();

    // Whitespace-only content would render an invisible, unlabeled tile.
    const isEmpty = content.trim() === "";

    const tileClasses = classNames(
        styles.tile,
        scoring != null && styles[scoring],
    );

    // What the tile leads with. The menu is the normal state; scoring
    // replaces it with a result icon, or with nothing for an unused
    // tile, which has no action to offer and no result to report.
    const renderTileStart = () => {
        if (scoring === "unused") {
            return null;
        }
        if (scoring != null) {
            // The icon is decoration: the widget announces the result
            // to screen readers, not the tile.
            return (
                <div className={styles.startContainer}>
                    <PhosphorIcon
                        aria-hidden="true"
                        icon={scoredIcons[scoring]}
                        size="medium"
                    />
                </div>
            );
        }
        return (
            <div className={styles.startContainer}>
                <DndActionMenu
                    ref={menuRef}
                    tileLabel={label}
                    moveTargets={moveTargets}
                    onMove={onMove}
                    clearFromLabel={clearFromLabel}
                    onClear={onClear}
                    remainingUses={remainingUses}
                />
            </div>
        );
    };

    // The tile face: the authored markdown or, for an empty tile, a
    // spoken value alone.
    const renderTileContent = () => {
        if (isEmpty) {
            return <span className={a11yStyles.srOnly}>{label}</span>;
        }
        return <Renderer content={content} strings={strings} />;
    };

    return (
        <div className={tileClasses}>
            {renderTileStart()}
            <div className={styles.content}>{renderTileContent()}</div>
        </div>
    );
}

const scoredIcons: Record<"correct" | "incorrect", string> = {
    correct: checkIcon,
    incorrect: xIcon,
};
