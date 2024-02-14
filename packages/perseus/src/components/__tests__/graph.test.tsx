import {render, screen} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import Graph from "../graph";

describe("graph", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", () => {
        const {container} = render(<Graph box={[400, 400]} />);

        expect(container).toMatchSnapshot();
    });

    describe("locked shapes", () => {
        it("should render a locked points", () => {
            const {container} = render(
                <Graph
                    box={[100, 100]}
                    range={[
                        [0, 10],
                        [0, 10],
                    ]}
                    markings="none"
                    lockedShapes={[
                        {
                            type: "point" as const,
                            coord: [5, 5],
                        },
                        {
                            type: "point" as const,
                            coord: [1, 9],
                        },
                    ]}
                />,
            );

            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const points = container.querySelectorAll("ellipse");
            expect(points).toHaveLength(2);

            expect(points[0].getAttribute("cx")).toBe("50");
            expect(points[0].getAttribute("cy")).toBe("50");

            expect(points[1].getAttribute("cx")).toBe("10");
            expect(points[1].getAttribute("cy")).toBe("10");
        });
    });
});
