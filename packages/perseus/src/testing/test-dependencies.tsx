// Test dependencies that register every widget for legacy test support.
import {registerAllWidgetsForTesting} from "../util/register-all-widgets-for-testing";

export {
    cypressDependenciesV2,
    cypressTestDependencies,
    storybookDependenciesV2,
    testDependencies,
    testDependenciesV2,
} from "./test-dependencies-data";

registerAllWidgetsForTesting();
