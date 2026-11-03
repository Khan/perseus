/**
 * @jest-environment node
 */
import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {newDraft} from "../domain/draft";

import {withDraftFeed} from "./draft-feed";
import {inMemoryRepository} from "./in-memory-draft-repository.testutils";

function draft(itemId: string) {
    return newDraft({
        itemId,
        item: generateTestPerseusItem(),
        now: new Date("2026-01-01T00:00:00Z"),
    });
}

describe("withDraftFeed", () => {
    it("saves through to the wrapped repository", () => {
        // Arrange
        const repository = inMemoryRepository();
        const {drafts} = withDraftFeed(repository);

        // Act
        drafts.save(draft("abc"));

        // Assert
        expect(repository.get("abc")).toMatchObject({itemId: "abc"});
    });

    it("announces a save only to that draft's listeners", () => {
        // Arrange
        const {drafts, feed} = withDraftFeed(inMemoryRepository());
        const abcListener = jest.fn();
        const otherListener = jest.fn();
        feed.subscribe("abc", abcListener);
        feed.subscribe("other", otherListener);

        // Act
        drafts.save(draft("abc"));

        // Assert
        expect({
            abc: abcListener.mock.calls.length,
            other: otherListener.mock.calls.length,
        }).toEqual({abc: 1, other: 0});
    });
});
