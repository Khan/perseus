import {render, screen} from "@testing-library/react";
import * as React from "react";

import SvgImage from "../svg-image";

describe("SvgImage", () => {
    it("should render a spinner initially", () => {
        const {container} = render(
            <SvgImage src="http://localhost/sample.png" alt="png image" />,
        );

        expect(
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            container.querySelector("div[class*=spinnerContainer]"),
        ).toBeVisible();
        expect(container).toMatchSnapshot();
    });

    it("should load and render a png", () => {
        const {container} = render(
            <SvgImage src="http://localhost/sample.png" alt="png image" />,
        );

        expect(container).toMatchSnapshot();
    });

    // web+graphie://ka-perseus-graphie.s3.amazonaws.com/2ec91c96a937091d4473a1c6a5d97bb6f0427d05
});
