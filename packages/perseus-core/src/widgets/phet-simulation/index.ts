import type {PerseusPhetSimulationWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusPhetSimulationWidgetOptions = {
    url: "",
    description: "",
};

const phetSimulationWidgetLogic: WidgetLogic = {
    name: "phet-simulation",
    defaultWidgetOptions,
    accessible: true,
};

export default phetSimulationWidgetLogic;
