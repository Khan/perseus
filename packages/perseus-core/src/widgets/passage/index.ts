import type {PerseusPassageWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type PassageDefaultWidgetOptions = Pick<
    PerseusPassageWidgetOptions,
    "passageTitle" | "passageText" | "footnotes" | "showLineNumbers"
>;

const defaultWidgetOptions: PassageDefaultWidgetOptions = {
    passageTitle: "",
    passageText: "",
    footnotes: "",
    showLineNumbers: true,
};

const passageWidgetLogic: WidgetLogic<PerseusPassageWidgetOptions> = {
    name: "passage",
    defaultWidgetOptions,
    accessible: false,
};

export default passageWidgetLogic;
