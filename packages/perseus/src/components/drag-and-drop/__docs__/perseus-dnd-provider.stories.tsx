import * as React from "react";

import {AnswerTile} from "../answer-tile";
import {generateAnswerTileProps} from "../answer-tile/answer-tile.testdata";
import {BlankComponent} from "../blank";
import {ChoiceBank} from "../choice-bank";
import {PerseusDndProvider} from "../perseus-dnd-provider";

import type {DragEndEvent} from "@dnd-kit/react";
import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * `PerseusDndProvider` is the drag-and-drop context that the Drag-and-Drop
 * widget family renders around its draggables (`AnswerTile`) and droppables
 * (`ChoiceBank` and `BlankComponent`). Without it, the tiles render but do
 * not respond to a drag.
 *
 * The default story is a small working playground: drag a tile from the
 * bank into a blank, between blanks, or back to the bank. Each tile's
 * action menu moves it too — both input paths drive the same state, which
 * is the contract the real widgets will follow.
 */
const meta: Meta<typeof PerseusDndProvider> = {
    title: "Components/Drag and Drop/Perseus Dnd Provider",
    component: PerseusDndProvider,
    tags: ["!manifest"],
};

export default meta;

type Story = StoryObj<typeof PerseusDndProvider>;

const SAMPLE_TILES = [
    "Bingo Bongo",
    "$x²$",
    "$42$",
    "H₂O",
    "$\\sqrt{a^2 + b^2}$",
];

const sampleTiles = SAMPLE_TILES.map((value, index) =>
    generateAnswerTileProps({
        tileId: `tile-${index}`,
        content: value,
        label: value,
    }),
);

const BLANKS = [
    {id: "blank-1", label: "Blank 1"},
    {id: "blank-2", label: "Blank 2"},
    {id: "blank-3", label: "Blank 3"},
];

const BANK_ID = "choice-bank";

function DndPlayground(): React.ReactElement {
    // blankId -> tileId of the placed tile; a missing key means empty.
    const [placements, setPlacements] = React.useState<Record<string, string>>(
        {},
    );

    const placeTile = (tileId: string, blankId: string) => {
        setPlacements((previous) => {
            const next: Record<string, string> = {};
            for (const [blank, tile] of Object.entries(previous)) {
                // A tile occupies one blank at a time, and dropping on a
                // full blank evicts its tile back to the bank.
                if (tile !== tileId && blank !== blankId) {
                    next[blank] = tile;
                }
            }
            next[blankId] = tileId;
            return next;
        });
    };

    const clearTile = (tileId: string) => {
        setPlacements((previous) =>
            Object.fromEntries(
                Object.entries(previous).filter(([, tile]) => tile !== tileId),
            ),
        );
    };

    const handleDragEnd = ({operation}: DragEndEvent) => {
        const {source, target} = operation;
        if (!source || !target) {
            return;
        }
        const tileId = String(source.id);
        const targetId = String(target.id);
        if (targetId === BANK_ID) {
            clearTile(tileId);
        } else if (BLANKS.some((blank) => blank.id === targetId)) {
            placeTile(tileId, targetId);
        }
    };

    const placedTileIds = new Set(Object.values(placements));
    const bankTiles = sampleTiles
        .filter((tile) => !placedTileIds.has(tile.tileId))
        .map((tile) => ({
            ...tile,
            moveTargets: BLANKS,
            onMove: (targetId: string) => placeTile(tile.tileId, targetId),
        }));

    return (
        <PerseusDndProvider onDragEnd={handleDragEnd}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBlockEnd: 24,
                }}
            >
                {BLANKS.map(({id, label}) => {
                    const placedTile = sampleTiles.find(
                        (tile) => tile.tileId === placements[id],
                    );
                    return (
                        <React.Fragment key={id}>
                            <span>{label}:</span>
                            <BlankComponent
                                blankId={id}
                                displayType="normal"
                                // Stands in for the FITB widget's real rule:
                                // an empty blank is as wide as the widest tile.
                                minWidth={120}
                                placedTileId={placedTile?.tileId}
                            >
                                {placedTile && (
                                    <AnswerTile
                                        {...placedTile}
                                        moveTargets={BLANKS.filter(
                                            (blank) => blank.id !== id,
                                        )}
                                        onMove={(targetId) =>
                                            placeTile(
                                                placedTile.tileId,
                                                targetId,
                                            )
                                        }
                                        clearFromLabel={label}
                                        onClear={() =>
                                            clearTile(placedTile.tileId)
                                        }
                                    />
                                )}
                            </BlankComponent>
                        </React.Fragment>
                    );
                })}
            </div>
            <ChoiceBank
                label="Choices"
                answerTiles={bankTiles}
                bankId={BANK_ID}
            />
        </PerseusDndProvider>
    );
}

/**
 * Bank plus blanks: drag tiles into the blanks and back, or use each
 * tile's action menu. Dropping on a full blank evicts its tile back to
 * the bank.
 */
export const Default: Story = {
    render: () => <DndPlayground />,
};

/** An empty bank: the provider has a droppable, but nothing to drag into it. */
export const EmptyChoiceBank: Story = {
    render: () => (
        <PerseusDndProvider>
            <ChoiceBank label="Choices" answerTiles={[]} />
        </PerseusDndProvider>
    ),
};
