import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import {
    type LockedEllipseType,
    type LockedFigure,
    type LockedFigureType,
    type LockedFunctionType,
    type LockedLabelType,
    type LockedLineType,
    type LockedPointType,
    type LockedPolygonType,
    type LockedVectorType,
} from "../data-schema";

const DEFAULT_COLOR = "grayH";

// Need to overload the function to avoid type errors.
export function getDefaultFigureForType(type: "point"): LockedPointType;
export function getDefaultFigureForType(type: "line"): LockedLineType;
export function getDefaultFigureForType(type: "vector"): LockedVectorType;
export function getDefaultFigureForType(type: "ellipse"): LockedEllipseType;
export function getDefaultFigureForType(type: "polygon"): LockedPolygonType;
export function getDefaultFigureForType(type: "function"): LockedFunctionType;
export function getDefaultFigureForType(type: "label"): LockedLabelType;
export function getDefaultFigureForType(type: LockedFigureType): LockedFigure;
export function getDefaultFigureForType(type: LockedFigureType): LockedFigure {
    switch (type) {
        case "point":
            return {
                type: "point",
                coord: [0, 0],
                color: DEFAULT_COLOR,
                filled: true,
                labels: [],
            };
        case "line":
            return {
                type: "line",
                kind: "line",
                points: [
                    getDefaultFigureForType("point"),
                    {
                        ...getDefaultFigureForType("point"),
                        coord: [2, 2],
                    },
                ],
                color: DEFAULT_COLOR,
                lineStyle: "solid",
                showPoint1: false,
                showPoint2: false,
                weight: "medium",
                labels: [],
            };
        case "vector":
            return {
                type: "vector",
                points: [
                    [0, 0],
                    [2, 2],
                ],
                color: DEFAULT_COLOR,
                weight: "medium",
                labels: [],
            };
        case "ellipse":
            return {
                type: "ellipse",
                center: [0, 0],
                radius: [1, 1],
                angle: 0,
                color: DEFAULT_COLOR,
                fillStyle: "none",
                strokeStyle: "solid",
                weight: "medium",
                labels: [],
            };
        case "polygon":
            return {
                type: "polygon",
                points: [
                    [0, 2],
                    [-1, 0],
                    [1, 0],
                ],
                color: DEFAULT_COLOR,
                showVertices: false,
                fillStyle: "none",
                strokeStyle: "solid",
                weight: "medium",
                labels: [],
            };
        case "function":
            return {
                type: "function",
                color: DEFAULT_COLOR,
                strokeStyle: "solid",
                weight: "medium",
                equation: "x^2",
                domain: [-Infinity, Infinity],
                directionalAxis: "x",
                labels: [],
            };
        case "label":
            return {
                type: "label",
                coord: [0, 0],
                text: "label",
                color: DEFAULT_COLOR,
                size: "medium",
            };
        default:
            throw new UnreachableCaseError(type);
    }
}
