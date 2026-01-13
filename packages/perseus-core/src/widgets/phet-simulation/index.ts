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

const phetSimulationWidgetLogic: WidgetLogic<
    PerseusPhetSimulationWidgetOptions
> = {
    name: "phet-simulation",
    defaultWidgetOptions,
    accessible: true,
};

export default phetSimulationWidgetLogic;
