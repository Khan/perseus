import {render} from "@testing-library/react";
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
});
