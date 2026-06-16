import {vector as kvector} from "@khanacademy/kmath";
import {
    components,
    getAbsoluteValueCoords,
    getAngleCoords,
    getCircleCoords,
    getLineCoords,
    getLinearSystemCoords,
    getPointCoords,
    getPolygonCoords,
    getQuadraticCoords,
    getSegmentCoords,
    getSinusoidCoords,
    getTangentCoords,
    getVectorCoords,
    usePerseusI18n,
} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";
import Switch from "@khanacademy/wonder-blocks-switch";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import arrowCounterClockwise from "@phosphor-icons/core/bold/arrow-counter-clockwise-bold.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import Heading from "../../../components/heading";

import StartCoordsAbsoluteValue from "./start-coords-absolute-value";
import StartCoordsAngle from "./start-coords-angle";
import StartCoordsCircle from "./start-coords-circle";
import StartCoordsExponential from "./start-coords-exponential";
import StartCoordsLine from "./start-coords-line";
import StartCoordsLogarithm from "./start-coords-logarithm";
import StartCoordsMultiline from "./start-coords-multiline";
import StartCoordsPoint from "./start-coords-point";
import StartCoordsQuadratic from "./start-coords-quadratic";
import styles from "./start-coords-shared.module.css";
import StartCoordsSinusoid from "./start-coords-sinusoid";
import StartCoordsTangent from "./start-coords-tangent";
import StartCoordsVector from "./start-coords-vector";
import {getDefaultGraphStartCoords} from "./util";

import type {StartCoords} from "./types";
import type {Coord} from "@khanacademy/perseus";
import type {PerseusGraphType, Range} from "@khanacademy/perseus-core";

const {InfoTip} = components;

interface StartCoordsSettingsProps {
    range: [x: Range, y: Range];
    step: [x: number, y: number];
    allowReflexAngles?: boolean;
    editingDisabled?: boolean;
    onChange: (startCoords: StartCoords) => void;
    onChangePointLabels: (pointLabels: ReadonlyArray<string>) => void;
    showPointLabelsFeatureEnabled?: boolean;
    onChangeShowPointLabels?: (showPointLabels: boolean) => void;
}

type Props = PerseusGraphType & StartCoordsSettingsProps;

const StartCoordsSettingsInner = (props: Props) => {
    const {
        type,
        range,
        step,
        allowReflexAngles,
        onChange,
        onChangePointLabels,
    } = props;

    switch (type) {
        case "absolute-value":
            const absoluteValueCoords = getAbsoluteValueCoords(
                props,
                range,
                step,
            );
            return (
                <StartCoordsAbsoluteValue
                    startCoords={absoluteValueCoords}
                    onChange={onChange}
                    pointLabels={props.pointLabels ?? []}
                    onChangePointLabels={onChangePointLabels}
                />
            );
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
                    pointLabels={props.pointLabels ?? []}
                    onChangePointLabels={onChangePointLabels}
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
                    pointLabels={props.pointLabels ?? []}
                    onChangePointLabels={onChangePointLabels}
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
                    pointLabels={props.pointLabels ?? []}
                    onChangePointLabels={onChangePointLabels}
                />
            );
        case "sinusoid":
            const sinusoidCoords = getSinusoidCoords(props, range, step);
            return (
                <StartCoordsSinusoid
                    startCoords={sinusoidCoords}
                    onChange={onChange}
                    pointLabels={props.pointLabels ?? []}
                    onChangePointLabels={onChangePointLabels}
                />
            );
        case "exponential": {
            // startCoords is a combined {coords, asymptote} object, mirroring
            // how circle's startCoords packs {center, radius} together. This
            // lets the standard onChange → changeStartCoords path handle
            // everything with no special-casing needed.
            // eslint-disable-next-line no-restricted-syntax
            const defaultStartCoords = getDefaultGraphStartCoords(
                props,
                range,
                step,
            ) as {coords: [Coord, Coord]; asymptote: number};
            const currentStartCoords = props.startCoords ?? defaultStartCoords;
            return (
                <StartCoordsExponential
                    startCoords={currentStartCoords}
                    onChange={onChange}
                    pointLabels={props.pointLabels ?? []}
                    onChangePointLabels={onChangePointLabels}
                />
            );
        }
        case "logarithm": {
            // eslint-disable-next-line no-restricted-syntax
            const defaultLogarithmCoords = getDefaultGraphStartCoords(
                props,
                range,
                step,
            ) as {coords: [Coord, Coord]; asymptote: number};
            const currentLogarithmCoords =
                props.startCoords ?? defaultLogarithmCoords;
            return (
                <StartCoordsLogarithm
                    startCoords={currentLogarithmCoords}
                    onChange={onChange}
                    pointLabels={props.pointLabels ?? []}
                    onChangePointLabels={onChangePointLabels}
                />
            );
        }
        case "vector": {
            const vectorCoords = getVectorCoords(props, range, step);
            return (
                <StartCoordsVector
                    startCoords={vectorCoords}
                    onChange={onChange}
                />
            );
        }
        case "tangent":
            const tangentCoords = getTangentCoords(props, range, step);
            return (
                <StartCoordsTangent
                    startCoords={tangentCoords}
                    onChange={onChange}
                    pointLabels={props.pointLabels ?? []}
                    onChangePointLabels={onChangePointLabels}
                />
            );
        case "quadratic":
            const quadraticCoords = getQuadraticCoords(props, range, step);
            return (
                <StartCoordsQuadratic
                    startCoords={quadraticCoords}
                    onChange={onChange}
                    pointLabels={props.pointLabels ?? []}
                    onChangePointLabels={onChangePointLabels}
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
                    pointLabels={props.pointLabels}
                    onChangePointLabels={onChangePointLabels}
                />
            );
        case "angle":
            const angleCoords = getAngleCoords({graph: props, range, step});
            return (
                <StartCoordsAngle
                    startCoords={angleCoords}
                    allowReflexAngles={allowReflexAngles}
                    onChange={onChange}
                    pointLabels={props.pointLabels ?? []}
                    onChangePointLabels={onChangePointLabels}
                />
            );
        default:
            return null;
    }
};

