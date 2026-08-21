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

import type {DndActionMenuProps} from "../dnd-action-menu";

/**
 * The widget-supplied data for a tile's actions menu: the blanks the tile
 * can move to, the move/clear callbacks, and the remaining-use count.
 *
 * Derived from DndActionMenuProps minus the props the tile fills in
 * itself (label, disabled), so it tracks the menu's API automatically.
 */
export type AnswerTileMenuConfig = Omit<
    DndActionMenuProps,
    // keyof Pick<> instead of plain strings: if the menu renames one of
    // these props, this line fails to compile instead of going stale.
    keyof Pick<DndActionMenuProps, "label" | "disabled">
> & {
    /**
     * This ref points to the menu's opener button. The parent uses it to
     * move focus after a tile moves. It is a separate field because a
     * forwarded ref is not part of the menu's props type.
     */
    menuRef?: React.Ref<HTMLButtonElement>;
};

interface AnswerTileProps {
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
     * "incorrect" shows a red border and an x icon. Both remove the
     * menu and the shadow.
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
     * Data for the tile's DndActionMenu. Pass null to show no menu, for
     * example in a static preview. Ignored on scored and disabled tiles,
     * which never show the menu.
     */
    menu: AnswerTileMenuConfig | null;
    /**
     * When the menu is visible. Use "always" (the default) in choice
     * banks and column blanks. Use "on-hover-or-focus" in an inline
     * blank, so the sentence stays easy to read. This prop does nothing
     * when no menu shows.
     */
    menuVisibility?: "always" | "on-hover-or-focus";
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
    const {tileId, content, label, showCorrectness, disabled, menu} = props;
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
            {menu != null && !disabled && showCorrectness == null && (
                <TileActionsMenu
                    menu={menu}
                    label={label}
                    visibility={props.menuVisibility}
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

/** The actions menu at the start of a resting tile. */
function TileActionsMenu(props: {
    menu: AnswerTileMenuConfig;
    label: string;
    visibility: AnswerTileProps["menuVisibility"];
}): React.ReactElement {
    const {menu, label, visibility} = props;
    const {menuRef, ...menuProps} = menu;
    return (
        <span
            className={classNames(
                styles.startContainer,
                visibility === "on-hover-or-focus" && styles.menuOnDemand,
            )}
        >
            <DndActionMenu
                ref={menuRef}
                {...menuProps}
                label={label}
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
