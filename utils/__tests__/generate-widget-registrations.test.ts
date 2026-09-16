import path from "path";

import {transformTestFile} from "../generate-widget-registrations";

const root = path.resolve(__dirname, "../..");
const emptyManifest = {coreWidgets: [], widgets: [], editors: []};

describe("generate widget registrations", () => {
    it("replaces broad React registration with manifest registrations", () => {
        const source = `import {testDependencies} from "../testing/test-dependencies";
import {registerAllWidgetsForTesting} from "../util/register-all-widgets-for-testing";

describe("test", () => {
    beforeAll(() => {
        registerAllWidgetsForTesting();
    });
});
`;

        const result = transformTestFile(
            source,
            path.join(root, "packages/perseus/src/example.test.ts"),
            {
                ...emptyManifest,
                coreWidgets: ["radio"],
                widgets: ["radio"],
            },
        );

        expect(result.unsupportedTypes).toEqual([]);
        expect(result.source).toContain(
            'import {radioRegistration} from "./widgets/radio"',
        );
        expect(result.source).toContain(
            "registerWidgets([radioRegistration]);",
        );
        expect(result.source).toContain(
            'from "../testing/test-dependencies-data"',
        );
        expect(result.source).not.toContain("registerAllWidgetsForTesting");

        expect(
            transformTestFile(
                result.source,
                path.join(root, "packages/perseus/src/example.test.ts"),
                {
                    ...emptyManifest,
                    coreWidgets: ["radio"],
                    widgets: ["radio"],
                },
            ).source,
        ).toBe(result.source);
    });

    it("replaces core initialization with granular logic registration", () => {
        const source = `import {initPerseusCore} from "../init";

describe("test", () => {
    beforeAll(() => {
        initPerseusCore();
    });
});
`;

        const result = transformTestFile(
            source,
            path.join(
                root,
                "packages/perseus-core/src/example/example.test.ts",
            ),
            {
                ...emptyManifest,
                coreWidgets: ["radio"],
            },
        );

        expect(result.unsupportedTypes).toEqual([]);
        expect(result.source).toContain(
            'import radioLogic from "../widgets/radio"',
        );
        expect(result.source).toContain(
            "CoreWidgetRegistry.registerLogics([radioLogic]);",
        );
        expect(result.source).not.toContain("initPerseusCore");
    });
});
