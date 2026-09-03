import type {PerseusPhetSimulationWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusPhetSimulationWidgetOptions = {
    url: "",
    description: "",
};

const phetSimulationWidgetLogic = {
    name: "phet-simulation",
    defaultWidgetOptions,
    accessible: true,
} satisfies WidgetLogic<"phet-simulation">;

export default phetSimulationWidgetLogic;
