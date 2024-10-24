import type {PerseusCSProgramWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";
import getCSProgramPublicWidgetOptions from "./cs-program-util";

export type CSProgramDefaultWidgetOptions = Pick<
    PerseusCSProgramWidgetOptions,
    | "programID"
    | "programType"
    | "settings"
    | "showEditor"
    | "showButtons"
    | "height"
>;

const DEFAULT_HEIGHT = 400;

const defaultWidgetOptions: CSProgramDefaultWidgetOptions = {
    programID: "",
    programType: null,
    settings: [{name: "", value: ""}],
    showEditor: false,
    showButtons: false,
    height: DEFAULT_HEIGHT,
};

const csProgramWidgetLogic: WidgetLogic = {
    name: "cs-program",
    defaultWidgetOptions,
    supportedAlignments: ["block", "full-width"],
    getPublicWidgetOptions: getCSProgramPublicWidgetOptions,
};

export default csProgramWidgetLogic;
