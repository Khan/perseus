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
 * The widget owns this data. The tile passes it to the DndActionMenu.
 * The type comes from the menu's own props, without the props that the
 * tile supplies itself. When the menu gets a new prop, this type includes
 * it automatically. The two components cannot go out of sync.
 */
export type AnswerTileMenuConfig = Omit<
    DndActionMenuProps,
    // We use keyof Pick<> here, not plain strings. If one of these prop
    // names changes in dnd-action-menu, the code will not compile. A
    // plain Omit would accept the old name without an error.
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
     * The scored state of the tile. The parent widget owns it:
     * - "rest": default look; the menu shows when `menu` is not null.
     * - "correct": green 2px border and a check icon. No menu, no shadow.
     * - "incorrect": red 2px border and an x icon. No menu, no shadow.
     * - "disabled": grey content. No menu, no icon, no shadow.
     */
    state: AnswerTileState;
    /**
     * Data for the tile's DndActionMenu. Pass null to show no menu, for
     * example in a static preview. Scored tiles never show the menu, so
     * this prop only applies when the state is "rest".
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
 * leading edge. The parent widget sets the scored states.
 *
 * The tile is only visual for now. A later ticket adds the drag wiring.
 */
export function AnswerTile(props: AnswerTileProps): React.ReactElement {
    const {tileId, content, label, state, menu, menuVisibility} = props;
    const {strings} = usePerseusI18n();

    const stateIcon = stateIcons[state];
    const showMenu = state === "rest" && menu != null;
    // Whitespace-only content would render an invisible, unlabeled tile.
    const isEmpty = content.trim() === "";

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
                    // Always false: scored tiles remove the menu instead
                    // of disabling it, and they never reach this branch.
                    disabled={false}
                />
            </span>
        );
    } else if (stateIcon) {
        leadingBox = (
            <span
                className={styles.stateIcon}
                // This icon is decorative. The widget announces the
                // result to screen readers, not the tile.
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
