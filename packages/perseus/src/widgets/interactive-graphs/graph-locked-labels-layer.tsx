import * as React from "react";

import {
    assumedLabelSize,
    getAutoLabelPlacements,
} from "./locked-figures/label-placement-utils";
import LockedLabel from "./locked-figures/locked-label";
import useGraphConfig from "./reducer/use-graph-config";

import type {
    LabelPlacementItem,
    LabelSize,
} from "./locked-figures/label-placement-utils";
import type {LockedFigure} from "@khanacademy/perseus-core";

/**
 * How long a wait for the labels to be measured has to exceed before they fade
 * in rather than appearing instantly. A warm load settles in a few
 * milliseconds; anything longer means fonts were actually fetched, and the
 * labels would otherwise pop in well after the rest of the graph.
 */
const fadeThresholdMs = 75;

/**
 * Longest the labels stay hidden waiting to be measured. If a measurement
 * never arrives — a TeX implementation that doesn't settle, say — they are
 * revealed at their estimated positions rather than staying invisible. One
 * timer covers the whole batch, so a single slow label delays everything by at
 * most this long rather than by this long each.
 */
const measureTimeoutMs = 1000;

type Props = {
    lockedFigures: ReadonlyArray<LockedFigure>;
};

export default function GraphLockedLabelsLayer(props: Props) {
    const {lockedFigures} = props;

    // Labels are placed against the graph's range and pixel size, and this
    // layer renders inside the graph config provider, so read them from
    // context rather than threading them down from MafsGraph.
    const graphInfo = useGraphConfig();
    const {range, width, height, markings, showAxisTicks, tickStep} = graphInfo;

    // Labels report their rendered size once their text has been typeset.
    // Placement needs every size at once — a label's position depends on where
    // its neighbours ended up — so they're collected here rather than in each
    // label.
    const [labelSizes, setLabelSizes] = React.useState<
        ReadonlyMap<string, LabelSize>
    >(() => new Map());

    const handleMeasure = React.useCallback((key: string, size: LabelSize) => {
        setLabelSizes((current) => {
            // A label that can't be measured yet reports zero; treating that
            // as a real size would leave it demanding no clearance at all.
            if (size.width <= 0 || size.height <= 0) {
                return current;
            }

            // Returning the same map when nothing changed is load-bearing:
            // placement re-runs whenever `labelSizes` changes identity, and
            // each run re-renders the labels, which measure again. Bailing out
            // here is what stops that cycle.
            const existing = current.get(key);
            if (
                existing &&
                existing.width === size.width &&
                existing.height === size.height
            ) {
                return current;
            }

            const next = new Map(current);
            next.set(key, size);
            return next;
        });
    }, []);

    // Each label needs a callback with a stable identity, or its measurement
    // effect would re-run on every render of this layer.
    const measureHandlers = React.useRef(
        new Map<string, (size: LabelSize) => void>(),
    );
    const getMeasureHandler = (key: string) => {
        let handler = measureHandlers.current.get(key);
        if (!handler) {
            handler = (size: LabelSize) => handleMeasure(key, size);
            measureHandlers.current.set(key, handler);
        }
        return handler;
    };

    // Only points carry a coordinate to anchor a label to. Labels on the other
    // figure types keep their authored positions for now.
    const items: LabelPlacementItem[] = React.useMemo(() => {
        const collected: LabelPlacementItem[] = [];

        lockedFigures.forEach((figure, i) => {
            if (figure.type !== "point") {
                return;
            }
            figure.labels.forEach((label, j) => {
                const key = `${i}-label-${j}`;
                collected.push({
                    key,
                    anchorCoord: figure.coord,
                    size: labelSizes.get(key) ?? assumedLabelSize,
                });
            });
        });

        return collected;
    }, [lockedFigures, labelSizes]);

    const placements = React.useMemo(
        () => getAutoLabelPlacements(items, {range, width, height, markings, showAxisTicks, tickStep}),
        [items, range, width, height, markings, showAxisTicks, tickStep],
    );

    // Hold the labels back until they've all been measured, so none is seen
    // at the position it had under an assumed size. Identifies the current set
    // of labels so the gate re-arms when the figures are edited.
    const itemSignature = items.map((item) => item.key).join("|");
    const [revealedSignature, setRevealedSignature] = React.useState<
        string | null
    >(null);
    const [fadeSignature, setFadeSignature] = React.useState<string | null>(
        null,
    );
    const revealed = revealedSignature === itemSignature;

    React.useEffect(() => {
        const startedAt = performance.now();
        const reveal = () => {
            setRevealedSignature(itemSignature);
            if (performance.now() - startedAt > fadeThresholdMs) {
                setFadeSignature(itemSignature);
            }
        };

        // However the measuring turns out, don't leave the labels hidden.
        const timeout = setTimeout(reveal, measureTimeoutMs);

        if (items.every((item) => labelSizes.has(item.key))) {
            reveal();
        }

        return () => clearTimeout(timeout);
    }, [itemSignature, items, labelSizes]);

    return lockedFigures.map((figure, i) => {
        if (figure.type === "label") {
            return <LockedLabel key={`label-${i}`} {...figure} />;
        }

        return (
            <React.Fragment key={i}>
                {figure.labels.map((label, j) => {
                    const key = `${i}-label-${j}`;
                    const placement = placements.get(key);
                    return (
                        <LockedLabel
                            key={key}
                            {...label}
                            placement={placement}
                            hidden={!!placement && !revealed}
                            fading={fadeSignature === itemSignature}
                            onMeasure={
                                placement ? getMeasureHandler(key) : undefined
                            }
                        />
                    );
                })}

                {/* Account for the labels within the lines' defining points */}
                {figure.type === "line" && (
                    <>
                        {/* Point 1 labels */}
                        {figure.points[0].labels.map((label, k) => (
                            <LockedLabel
                                key={`locked-figure-${i}-point-1-label-${k}`}
                                {...label}
                            />
                        ))}
                        {/* Point 2 labels */}
                        {figure.points[1].labels.map((label, k) => (
                            <LockedLabel
                                key={`locked-figure-${i}-point-2-label-${k}`}
                                {...label}
                            />
                        ))}
                    </>
                )}
            </React.Fragment>
        );
    });
}
