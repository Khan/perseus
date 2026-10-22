import {getWidgetIdsFromContentByType} from "@khanacademy/perseus-core";
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

import type {TilePlacements, TileUsage} from "../tile-placements";
import type {PerseusWidgetsMap} from "@khanacademy/perseus-core";

export type FillInTheBlankTile = {
    id: string;
    /** Perseus markdown: text, TeX, or an image. */
    content: string;
    /** Plain-text value for screen readers. */
    label: string;
    /** Display height in pixels for an image tile. */
    imageHeight?: number;
};

export interface FillInTheBlankProps {
    /** Answer zone: Perseus markdown with [[☃ blank n]] markers. */
    content: string;
    /** The embedded blank widgets, keyed by marker name ("blank 1"). */
    widgets: PerseusWidgetsMap;
    /** All possible answer tiles. */
    tiles: ReadonlyArray<FillInTheBlankTile>;
    /* Specifies if tiles are single- or multi-use. */
    tileUsage: TileUsage;
    /** Multi-use only. Omitted = unlimited. */
    maxUsesPerTile?: number;
    /** Controlled placements: blankId -> tileId. */
    placements: TilePlacements;
    onPlacementsChange: (next: TilePlacements) => void;
}

/**
 * FillInTheBlank is the render side of the upcoming Fill in the Blank
 * widget: an answer zone (content with inline blanks) above a choice
 * bank of draggable tiles. It feeds the blank widgets through
 * FillInTheBlankContext.
 */
export function FillInTheBlank({
    content,
    widgets,
    tiles,
    tileUsage,
    maxUsesPerTile,
    placements,
    onPlacementsChange,
}: FillInTheBlankProps): React.ReactElement {
    const {strings: i18nStrings} = usePerseusI18n();

    const blankIds = React.useMemo(
        // A blank can appear more than once in authored content.
        () => [
            ...new Set(
                getWidgetIdsFromContentByType("blank", content, widgets),
            ),
        ],
        [content, widgets],
    );
    const blankLabels = React.useMemo(
        () =>
            Object.fromEntries(
                blankIds.map((blankId, index) => [
                    blankId,
                    strings.blankLabel({num: index + 1}),
                ]),
            ),
        [blankIds],
    );
    const tilesById = React.useMemo(
        () => new Map(tiles.map((tile) => [tile.id, tile])),
        [tiles],
    );

    const {containerRef, remeasure, maxWidth} = useWidestTileWidth();

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
    });

    const bankTiles = tiles
        .filter((tile) =>
            isTileInBank(placements, tile.id, tileUsage, maxUsesPerTile),
        )
        .map((tile, index) => (
            <AnswerTile
                key={tile.id}
                tileId={tile.id}
                content={tile.content}
                label={tile.label}
                imageHeight={tile.imageHeight}
                moveTargets={blankIds.map((id) => ({
                    id,
                    label: blankLabels[id],
                }))}
                onMove={(targetId) => handleMove({tileId: tile.id}, targetId)}
                remainingUses={
                    tileUsage === "multi"
                        ? remainingUses(
                              placements,
                              tile.id,
                              tileUsage,
                              maxUsesPerTile,
                          ) ?? undefined
                        : undefined
                }
                menuRef={index === 0 ? firstBankMenuRef : undefined}
            />
        ));

    const renderPlacedTile = (blankId: string): React.ReactNode => {
        const tile = tilesById.get(placements[blankId]);
        if (tile == null) {
            return null;
        }
        return (
            <AnswerTile
                tileId={tile.id}
                fromBlankId={blankId}
                content={tile.content}
                label={tile.label}
                imageHeight={tile.imageHeight}
                hidesMenuAtRest={true}
                moveTargets={blankIds
                    .filter((id) => id !== blankId)
                    .map((id) => ({id, label: blankLabels[id]}))}
                onMove={(targetId) =>
                    handleMove(
                        {tileId: tile.id, fromBlankId: blankId},
                        targetId,
                    )
                }
                clearFromLabel={blankLabels[blankId]}
                onClear={() => handleClear(blankId)}
                menuRef={placedMenuRef(blankId)}
            />
        );
    };

    // React 18 has no `inert` prop, so set it on the element. It keeps
    // the hidden copy's controls out of the tab order and assistive tech.
    // (The hidden invisible tiles are used to determine the widest tile size,
    // so they users should not be able to interact with them in any way.)
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
                <FillInTheBlankContext.Provider
                    value={{renderPlacedTile, widestTileWidth: maxWidth}}
                >
                    <div className={styles.answerZone}>
                        <Renderer
                            content={content}
                            widgets={widgets}
                            strings={i18nStrings}
                        />
                    </div>
                </FillInTheBlankContext.Provider>
                <ChoiceBank label={strings.choices}>{bankTiles}</ChoiceBank>
            </PerseusDndProvider>
            {/* A separate provider keeps the measurement copies out of the
                real drag-and-drop. Only used for determining measurements.*/}
            <PerseusDndProvider>
                <div
                    aria-hidden="true"
                    className={styles.measurement}
                    // Remount, and so remeasure, when the tile set changes.
                    key={tiles.map((tile) => tile.id).join(" ")}
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
