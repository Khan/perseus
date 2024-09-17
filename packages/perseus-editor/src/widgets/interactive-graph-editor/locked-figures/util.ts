import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import type {
    LockedEllipseType,
    LockedFigure,
    LockedFigureType,
    LockedFunctionType,
    LockedLabelType,
    LockedLineType,
    LockedPointType,
    LockedPolygonType,
    LockedVectorType,
} from "@khanacademy/perseus";

const DEFAULT_COLOR = "grayH";

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
            };
        case "vector":
            return {
                type: "vector",
                points: [
                    [0, 0],
                    [2, 2],
                ],
                color: DEFAULT_COLOR,
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
            };
        case "function":
            return {
                type: "function",
                color: DEFAULT_COLOR,
                strokeStyle: "solid",
                equation: "x^2",
                directionalAxis: "x",
            };
        case "label":
            return {
                type: "label",
                coord: [0, 0],
                text: "",
                color: DEFAULT_COLOR,
                size: "medium",
            };
        default:
            throw new UnreachableCaseError(type);
    }
}
