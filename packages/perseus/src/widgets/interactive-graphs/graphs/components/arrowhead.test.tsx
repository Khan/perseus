import {render} from "@testing-library/react";
import React from "react";

import {Arrowhead} from "./arrowhead";

describe("Arrowhead", () => {
    it("Uses provided color to fill the arrow", () => {
        const {container} = render(
            <Arrowhead tip={[0, 0]} angle={0} color="green" />,
        );
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const svgArrow = container.querySelector("path");
        expect(svgArrow?.getAttribute("style")).toContain("stroke: green");
    });

    it("Inherits the color of the parent element when no color is specified", () => {
        const {container} = render(<Arrowhead tip={[0, 0]} angle={0} />);
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const svgArrow = container.querySelector("path");
        expect(svgArrow?.getAttribute("style")).toContain("stroke: inherit");
    });
});
