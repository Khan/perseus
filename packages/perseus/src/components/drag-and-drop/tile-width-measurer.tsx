import * as React from "react";
import {flushSync} from "react-dom";

import {AnswerTile} from "./answer-tile";
import {PerseusDndProvider} from "./perseus-dnd-provider";
import styles from "./tile-width-measurer.module.css";

import type {PerseusAnswerTile} from "@khanacademy/perseus-core";

type Props = {
    /** The tiles to measure. */
    tiles: Array<PerseusAnswerTile>;
    /**
     * Called with the widest tile's width in whole pixels (rounded up), and
     * again whenever it changes. Called with undefined while the tiles are
     * hidden, since a hidden tile has no width. State updates made in this
     * callback render before the browser paints.
     */
    onWidthChange: (width: number | undefined) => void;
};

/**
 * TileWidthMeasurer renders a hidden copy of each answer tile and reports
 * the widest one's width. A widget uses that width to size its empty
 * blanks, so a blank's size does not reveal its answer.
 *
 * The copies sit in a column that shrinks to fit its widest tile, so the
 * column's width is the measurement. A ResizeObserver on the column then
 * catches every cause of a change: TeX or images loading, a web font
 * swapping in, a hidden widget becoming visible, or tiles being added or
 * removed. ResizeObserver reports layout sizes, which ignore CSS
 * transforms, so the width stays correct inside a scaled container.
 *
 * The column is absolutely positioned. Render this inside a positioned
 * ancestor, so the column lies within the widget.
 */
function TileWidthMeasurer(props: Props): React.ReactElement {
    const {tiles, onWidthChange} = props;

    // The observer outlives renders, so it reads the latest callback
    // through a ref.
    const onWidthChangeRef = React.useRef(onWidthChange);
    React.useLayoutEffect(() => {
        onWidthChangeRef.current = onWidthChange;
    }, [onWidthChange]);

    const observerRef = React.useRef<ResizeObserver | null>(null);
    const setColumnRef = React.useCallback((element: HTMLElement | null) => {
        observerRef.current?.disconnect();
        observerRef.current = null;
        if (element == null) {
            return;
        }
        // `inert` keeps the copies' menu buttons out of the tab order.
        // React 18 does not support `inert` as a prop, so it is set here.
        element.setAttribute("inert", "");
        // The observer also fires once when observation starts.
        observerRef.current = new ResizeObserver((entries) => {
            // Only the column is observed. The last entry is its latest
            // size.
            const entry = entries[entries.length - 1];
            const width = entry?.borderBoxSize[0]?.inlineSize ?? 0;
            // Round up, so a blank is never narrower than its tile.
            // A hidden column reads 0, so report no width until it shows.
            const nextWidth = width > 0 ? Math.ceil(width) : undefined;
            // ResizeObserver calls back after layout and before paint.
            // React would render a state update from here in a later
            // task, after a paint, so blanks would show at the default
            // width for a frame and then jump. flushSync renders the
            // update now, before the browser paints.
            flushSync(() => onWidthChangeRef.current(nextWidth));
        });
        observerRef.current.observe(element, {box: "border-box"});
    }, []);

    // A separate provider keeps the copies out of the widget's real
    // drag-and-drop.
    return (
        <PerseusDndProvider>
            <div
                aria-hidden="true"
                className={styles.column}
                ref={setColumnRef}
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
                    />
                ))}
            </div>
        </PerseusDndProvider>
    );
}

/**
 * Whether two tile lists would produce identical hidden copies, and so the same
 * measured width.
 *
 * Use this to skip re-rendering the measurer when the widget re-renders but its
 * tiles haven't changed, as happens on every drag or placement. Re-rendering is
 * costly, since each copy renders its content through a full Renderer.
 */
function tilesRenderSame(
    a: Array<PerseusAnswerTile>,
    b: Array<PerseusAnswerTile>,
): boolean {
    return (
        a.length === b.length &&
        a.every(
            (tile, i) =>
                tile.id === b[i].id &&
                tile.content === b[i].content &&
                tile.label === b[i].label &&
                tile.imageHeight === b[i].imageHeight,
        )
    );
}

// Each copy renders its content through a full Renderer. Memoizing keeps
// the copies from re-rendering on every drag or placement change, which
// re-renders the widget but leaves the tiles unchanged.
const MemoizedTileWidthMeasurer = React.memo(
    TileWidthMeasurer,
    (prev, next) =>
        prev.onWidthChange === next.onWidthChange &&
        tilesRenderSame(prev.tiles, next.tiles),
);

export {MemoizedTileWidthMeasurer as TileWidthMeasurer};
