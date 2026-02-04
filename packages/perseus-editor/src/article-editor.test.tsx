import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {
    userEvent as userEventLib,
    type UserEvent,
} from "@testing-library/user-event";
import * as React from "react";

import {
    testDependencies,
    testDependenciesV2,
} from "./testing/test-dependencies";

import ArticleEditor from "./article-editor";

describe("ArticleEditor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", () => {
        // Arrange, Act
        render(
            <ArticleEditor
                dependencies={testDependenciesV2}
                apiOptions={{...ApiOptions.defaults, isArticle: true}}
                previewURL="https://www.example.com"
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByText("Section 1")).toBeInTheDocument();
    });

    it("should render with 0 issues by default", () => {
        // Arrange, Act
        render(
            <ArticleEditor
                dependencies={testDependenciesV2}
                apiOptions={{...ApiOptions.defaults, isArticle: true}}
                previewURL="https://www.example.com"
                onChange={() => {}}
            />,
        );

        // Assert
        const zeroIssuesPanel = screen.getByText("0 issues");
        expect(zeroIssuesPanel).toBeInTheDocument();
    });

    it("should render with issues when props have issues", async () => {
        render(
            <ArticleEditor
                dependencies={testDependenciesV2}
                apiOptions={{...ApiOptions.defaults, isArticle: true}}
                previewURL="https://www.example.com"
                onChange={() => {}}
                json={[
                    {
                        content:
                            "![test image](https://www.example.com/image.png)",
                        images: {},
                        widgets: {},
                    },
                ]}
            />,
        );

        // Act - open issues panel
        const issuesPanel = screen.getByText("Issues");
        await userEvent.click(issuesPanel);

        // Assert
        expect(screen.getByText("1 issue")).toBeInTheDocument();
        expect(screen.getByText("Warning: image-markdown")).toBeInTheDocument();

        // Act - open the issue details
        const detailAccordion = screen.getByText("Warning: image-markdown");
        await userEvent.click(detailAccordion);

        // Assert
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Impact:")).toBeInTheDocument();
        expect(screen.getByText("Issue:")).toBeInTheDocument();
    });
});
