import {expectPass, expectWarning} from "../__tests__/test-utils";

import phetSimulationWidgetErrorRule from "./phet-simulation-widget-error";

describe("radio-widget-error", () => {
    beforeEach(() => {
        // We need to mock URL.canParse() because it is not available
        // in our testing environment.
        global.URL.canParse = jest.fn(() => true) as jest.Mock;
    });

    // Error for phet simulation widget with non-PhET URL
    expectWarning(phetSimulationWidgetErrorRule, "[[☃ phet-simulation 1]]", {
        widgets: {
            "phet-simulation 1": {
                options: {
                    url: "https://google.com",
                },
            },
        },
    });

    // Error for phet simulation widget with nonsensical URL
    expectWarning(phetSimulationWidgetErrorRule, "[[☃ phet-simulation 1]]", {
        widgets: {
            "phet-simulation 1": {
                options: {
                    url: "abcdefghijklmnopqrstuvwxyz",
                },
            },
        },
    });

    // Pass for phet simulation widget with PhET URL
    expectPass(phetSimulationWidgetErrorRule, "[[☃ phet-simulation 1]]", {
        widgets: {
            "phet-simulation 1": {
                options: {
                    url: "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
                },
            },
        },
    });
});
