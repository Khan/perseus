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

export type AnswerTileState = "rest" | "correct" | "incorrect" | "disabled";

/**
 * Widget-owned data the tile forwards to its DndActionMenu — the menu's
 * props minus the ones the tile supplies itself. Derived so a new menu prop
 * automatically surfaces here (or fails compilation if the tile should own
 * it) instead of silently drifting.
 */
export type AnswerTileMenuConfig = Omit<
    DndActionMenuProps,
    // keyof Pick<> (rather than bare string literals) makes a rename of one
    // of these props in dnd-action-menu fail compilation HERE, instead of
    // Omit silently accepting a stale key.
    keyof Pick<DndActionMenuProps, "label" | "disabled">
> & {
    /**
     * Reaches the menu's opener button (DndActionMenu's forwarded ref) —
     * for the parent's after-move focus return. An added field because a
     * forwarded ref isn't part of the menu's props type.
     */
    menuRef?: React.Ref<HTMLButtonElement>;
};

interface AnswerTileProps {
    /** Unique identifier for this tile; used for scoring, dnd wiring, test ids. */
    tileId: string;
    /** Perseus markdown for the tile face: text, TeX, or an image. "" for an Empty tile. */
    content: string;
    /**
     * Plain-text spoken value of the tile, translated — names the menu opener
     * via aria-labelledby ("Bongo. Actions menu."). Not derivable from
     * markdown (TeX/images), so it's authored/passed explicitly.
     * For Empty tiles, pass the translated "(empty)".
     */
    label: string;
    /**
     * Scored/interaction state, owned by the parent widget:
     * - "rest": default chrome; the menu renders when `menu` is non-null.
     * - "correct": green 2px border, check icon replaces the menu, no shadow.
     * - "incorrect": red 2px border, x icon replaces the menu, no shadow.
     * - "disabled": grey content, no shadow, leading control removed.
     */
    state: AnswerTileState;
    /**
     * Data for the tile's DndActionMenu. null = no menu (e.g. a static
     * preview). Ignored unless state is "rest" — scored tiles never show it.
     */
    menu: AnswerTileMenuConfig | null;
    /**
     * "always" (default) in choice banks and column blanks;
     * "on-hover-or-focus" when the tile sits in an inline blank, so the
     * string stays readable. Optional — it's meaningless when no menu
     * renders, so scored/preview call sites shouldn't have to pass it.
     */
    menuVisibility?: "always" | "on-hover-or-focus";
}

/**
 * AnswerTile is the card a learner moves into a blank in the Drag-and-Drop
 * widget family. It renders authored markdown content (text, TeX, or an
 * image) inside the tile chrome, composes the DndActionMenu at its leading
 * edge, and shows the parent-set scored states.
 *
 * Purely presentational for now — dnd-kit wiring comes in a later ticket.
 */
export function AnswerTile(props: AnswerTileProps): React.ReactElement {
    const {tileId, content, label, state, menu, menuVisibility} = props;
    const {strings} = usePerseusI18n();

    const stateIcon = stateIcons[state];
    const showMenu = state === "rest" && menu != null;

    let leadingBox: React.ReactNode = null;
    if (showMenu) {
        const {menuRef, ...menuProps} = menu;
        leadingBox = (
            <span
                className={classNames(
                    styles.menuBox,
                    menuVisibility === "on-hover-or-focus" &&
                        styles.menuOnDemand,
                )}
            >
                <DndActionMenu
                    ref={menuRef}
                    {...menuProps}
                    label={label}
                    disabled={false}
                />
            </span>
        );
    } else if (stateIcon) {
        leadingBox = (
            <span
                className={styles.stateIcon}
                // Decorative — the widget's scored rendering announces
                // correctness, not the tile.
                aria-hidden="true"
                data-testid={`answer-tile-state-icon-${tileId}`}
            >
                <PhosphorIcon icon={stateIcon} size="medium" />
            </span>
        );
    }

    return (
        <div
            className={classNames(styles.tile, stateClasses[state])}
            data-testid={`answer-tile-${tileId}`}
        >
            {leadingBox}
            <span
                className={classNames(
                    styles.content,
                    content === "" && styles.emptyContent,
                )}
            >
                {content === "" ? (
                    // An empty tile still needs a spoken value.
                    <span className={a11yStyles.srOnly}>{label}</span>
                ) : (
                    <Renderer content={content} strings={strings} />
                )}
            </span>
        </div>
    );
}

// These live at module scope so they keep a stable identity across renders,
// and at the end of the file per convention.

const stateClasses: Record<AnswerTileState, string> = {
    rest: styles.rest,
    correct: styles.correct,
    incorrect: styles.incorrect,
    disabled: styles.disabled,
};

const stateIcons: Partial<Record<AnswerTileState, string>> = {
    correct: checkIcon,
    incorrect: xIcon,
};
