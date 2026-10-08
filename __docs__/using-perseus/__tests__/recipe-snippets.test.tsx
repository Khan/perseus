import {registerAllWidgetsForTesting} from "@khanacademy/perseus";
import {isFailure, parseAndMigratePerseusItem} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import * as React from "react";

import numericInputItem from "../snippets/minimal-numeric-input-item.json";
import radioItem from "../snippets/minimal-radio-item.json";
import {PerseusHost} from "../snippets/perseus-host";
import {LocalQuestion} from "../snippets/tier-1-local";
import {ServerQuestion} from "../snippets/tier-2-client";
import {createQuestionHandler} from "../snippets/tier-2-server";

// These tests keep the code shown on the "Using Perseus in a New Experience"
// page working. If one fails, update the snippet and the page together.
describe("Using Perseus recipe snippets", () => {
    const originalFetch = global.fetch;

    beforeEach(() => {
        registerAllWidgetsForTesting();
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("parses both item templates", () => {
        // Arrange, Act
        const results = [numericInputItem, radioItem].map((item) =>
            parseAndMigratePerseusItem(item),
        );

        expect(results.filter(isFailure)).toEqual([]);
    });

    it("marks 4 correct with tier 1 inside PerseusHost", async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        const parsed = parseAndMigratePerseusItem(numericInputItem);
        if (isFailure(parsed)) {
            throw new Error(parsed.detail.message);
        }
        render(
            <PerseusHost>
                <LocalQuestion item={parsed.value} />
            </PerseusHost>,
        );

        // Act
        await user.type(screen.getByRole("textbox"), "4");
        await user.click(screen.getByRole("button", {name: "Check"}));

        // Assert
        expect(await screen.findByText("Correct!")).toBeInTheDocument();
    });

    it("marks 4 correct with solutions through the tier 2 client and handler", async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        const handler = createQuestionHandler(JSON.stringify(numericInputItem));
        const responses: Array<ReturnType<typeof handler.check>> = [];
        // Stands in for the network: route the client's request to the
        // handler, round-tripping JSON like a real server would.
        global.fetch = jest.fn(async (_url, init) => {
            const response = handler.check(JSON.parse(String(init?.body)));
            responses.push(response);
            // jsdom has no Response, and the client only reads ok, status
            // and json().
            // eslint-disable-next-line no-restricted-syntax
            return {
                ok: response.status === 200,
                status: response.status,
                json: async () => JSON.parse(JSON.stringify(response.body)),
            } as Response;
        });
        render(
            <PerseusHost>
                <ServerQuestion answerlessItem={handler.answerlessItem} />
            </PerseusHost>,
        );

        // Act
        await user.type(screen.getByRole("textbox"), "4");
        await user.click(screen.getByRole("button", {name: "Check"}));

        // Assert
        expect(await screen.findByText("Correct!")).toBeInTheDocument();
        expect(responses[0].body).toHaveProperty("solutions.question");
    });

    it("returns no solutions from the tier 2 handler when incorrect", () => {
        // Arrange
        const handler = createQuestionHandler(JSON.stringify(numericInputItem));

        // Act
        const response = handler.check({
            "numeric-input 1": {currentValue: "5"},
        });

        // Assert
        expect(response).toMatchObject({
            status: 200,
            body: {score: {type: "points", earned: 0}, solutions: undefined},
        });
    });
});
