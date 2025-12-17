import {Dependencies} from "@khanacademy/perseus";
import {render} from "@testing-library/react";
import * as React from "react";

import {mockImageLoading} from "../../../../../testing/image-loader-utils";
import {testDependencies} from "../../../../../testing/test-dependencies";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import TextDiff from "../text-diff";

describe("TextDiff", () => {
    let unmockImageLoading: () => void;

    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        unmockImageLoading = mockImageLoading();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        unmockImageLoading();
    });

    it("renders text in the diff view", () => {
        // Arrange
        const beforeItem: string = "Hello, world!";
        const afterItem: string = "Hello, world!!";

        // Act
        const {container} = render(
            <TextDiff
                title="A day in the life of a text diff"
                before={beforeItem}
                after={afterItem}
            />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("renders text with images in the diff view", () => {
        // Arrange
        const beforeItem: string =
            "Hello, world! and ![an image](https://cdn.kastatic.org/ka-content-images/4f38f705977774bcac3b5bed9f81b56710abc8b0.png) ![graphie image](web+graphie://ka-perseus-graphie.s3.amazonaws.com/2ac8f769a7323f55e41c12cfa39e774be08bc138) ![another graphie image](web+graphie://ka-perseus-graphie.s3.amazonaws.com/669d6011774f3c0f6809553d210b4f51b7e3e4fe)";
        const afterItem: string =
            "Hello, world! and ![graphie image](web+graphie://ka-perseus-graphie.s3.amazonaws.com/2ac8f769a7323f55e41c12cfa39e774be08bc138) ![another graphie image](web+graphie://ka-perseus-graphie.s3.amazonaws.com/669d6011774f3c0f6809553d210b4f51b7e3e4fe) ![A graph](https://fastly.kastatic.org/ka-perseus-images/9757eb155d1283bb137d0cfdaf9818fd600702ed.png)";

        // Act
        const {container} = render(
            <TextDiff
                title="A day in the life of a text diff"
                before={beforeItem}
                after={afterItem}
            />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });
});
