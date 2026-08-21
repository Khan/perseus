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
     * The unique identifier of this tile. It is used for scoring, drag
     * wiring, and test ids.
     */
    tileId: string;
    /**
     * Perseus markdown for the tile face: text, TeX, or an image.
     * Use "" for an empty tile.
     */
    content: string;
    /**
     * The spoken value of the tile, as translated plain text. It names
     * the menu opener ("Bongo. Actions menu."). We cannot compute it
     * from TeX or image markdown, so the caller must supply it.
     * For an empty tile, pass the translated "(empty)".
     */
    label: string;
    /**
     * The scored result for a tile placed in a blank. Omit before
     * scoring. "correct" shows a green border and a check icon.
     * "incorrect" shows a red border and an x icon. Both replace the
     * menu and remove the shadow.
     *
     * A scored tile is either placed (showCorrectness) or unused
     * (disabled), never both. If both arrive, showCorrectness wins.
     */
    showCorrectness?: "correct" | "incorrect";
    /**
     * Dims the tile and removes its menu and shadow. The widgets use
     * this for unused choice-bank tiles after scoring.
     */
    disabled?: boolean;
    /**
     * Blanks the tile can move to. An empty array is valid: a placed
     * tile in a one-blank exercise can only be cleared, and the menu
     * disables itself when it has no actions at all.
     */
    moveTargets: ReadonlyArray<MoveTarget>;
    /** Called with the target blank's id when a move action is selected. */
    onMove: (targetId: string) => void;
    /**
     * Visible label of the blank/column the tile currently sits in,
     * spoken as "Clear from Blank 1". Provide with onClear when the
     * tile is placed.
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
 * leading edge. The parent widget sets showCorrectness and disabled
 * after scoring.
 *
 * The tile is only visual for now. A later ticket adds the drag wiring.
 */
export function AnswerTile(props: AnswerTileProps): React.ReactElement {
    const {tileId, content, label, showCorrectness, disabled} = props;
    const {strings} = usePerseusI18n();

    // Whitespace-only content would render an invisible, unlabeled tile.
    // This protection might not be needed, depending on how we implement
    // the Content Editor experience, but it seemed wise to add this for now.
    const isEmpty = content.trim() === "";

    // The tile starts with the actions menu or, when scored, an icon.
    // The two never show together: a scored tile has no menu.
    return (
        <div
            className={classNames(
                styles.tile,
                showCorrectness != null && styles[showCorrectness],
                disabled && styles.disabled,
            )}
            data-testid={`answer-tile-${tileId}`}
        >
            {!disabled && showCorrectness == null && (
                <TileActionsMenu
                    label={label}
                    moveTargets={props.moveTargets}
                    onMove={props.onMove}
                    clearFromLabel={props.clearFromLabel}
                    onClear={props.onClear}
                    remainingUses={props.remainingUses}
                    menuRef={props.menuRef}
                />
            )}
            {showCorrectness != null && (
                <TileScoredIcon
                    icon={scoredIcons[showCorrectness]}
                    tileId={tileId}
                />
            )}
            <span
                className={classNames(
                    styles.content,
                    isEmpty && styles.emptyContent,
                )}
            >
                {isEmpty ? (
                    // An empty tile must have a spoken value.
                    <span className={a11yStyles.srOnly}>{label}</span>
                ) : (
                    <Renderer content={content} strings={strings} />
                )}
            </span>
        </div>
    );
}

/** The actions menu at the start of an unscored tile. */
function TileActionsMenu(props: {
    label: string;
    moveTargets: ReadonlyArray<MoveTarget>;
    onMove: (targetId: string) => void;
    clearFromLabel?: string;
    onClear?: () => void;
    remainingUses?: number;
    menuRef?: React.Ref<HTMLButtonElement>;
}): React.ReactElement {
    return (
        <span className={styles.startContainer}>
            <DndActionMenu
                ref={props.menuRef}
                label={props.label}
                moveTargets={props.moveTargets}
                onMove={props.onMove}
                clearFromLabel={props.clearFromLabel}
                onClear={props.onClear}
                remainingUses={props.remainingUses}
                // Always false: scored tiles remove the menu instead
                // of disabling it, so a rendered menu is never disabled.
                disabled={false}
            />
        </span>
    );
}

/** The check or x icon at the start of a scored tile. */
function TileScoredIcon(props: {
    icon: string;
    tileId: string;
}): React.ReactElement {
    return (
        <span
            className={styles.startContainer}
            // This icon is decorative. The widget announces the
            // result to screen readers, not the tile.
            aria-hidden="true"
            data-testid={`answer-tile-state-icon-${props.tileId}`}
        >
            <PhosphorIcon icon={props.icon} size="medium" />
        </span>
    );
}

const scoredIcons: Record<"correct" | "incorrect", string> = {
    correct: checkIcon,
    incorrect: xIcon,
};
