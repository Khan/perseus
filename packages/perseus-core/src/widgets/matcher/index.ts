import type {PerseusMatcherWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";
import getMatcherPublicWidgetOptions from "./matcher-util";

export type MatcherDefaultWidgetOptions = Pick<
    PerseusMatcherWidgetOptions,
    "left" | "right" | "labels" | "orderMatters" | "padding"
>;

const defaultWidgetOptions: MatcherDefaultWidgetOptions = {
    left: ["$x$", "$y$", "$z$"],
    right: ["$1$", "$2$", "$3$"],
    labels: ["test", "label"],
    orderMatters: false,
    padding: true,
};

const matcherWidgetLogic: WidgetLogic = {
    name: "matcher",
    defaultWidgetOptions,
    getPublicWidgetOptions: getMatcherPublicWidgetOptions,
};

export default matcherWidgetLogic;
