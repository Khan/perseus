import {getWidgetIdsFromContentByType} from "@khanacademy/perseus-core";
import * as React from "react";
import {forwardRef, useImperativeHandle} from "react";

import {AnswerTile} from "../../components/drag-and-drop/answer-tile";
import {ChoiceBank} from "../../components/drag-and-drop/choice-bank";
import {PerseusDndProvider} from "../../components/drag-and-drop/perseus-dnd-provider";
import {tempDndStrings as strings} from "../../components/drag-and-drop/temp-strings";
import {
    isTileInBank,
    remainingUses,
} from "../../components/drag-and-drop/tile-placements";
import {useTileMoveActions} from "../../components/drag-and-drop/use-tile-move-actions";
import {useWidestTileWidth} from "../../components/drag-and-drop/use-widest-tile-width";
import {usePerseusI18n} from "../../components/i18n-context";
import Renderer from "../../renderer";
import {sharedInitializeUserInput} from "../../user-input-manager";

import {FillInTheBlankContext} from "./fill-in-the-blank-context";
import styles from "./fill-in-the-blank.module.css";

import type {
    TilePlacements,
    TileUsage,
} from "../../components/drag-and-drop/tile-placements";
import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {
    PerseusFillInTheBlankUserInput,
    PerseusFillInTheBlankWidgetOptions,
} from "@khanacademy/perseus-core";

type FillInTheBlankProps = WidgetProps<
    PerseusFillInTheBlankWidgetOptions,
    PerseusFillInTheBlankUserInput
>;

/** Blank widget IDs have the form "blank n". */
function isBlankId(id: string): id is `blank ${number}` {
    return /^blank \d+$/.test(id);
}

/** Reads the blankId -> tileId placements out of the user input. */
function getPlacements(
    userInput: PerseusFillInTheBlankUserInput,
    blankIds: ReadonlyArray<string>,
): TilePlacements {
    const placements: Record<string, string> = {};
    for (const blankId of blankIds) {
        const selected = isBlankId(blankId)
            ? userInput[blankId]?.selected
            : null;
        if (selected != null) {
            placements[blankId] = selected;
        }
    }
    return placements;
}

/** Writes the placements back as each blank's user input. */
function getUserInput(
    placements: TilePlacements,
    blankIds: ReadonlyArray<string>,
): PerseusFillInTheBlankUserInput {
    const userInput: PerseusFillInTheBlankUserInput = {};
    for (const blankId of blankIds) {
        if (isBlankId(blankId)) {
            userInput[blankId] = {selected: placements[blankId] ?? null};
        }
    }
    return userInput;
}

/**
 * Fill in the Blank presents a passage with inline blanks above a choice bank
 * of answer tiles that the learner drags into them.
 */
const FillInTheBlankWidget = forwardRef<Widget, FillInTheBlankProps>(
    function FillInTheBlankWidget(props, ref) {
        // TODO(LEMS-4471): Write out the getPromptJSON function after checking
        useImperativeHandle(ref, () => ({}));

        return <FillInTheBlank {...props} />;
    },
);

/**
 * The widget's render: an answer zone (content with inline blanks) above
 * a choice bank of draggable tiles. It feeds the blank widgets through
 * FillInTheBlankContext.
 */
function FillInTheBlank({
    options,
    userInput,
    handleUserInput,
}: FillInTheBlankProps): React.ReactElement {
    const {content, widgets, tiles, maxUsesPerTile} = options;
    const {strings: i18nStrings} = usePerseusI18n();

    const tileUsage: TileUsage = maxUsesPerTile === 1 ? "single" : "multi";
    const maxUses = maxUsesPerTile === "unlimited" ? undefined : maxUsesPerTile;

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
    const placements = React.useMemo(
        () => getPlacements(userInput, blankIds),
        [userInput, blankIds],
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
        onPlacementsChange: (next) =>
            handleUserInput(getUserInput(next, blankIds)),
        tileUsage,
        getTileLabel: (tileId) => tilesById.get(tileId)?.label ?? "",
        getBlankLabel: (blankId) => blankLabels[blankId],
        blankIds,
    });

    const bankTiles = tiles
        .filter((tile) => isTileInBank(placements, tile.id, tileUsage, maxUses))
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
                              maxUses,
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
        <div
            className={styles.fillInTheBlank}
            data-testid="fill-in-the-blank-widget"
        >
            <PerseusDndProvider onDragEnd={handleDragEnd}>
                <FillInTheBlankContext.Provider
                    value={{renderPlacedTile, widestTileWidth: maxWidth}}
                >
                    <div className={styles.answerZone}>
                        <Renderer
                            content={content}
                            widgets={widgets}
                            userInput={userInput}
                            handleUserInput={(widgetId, blankInput) =>
                                handleUserInput({
                                    ...userInput,
                                    [widgetId]: blankInput,
                                })
                            }
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

function getStartUserInput(
    options: PerseusFillInTheBlankWidgetOptions,
    problemNum: number,
): PerseusFillInTheBlankUserInput {
    return sharedInitializeUserInput(options.widgets, problemNum);
}

export default {
    name: "fill-in-the-blank",
    displayName: "Fill in the Blank",
    widget: FillInTheBlankWidget,
    isLintable: false,
    hidden: true,
    getStartUserInput,
} satisfies WidgetExports<typeof FillInTheBlankWidget>;
