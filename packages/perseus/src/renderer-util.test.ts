// STOPSHIP delete this file
// import {scorePerseusItem} from "@khanacademy/perseus-score";
// import {act, screen} from "@testing-library/react";
// import {userEvent as userEventLib} from "@testing-library/user-event";

// import {
//     testDependencies,
//     testDependenciesV2,
// } from "../../../testing/test-dependencies";

// import {question1} from "./__testdata__/renderer.testdata";
// import * as Dependencies from "./dependencies";
// import {registerAllWidgetsForTesting} from "./util/register-all-widgets-for-testing";
// import {renderQuestion} from "./widgets/__testutils__/renderQuestion";
// import DropdownWidgetExport from "./widgets/dropdown";

// import type {UserEvent} from "@testing-library/user-event";

// describe("renderer utils", () => {
//     beforeAll(() => {
//         registerAllWidgetsForTesting();
//     });

//     beforeEach(() => {
//         jest.spyOn(testDependenciesV2.analytics, "onAnalyticsEvent");
//         jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
//             testDependencies,
//         );
//         jest.spyOn(Dependencies, "useDependencies").mockReturnValue(
//             testDependenciesV2,
//         );
//         // Mocked for loading graphie in svg-image
//         global.fetch = jest.fn(() =>
//             Promise.resolve({
//                 text: () => "",
//                 ok: true,
//             }),
//         ) as jest.Mock;
//     });
// });
