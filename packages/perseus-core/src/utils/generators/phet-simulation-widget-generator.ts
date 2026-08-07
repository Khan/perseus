import phetSimulationWidgetLogic from "../../widgets/phet-simulation";

import type {
    PerseusPhetSimulationWidgetOptions,
    PhetSimulationWidget,
} from "../../data-schema";

export function generatePhetSimulationOptions(
    options?: Partial<PerseusPhetSimulationWidgetOptions>,
): PerseusPhetSimulationWidgetOptions {
    return {
        ...phetSimulationWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generatePhetSimulationWidget(
    phetSimulationWidgetProperties?: Partial<
        Omit<PhetSimulationWidget, "type">
    >,
): PhetSimulationWidget {
    return {
        type: "phet-simulation",
        graded: false,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        ...phetSimulationWidgetProperties,
        options: generatePhetSimulationOptions(
            phetSimulationWidgetProperties?.options,
        ),
    };
}
