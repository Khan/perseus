import * as React from "react";
import {forwardRef, useImperativeHandle} from "react";

import {AnswerTile} from "../../components/drag-and-drop/answer-tile";
import {PerseusDndProvider} from "../../components/drag-and-drop/perseus-dnd-provider";
import {useTileMoveActions} from "../../components/drag-and-drop/use-tile-move-actions";
import {usePerseusI18n} from "../../components/i18n-context";
import Renderer from "../../renderer";
import {BlankContext} from "../blank/blank-context";

import styles from "./fill-in-the-blank.module.css";
import {getTileUsage, TileBank} from "./tile-bank";
import {useFITBTiles} from "./use-fitb-tiles";

import type {TilePlacements} from "../../components/drag-and-drop/tile-placements";
import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {
    PerseusFillInTheBlankUserInput,
    PerseusFillInTheBlankWidgetOptions,
} from "@khanacademy/perseus-core";

type FillInTheBlankProps = WidgetProps<
    PerseusFillInTheBlankWidgetOptions,
    PerseusFillInTheBlankUserInput
>;

/** Writes the placements back as each blank's user input. */
function getUserInput(
    placements: TilePlacements,
    blankIds: ReadonlyArray<string>,
): PerseusFillInTheBlankUserInput {
    const userInput: PerseusFillInTheBlankUserInput = {};
    for (const blankId of blankIds) {
        userInput[blankId] = {selected: placements[blankId] ?? null};
    }
    return userInput;
}

/**
 * Fill in the Blank presents a passage with inline blanks above a choice bank
 * of answer tiles that the learner drags into them.
 */
const FillInTheBlankWidget = forwardRef<Widget, FillInTheBlankProps>(
    function FillInTheBlankWidget({options, userInput, handleUserInput}, ref) {
        // TODO(LEMS-4471): Write out the getPromptJSON function after checking
        useImperativeHandle(ref, () => ({}));

        const {content, widgets, tiles} = options;
        const {strings: i18nStrings} = usePerseusI18n();

        const {blankIds, blankLabels, tilesById, placements} = useFITBTiles({
            content,
            widgets,
            tiles,
            userInput,
        });

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
            getTileUsage: (tileId) => {
                const tile = tilesById.get(tileId);
                return tile == null ? "single" : getTileUsage(tile);
            },
            getTileLabel: (tileId) => tilesById.get(tileId)?.label ?? "",
            getBlankLabel: (blankId) => blankLabels[blankId],
            blankIds,
        });

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

        return (
            <div className={styles.fillInTheBlank}>
                <PerseusDndProvider onDragEnd={handleDragEnd}>
                    <BlankContext.Provider value={{renderPlacedTile}}>
                        <div className={styles.answerZone}>
                            <Renderer
                                content={content}
                                widgets={widgets}
                                strings={i18nStrings}
                            />
                        </div>
                    </BlankContext.Provider>
                    <TileBank
                        tiles={tiles}
                        placements={placements}
                        blankIds={blankIds}
                        blankLabels={blankLabels}
                        onMove={handleMove}
                        firstMenuRef={firstBankMenuRef}
                    />
                </PerseusDndProvider>
            </div>
        );
    },
);

function getStartUserInput(): PerseusFillInTheBlankUserInput {
    return {};
}

export default {
    name: "fill-in-the-blank",
    displayName: "Fill in the Blank",
    widget: FillInTheBlankWidget,
    isLintable: false,
    hidden: true,
    getStartUserInput,
} satisfies WidgetExports<typeof FillInTheBlankWidget>;
