import type {PerseusPythonProgramWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusPythonProgramWidgetOptions = {
    programID: "",
    height: 400,
};

const pythonProgramWidgetLogic = {
    name: "python-program",
    defaultWidgetOptions,
    accessible: true,
} satisfies WidgetLogic<"python-program">;

export default pythonProgramWidgetLogic;
