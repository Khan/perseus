import {vector as kvector} from "@khanacademy/kmath";
import {
    getAngleCoords,
    getCircleCoords,
    getLineCoords,
    getLinearSystemCoords,
    getPointCoords,
    getPolygonCoords,
    getQuadraticCoords,
    getSegmentCoords,
    getSinusoidCoords,
} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import arrowCounterClockwise from "@phosphor-icons/core/bold/arrow-counter-clockwise-bold.svg";
import * as React from "react";

import Heading from "../../components/heading";
import StartCoordsAngle from "./start-coords-angle";
import StartCoordsCircle from "./start-coords-circle";
import StartCoordsLine from "./start-coords-line";
import StartCoordsMultiline from "./start-coords-multiline";
import StartCoordsPoint from "./start-coords-point";
import StartCoordsQuadratic from "./start-coords-quadratic";
import StartCoordsSinusoid from "./start-coords-sinusoid";
import {getDefaultGraphStartCoords} from "../../components/util";

import type {PerseusGraphType, Range} from "@khanacademy/perseus";

type Props = PerseusGraphType & {
    range: [x: Range, y: Range];
    step: [x: number, y: number];
    onChange: (startCoords: PerseusGraphType["startCoords"]) => void;
};

const StartCoordsSettingsInner = (props: Props) => {
    const {type, range, step, onChange} = props;

    switch (type) {
        // Graphs with startCoords of type CollinearTuple
        case "linear":
        case "ray":
            // Gets the startCoords from props if they're passed in,
            // otherwise calculates the default startCoords.
            const linearCoords = getLineCoords(props, range, step);
            return (
                <StartCoordsLine
                    startCoords={linearCoords}
                    onChange={onChange}
                />
            );
        // Graphs with startCoords of type CollinearTuple[]
        case "linear-system":
        case "segment":
            const multiLineCoords =
                // Gets the startCoords from props if they're passed in,
                // otherwise calculates the default startCoords.
                type === "segment"
                    ? getSegmentCoords(props, range, step)
                    : getLinearSystemCoords(props, range, step);
            return (
                <StartCoordsMultiline
                    type={type}
                    startCoords={multiLineCoords}
                    onChange={onChange}
                />
            );
        case "circle":
            const circleCoords = getCircleCoords(props);
            const radius = kvector.length(
                kvector.subtract(circleCoords.radiusPoint, circleCoords.center),
            );
            return (
                <StartCoordsCircle
                    startCoords={{center: circleCoords.center, radius}}
                    onChange={onChange}
                />
            );
        case "sinusoid":
            const sinusoidCoords = getSinusoidCoords(props, range, step);
            return (
                <StartCoordsSinusoid
                    startCoords={sinusoidCoords}
                    onChange={onChange}
                />
            );
        case "quadratic":
            const quadraticCoords = getQuadraticCoords(props, range, step);
            return (
                <StartCoordsQuadratic
                    startCoords={quadraticCoords}
                    onChange={onChange}
                />
            );
        // Graphs with startCoords of type ReadonlyArray<Coord>
        case "point":
        case "polygon":
            const pointCoords =
                type === "point"
                    ? getPointCoords(props, range, step)
                    : getPolygonCoords(props, range, step);
            return (
                <StartCoordsPoint
                    startCoords={pointCoords}
                    onChange={onChange}
                />
            );
        case "angle":
            const angleCoords = getAngleCoords({graph: props, range, step});
            return (
                <StartCoordsAngle
                    startCoords={angleCoords}
                    onChange={onChange}
                />
            );
        default:
            return null;
    }
};

const StartCoordsSettings = (props: Props) => {
    const {range, step, onChange} = props;
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <View>
            {/* Heading for the collapsible section */}
            <Heading
                isCollapsible={true}
                title="Start coordinates"
                isOpen={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
            />

            {/* Start coordinates main UI */}
            {isOpen && (
                <>
                    {/* Start coordinates input */}
                    <StartCoordsSettingsInner {...props} />

                    {/* Button to reset to default */}
                    <Strut size={spacing.small_12} />
                    <Button
                        startIcon={arrowCounterClockwise}
                        kind="tertiary"
                        size="small"
                        onClick={() => {
                            onChange(
                                getDefaultGraphStartCoords(props, range, step),
                            );
                        }}
                    >
                        Use default start coordinates
                    </Button>
                </>
            )}
        </View>
    );
};

export default StartCoordsSettings;
