import {getWidgetIdsFromContentByType} from "@khanacademy/perseus-core";
import classNames from "classnames";
import * as React from "react";

import Renderer from "../../../renderer";
import {usePerseusI18n} from "../../i18n-context";
import {AnswerTile} from "../answer-tile";
import {ChoiceBank} from "../choice-bank";
import {PerseusDndProvider} from "../perseus-dnd-provider";
import {tempDndStrings as strings} from "../temp-strings";
import {isTileInBank, remainingUses} from "../tile-placements";
import {useTileMoveActions} from "../use-tile-move-actions";
import {useWidestTileWidth} from "../use-widest-tile-width";

import {FillInTheBlankContext} from "./fill-in-the-blank-context";
import styles from "./fill-in-the-blank.module.css";

import type {BlankRenderInfo} from "./fill-in-the-blank-context";
import type {TilePlacements, TileUsage} from "../tile-placements";
import type {PerseusWidgetsMap} from "@khanacademy/perseus-core";

export type FillInTheBlankTile = {
    id: string;
    /** Perseus markdown: text, TeX, or an image. "" = an empty tile. */
    content: string;
    /** Plain-text value for screen readers. */
    label: string;
    /** Display height in pixels for an image tile. */
    imageHeight?: 24 | 36 | 48 | 60 | 72 | 84 | 96;
};

export interface FillInTheBlankProps {
    /** Answer zone: Perseus markdown with [[☃ blank n]] markers. */
    content: string;
    /** The embedded blank widgets, keyed by marker name ("blank 1"). */
    widgets: PerseusWidgetsMap;
    tiles: ReadonlyArray<FillInTheBlankTile>;
    tileUsage: TileUsage;
    /** Multi-use only. Omitted = unlimited. */
    maxUsesPerTile?: number;
    /** Controlled placements: blankId -> tileId. */
    placements: TilePlacements;
    onPlacementsChange: (next: TilePlacements) => void;
    /**
     * How blanks get their measured width. "grow": blanks start small
     * and grow. "gate": the answer zone stays hidden until measured.
     */
    blankSizing?: "grow" | "gate";
    /**
     * How a filled blank sizes itself. "hug": the blank shrinks to its
     * tile, and the tile grows on hover to show the menu. "fixed": the
     * blank keeps the widest-tile width, and the tile fills it.
     */
    filledBlankStyle?: "hug" | "fixed";
}

const BANK_DROP_ID = "fitb-choice-bank";
/**
 * FillInTheBlank is the render side of the upcoming Fill in the Blank
 * widget: an answer zone (content with inline blanks) above a choice
 * bank of draggable tiles. It owns the placement state and feeds the
 * blank widgets through FillInTheBlankContext.
 *
 * Proof of concept. Plan: widgets/fill-in-the-blank/notes/.
 */
