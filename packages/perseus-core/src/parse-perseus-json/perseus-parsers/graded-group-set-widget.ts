import type {GradedGroupSetWidget} from "../../data-schema";
import {array, constant, object} from "../general-purpose-parsers";
import type {Parser} from "../parser-types";
import {parseGradedGroupWidgetOptions} from "./graded-group-widget";
import {parseWidget} from "./widget";

export const parseGradedGroupSetWidget: Parser<GradedGroupSetWidget> =
    parseWidget(
        constant("graded-group-set"),
        object({gradedGroups: array(parseGradedGroupWidgetOptions)}),
    );