const hasPopulatedPointLabels = (props: Props): boolean => {
    if (!("pointLabels" in props) || !props.pointLabels) {
        return false;
    }
    return props.pointLabels.every((label) => label.trim() !== "");
};

const StartCoordsSettings = (props: Props) => {
    const {
        range,
        step, editingDisabled,
        onChange,
        type,
        showPointLabelsFeatureEnabled,
        onChangeShowPointLabels,
    } = props;
    const [isOpen, setIsOpen] = React.useState(true);
    const switchId = React.useId();
    const {strings} = usePerseusI18n();

    // The toggle is hidden when the feature flag is off, or when the graph
    // type doesn't support point labels (vector). Other graph types reaching
    // this component all support `pointLabels` / `showPointLabels`.
    const showToggle =
        showPointLabelsFeatureEnabled === true &&
        type !== "vector" &&
        onChangeShowPointLabels !== undefined;
    const labelsPopulated = hasPopulatedPointLabels(props);
    const currentShowPointLabels =
        "showPointLabels" in props ? props.showPointLabels === true : false;

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

                    {/* Show point labels toggle (flag-gated) */}
                    {showToggle && (
                        <View style={localStyles.toggleRow}>
                            <Switch
                                id={switchId}
                                checked={
                                    labelsPopulated && currentShowPointLabels
                                }
                                disabled={!labelsPopulated}
                                onChange={onChangeShowPointLabels}
                            />
                            <Strut size={spacing.xSmall_8} />
                            <BodyText
                                size="small"
                                tag="label"
                                htmlFor={switchId}
                            >
                                {strings.interactiveGraphShowPointLabels}
                            </BodyText>
                            <Spring />
                            <InfoTip>
                                {strings.interactiveGraphShowPointLabelsInfoTip}
                            </InfoTip>
                        </View>
                    )}

                    {/* Button to reset to default */}
                    <View className={styles.resetButton}>
                        <Button
                            startIcon={arrowCounterClockwise}
                            kind="tertiary"
                            size="small"
                            disabled={editingDisabled}
                            onClick={() => {
                                onChange(
                                    getDefaultGraphStartCoords(
                                        props,
                                        range,
                                        step,
                                    ),
                                );
                            }}
                        >
                            Use default start coordinates
                        </Button>
                    </View>
                </>
            )}
        </View>
    );
};

const localStyles = StyleSheet.create({
    toggleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: spacing.small_12,
    },
});

export default StartCoordsSettings;
