import type {PerseusPhetSimulationWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type PhetSimulationDefaultWidgetOptions = Pick<
    PerseusPhetSimulationWidgetOptions,
    "url" | "description"
>;

function initializeWidgetOptions(): PhetSimulationDefaultWidgetOptions {
    return {
        url: "",
        description: "",
    };
}

const phetSimulationWidgetLogic: WidgetLogic<PhetSimulationDefaultWidgetOptions> =
    {
        name: "phet-simulation",
        initializeWidgetOptions,
        accessible: true,
    };

export default phetSimulationWidgetLogic;
