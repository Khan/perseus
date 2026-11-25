import {getPolarGraphPublicWidgetOptions} from "./polar-graph-util";

import type {PolarGraphPublicWidgetOptions} from "./polar-graph-util";
import type {PerseusPolarGraphWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusPolarGraphWidgetOptions = {
    maxRadius: 5,
    radiusStep: 1,
    angleStepDegrees: 15,
    angleUnit: "degrees",
    graph: {type: "point", numPoints: 1},
    // The answer starts where the handle starts, so a saved widget always
    // has one; the editor warns until the author moves it.
    correct: {type: "point", numPoints: 1, coords: [[1, 0]]},
    lockedFigures: [],
    lockedLabels: [],
};

const polarGraphWidgetLogic: WidgetLogic<
    PerseusPolarGraphWidgetOptions,
    PolarGraphPublicWidgetOptions
> = {
    name: "polar-graph",
    version: {major: 0, minor: 0},
    defaultAlignment: "block",
    defaultWidgetOptions,
    getPublicWidgetOptions: getPolarGraphPublicWidgetOptions,
    accessible: true,
};

export default polarGraphWidgetLogic;
