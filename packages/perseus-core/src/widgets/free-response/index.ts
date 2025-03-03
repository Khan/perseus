import type {PerseusFreeResponseWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type FreeResponseDefaultWidgetOptions = Pick<
    PerseusFreeResponseWidgetOptions,
    "question"
>;

const defaultWidgetOptions: PerseusFreeResponseWidgetOptions = {
    question: "",
};

const freeResponseWidgetLogic: WidgetLogic = {
    name: "free-response",
    defaultWidgetOptions,
};

export default freeResponseWidgetLogic;
