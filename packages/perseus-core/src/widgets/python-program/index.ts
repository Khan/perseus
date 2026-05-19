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

const pythonProgramWidgetLogic: WidgetLogic<PerseusPythonProgramWidgetOptions> =
    {
        name: "python-program",
        defaultWidgetOptions,
        accessible: true,
    };

export default pythonProgramWidgetLogic;