export function FillInTheBlank(props: FillInTheBlankProps): React.ReactElement {
    const {
        content,
        widgets,
        tiles,
        tileUsage,
        maxUsesPerTile,
        placements,
        onPlacementsChange,
        blankSizing = "grow",
        filledBlankStyle = "hug",
    } = props;
    const {strings: i18nStrings} = usePerseusI18n();

    const blankIds = React.useMemo(
        // The Set removes repeats: one blank can appear twice in
        // authored content.
        () => [
            ...new Set(
                getWidgetIdsFromContentByType("blank", content, widgets),
            ),
        ],
        [content, widgets],
    );
    const blankLabels = React.useMemo(() => {
        const labels: Record<string, string> = {};
        blankIds.forEach((blankId, index) => {
            labels[blankId] = strings.blankLabel({num: index + 1});
        });
        return labels;
    }, [blankIds]);
    const tilesById = React.useMemo(
        () => new Map(tiles.map((tile) => [tile.id, tile])),
        [tiles],
    );

    const {containerRef, remeasure, maxWidth, isMeasured} =
        useWidestTileWidth();

    const {
        handleMove,
        handleClear,
        handleDragEnd,
        firstBankMenuRef,
        placedMenuRef,
    } = useTileMoveActions({
        placements,
        onPlacementsChange,
        tileUsage,
        getTileLabel: (tileId) => tilesById.get(tileId)?.label ?? "",
        getBlankLabel: (blankId) => blankLabels[blankId],
        blankIds,
        bankDropId: BANK_DROP_ID,
    });

    const bankTiles = tiles
        .filter((tile) =>
            isTileInBank(placements, tile.id, tileUsage, maxUsesPerTile),
        )
        .map((tile, index) => {
            const remaining = remainingUses(
                placements,
                tile.id,
                tileUsage,
                maxUsesPerTile,
            );
            return {
                tileId: tile.id,
                content: tile.content,
                label: tile.label,
                imageHeight: tile.imageHeight,
                moveTargets: blankIds.map((blankId) => ({
                    id: blankId,
                    label: blankLabels[blankId],
                })),
                onMove: (targetId: string) =>
                    handleMove({tileId: tile.id}, targetId, true),
                remainingUses:
                    tileUsage === "multi" && remaining != null
                        ? remaining
                        : undefined,
                menuRef: index === 0 ? firstBankMenuRef : undefined,
            };
        });

    const isFixed = filledBlankStyle === "fixed";

    const getBlankRenderInfo = (
        blankId: string,
        displayType: "normal" | "superscript" | "subscript",
    ): BlankRenderInfo => {
        const tileId = placements[blankId];
        const tile = tileId != null ? tilesById.get(tileId) : undefined;
        if (tile == null) {
            return {
                placedTile: null,
                placedTileId: null,
                keepsWidthWhenFilled: isFixed,
                widestTileWidth: maxWidth,
            };
        }
        return {
            placedTile: (
                <AnswerTile
                    tileId={tile.id}
                    fromBlankId={blankId}
                    content={tile.content}
                    label={tile.label}
                    imageHeight={tile.imageHeight}
                    inBlank={true}
                    compact={displayType !== "normal"}
                    fillsBlank={isFixed && displayType === "normal"}
                    moveTargets={blankIds
                        .filter((id) => id !== blankId)
                        .map((id) => ({id, label: blankLabels[id]}))}
                    onMove={(targetId) =>
                        handleMove(
                            {tileId: tile.id, fromBlankId: blankId},
                            targetId,
                            true,
                        )
                    }
                    clearFromLabel={blankLabels[blankId]}
                    onClear={() => handleClear(blankId, true)}
                    menuRef={placedMenuRef(blankId)}
                />
            ),
            placedTileId: tile.id,
            keepsWidthWhenFilled: isFixed,
            widestTileWidth: maxWidth,
        };
    };

    // Tiles with small values keep the inline layout at all widths.
    // The size is judged on the TeX source with the delimiters
    // stripped, so a long command ($\infty$) counts as long even
    // though it renders one glyph. The label is not used: it is
    // screen-reader text and can be longer than what shows on the tile
    // (an empty tile shows "" but is labeled "empty").
    const smallValues = tiles.every(
        (tile) => tile.content.replace(/\$/g, "").trim().length <= 3,
    );

    // The hidden copy keeps every tile measurable. `inert` keeps its
    // controls out of the tab order and assistive tech.
    const setMeasurementRef = React.useCallback(
        (element: HTMLElement | null) => {
            element?.setAttribute("inert", "");
            containerRef(element);
        },
        [containerRef],
    );

    return (
        <div className={styles.fillInTheBlank}>
            <PerseusDndProvider onDragEnd={handleDragEnd}>
                <FillInTheBlankContext.Provider value={{getBlankRenderInfo}}>
                    <div
                        className={classNames(
                            styles.answerZone,
                            (smallValues || filledBlankStyle === "fixed") &&
                                styles.noReflow,
                        )}
                        style={
                            blankSizing === "gate" && !isMeasured
                                ? {visibility: "hidden"}
                                : undefined
                        }
                    >
                        <Renderer
                            content={content}
                            widgets={widgets}
                            strings={i18nStrings}
                        />
                    </div>
                </FillInTheBlankContext.Provider>
                <ChoiceBank
                    label={strings.choices}
                    answerTiles={bankTiles}
                    bankId={BANK_DROP_ID}
                />
            </PerseusDndProvider>
            <PerseusDndProvider>
                <div
                    aria-hidden="true"
                    className={styles.measurement}
                    key={tiles.map((tile) => tile.id).join(" ")}
                    ref={setMeasurementRef}
                >
                    {tiles.map((tile) => (
                        <AnswerTile
                            key={tile.id}
                            tileId={`measure__${tile.id}`}
                            content={tile.content}
                            label={tile.label}
                            imageHeight={tile.imageHeight}
                            moveTargets={[]}
                            onMove={() => {}}
                            onContentRender={remeasure}
                        />
                    ))}
                </div>
            </PerseusDndProvider>
        </div>
    );
}
