import {CoreWidgetRegistry} from "@khanacademy/perseus-core/registry" /* widget-manifest import */;
import blankLogic from "@khanacademy/perseus-core/widgets/blank" /* widget-manifest import */;
import {screen} from "@testing-library/react";

import {getFeatureFlags} from "../../testing/feature-flags-util";
import * as Widgets from "../../widgets";
import {registerWidgets} from "../../widgets" /* widget-manifest import */;
import {renderQuestion} from "../__testutils__/renderQuestion";

import {basicFillInTheBlankQuestion} from "./fill-in-the-blank.testdata";

import {fillInTheBlankRegistration} from "." /* widget-manifest import */;

// widget-manifest setup: start
function registerManifestWidgets(): void {
    CoreWidgetRegistry.registerLogics([blankLogic]);
    registerWidgets([fillInTheBlankRegistration]);
}
registerManifestWidgets();
// widget-manifest setup: end
describe("Fill in the Blank Widget", () => {
    beforeAll(() => {
        registerManifestWidgets();
    });

    // TODO(LEMS-4396): clean up feature flag
    it("renders the widget when the dnd-widget-fitb flag is on", () => {
        // Arrange, Act
        renderQuestion(basicFillInTheBlankQuestion, {
            apiOptions: {
                flags: getFeatureFlags({"dnd-widget-fitb": true}),
            },
        });

        // The placeholder has no accessible role or name to query by yet.
        expect(
            screen.getByTestId("fill-in-the-blank-widget"),
        ).toBeInTheDocument();
    });

    it("renders nothing when the dnd-widget-fitb flag is off", () => {
        // Arrange, Act
        renderQuestion(basicFillInTheBlankQuestion, {
            apiOptions: {
                flags: getFeatureFlags({"dnd-widget-fitb": false}),
            },
        });

        expect(
            screen.queryByTestId("fill-in-the-blank-widget"),
        ).not.toBeInTheDocument();
    });

    it("is hidden from the content editor's widget dropdown", () => {
        // Arrange, Act
        const publicWidgets = Widgets.getPublicWidgets();

        expect(publicWidgets["fill-in-the-blank"]).toBeUndefined();
    });
});
