import {getMatcherPublicWidgetOptions} from "./matcher-util";

import type {MatcherPublicWidgetOptions} from "./matcher-util";
import type {PerseusMatcherWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusMatcherWidgetOptions = {
    left: ["$x$", "$y$", "$z$"],
    right: ["$1$", "$2$", "$3$"],
    labels: ["test", "label"],
    orderMatters: false,
    padding: true,
};

const matcherWidgetLogic: WidgetLogic<
    PerseusMatcherWidgetOptions,
    MatcherPublicWidgetOptions
> = {
    name: "matcher",
    defaultWidgetOptions,
    getPublicWidgetOptions: getMatcherPublicWidgetOptions,
    accessible: false,
};

export default matcherWidgetLogic;
