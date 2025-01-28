import type {PerseusPythonProgramWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type PythonProgramDefaultWidgetOptions = Pick<
    PerseusPythonProgramWidgetOptions,
    "programID" | "height"
>;

const defaultWidgetOptions: PythonProgramDefaultWidgetOptions = {
    programID: "",
    height: 400,
};

const pythonProgramWidgetLogic: WidgetLogic = {
    name: "python-program",
    defaultWidgetOptions,
};

export default pythonProgramWidgetLogic;
