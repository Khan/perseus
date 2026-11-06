import {render, screen, within} from "@testing-library/react";
import * as React from "react";

import PerseusMarkdown from "../perseus-markdown";

const renderMarkdown = (content: string) =>
    render(
        <>{PerseusMarkdown.basicOutput(PerseusMarkdown.parse(content, {}))}</>,
    );

describe("markdown table row headers", () => {
    it.each([
        {
            format: "without surrounding pipes",
            content:
                "  | Mass | Volume\n" +
                "- | - | -\n" +
                "Gold | 19.3 | 1\n" +
                "Silver | 10.5 | 1",
        },
        {
            format: "with surrounding pipes",
            content:
                "| | Mass | Volume |\n" +
                "|-|-|-|\n" +
                "| Gold | 19.3 | 1 |\n" +
                "| Silver | 10.5 | 1 |",
        },
    ])(
        "renders the first column as row headers when its header is empty ($format)",
        ({content}) => {
            // Arrange, Act
            renderMarkdown(content);

            expect(
                screen.getAllByRole("rowheader").map((th) => th.textContent),
            ).toEqual(["Gold", "Silver"]);
        },
    );

    it("renders an empty first column header as a data cell", () => {
        // Arrange, Act
        renderMarkdown(
            "| | Mass | Volume |\n" + "|-|-|-|\n" + "| Gold | 19.3 | 1 |",
        );

        const [headerRow] = screen.getAllByRole("row");
        expect(within(headerRow).getByRole("cell")).toBeEmptyDOMElement();
        expect(
            screen.getAllByRole("columnheader").map((th) => th.textContent),
        ).toEqual(["Mass", "Volume"]);
    });

    it("renders the first column as row headers when all its body cells are bold", () => {
        // Arrange, Act
        renderMarkdown(
            "Metal | Mass | Volume\n" +
                "- | - | -\n" +
                "**Gold** | 19.3 | 1\n" +
                "**Silver** | 10.5 | 1",
        );

        expect(
            screen.getAllByRole("rowheader").map((th) => th.textContent),
        ).toEqual(["Gold", "Silver"]);
    });

    it("keeps a non-empty first column header as a column header", () => {
        // Arrange, Act
        renderMarkdown(
            "Metal | Mass | Volume\n" +
                "- | - | -\n" +
                "**Gold** | 19.3 | 1\n" +
                "**Silver** | 10.5 | 1",
        );

        expect(
            screen.getAllByRole("columnheader").map((th) => th.textContent),
        ).toEqual(["Metal", "Mass", "Volume"]);
    });

    it("renders row headers in titled tables", () => {
        // Arrange, Act
        renderMarkdown(
            "|| Metal densities ||\n" +
                "  | Mass | Volume\n" +
                "- | - | -\n" +
                "Gold | 19.3 | 1\n" +
                "Silver | 10.5 | 1",
        );

        expect(
            screen.getByRole("table", {name: "Metal densities"}),
        ).toBeInTheDocument();
        expect(
            screen.getAllByRole("rowheader").map((th) => th.textContent),
        ).toEqual(["Gold", "Silver"]);
    });

    it.each([
        {
            reason: "only some first column cells are bold",
            content:
                "Metal | Mass\n" +
                "- | -\n" +
                "**Gold** | 19.3\n" +
                "Silver | 10.5",
        },
        {
            reason: "a first column cell is only partially bold",
            content:
                "Metal | Mass\n" +
                "- | -\n" +
                "**Gold** | 19.3\n" +
                "**Silver** bar | 10.5",
        },
        {
            reason: "a first column body cell is empty",
            content:
                "| Metal | Mass |\n" +
                "|-|-|\n" +
                "| **Gold** | 19.3 |\n" +
                "| | 10.5 |",
        },
        {
            reason: "the table has a single column",
            content: "| |\n" + "|-|\n" + "| **Gold** |\n" + "| **Silver** |",
        },
        {
            reason: "the first column has a header and plain body cells",
            content: "Metal | Mass\n" + "- | -\n" + "Gold | 19.3",
        },
    ])("does not render row headers when $reason", ({content}) => {
        // Arrange, Act
        renderMarkdown(content);

        expect(screen.queryByRole("rowheader")).not.toBeInTheDocument();
    });
});
