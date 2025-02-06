import type {PerseusPhetSimulationWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type PhetSimulationDefaultWidgetOptions = Pick<
    PerseusPhetSimulationWidgetOptions,
    "url" | "description"
>;

const defaultWidgetOptions: PhetSimulationDefaultWidgetOptions = {
    url: "",
    description: "",
};

const phetSimulationWidgetLogic: WidgetLogic = {
    name: "phet-simulation",
    defaultWidgetOptions,
};

export default phetSimulationWidgetLogic;
