// The group widget's scorer is imported first on purpose: it imports the
// registry (through score.ts), so this order loads the registry while the
// scorer's module is still loading.
import scoreGroup from "./group/score-group";
import {getWidgetScorer} from "./widget-registry";

describe("widget registry", () => {
    it("returns the group widget's scorer when the scorer loads first", () => {
        // Arrange, Act
        const scorer = getWidgetScorer("group");

        // Assert
        expect(scorer).toBe(scoreGroup);
    });
});
