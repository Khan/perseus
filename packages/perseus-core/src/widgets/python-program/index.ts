import type {PerseusPythonProgramWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type PythonProgramDefaultWidgetOptions = Pick<
    PerseusPythonProgramWidgetOptions,
    "programID" | "height"
>;

function initializeWidgetOptions(): PythonProgramDefaultWidgetOptions {
    return {
        programID: "",
        height: 400,
    };
}

const pythonProgramWidgetLogic: WidgetLogic<PythonProgramDefaultWidgetOptions> =
    {
        name: "python-program",
        initializeWidgetOptions,
        accessible: true,
    };

export default pythonProgramWidgetLogic;
