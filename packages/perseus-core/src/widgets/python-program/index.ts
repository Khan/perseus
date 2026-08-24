import type {PerseusPythonProgramWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusPythonProgramWidgetOptions = {
    programID: "",
    height: 400,
};

const pythonProgramWidgetLogic: WidgetLogic = {
    name: "python-program",
    defaultWidgetOptions,
    accessible: true,
};

export default pythonProgramWidgetLogic;
