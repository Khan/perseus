import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {watchDraftPreview} from "./draft-preview-feed";

import type {Draft} from "../domain/draft";

const DIAGRAM = "web+graphie://perseus-mcp.localhost/graffiti/g1";

function draftShowing(content: string, revision = 1): Draft {
    return {
        itemId: "abc",
        revision,
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({content}),
        }),
    };
}

function setUp(initial: Draft) {
    let draftListener: (draft: Draft) => void = () => {};
    const diagramListeners = new Map<string, () => void>();
    let diagramRevision = 1;
    const listener = jest.fn();
    const stop = watchDraftPreview(
        {
            drafts: {
                watchItem: (_itemId, onDraft) => {
                    draftListener = onDraft;
                    onDraft(initial);
                    return () => (draftListener = () => {});
                },
            },
            graffiti: {
                latestRevisions: (ids) =>
                    Object.fromEntries(ids.map((id) => [id, diagramRevision])),
                watchDiagrams: (ids, onChange) => {
                    ids.forEach((id) => diagramListeners.set(id, onChange));
                    return () =>
                        ids.forEach((id) => diagramListeners.delete(id));
                },
            },
        },
        "abc",
        listener,
    );
    return {
        listener,
        stop,
        saveDraft: (draft: Draft) => draftListener(draft),
        reviseDiagram: (id: string) => {
            diagramRevision++;
            diagramListeners.get(id)?.();
        },
    };
}

describe("watchDraftPreview", () => {
    it("sends the draft with its diagrams' latest revisions", () => {
        // Arrange, Act
        const {listener} = setUp(draftShowing(`![](${DIAGRAM})`));

        // Assert
        expect(listener).toHaveBeenLastCalledWith(
            expect.objectContaining({revision: 1}),
            {g1: 1},
        );
    });

    it("sends the draft again when one of its diagrams changes", () => {
        // Arrange
        const {listener, reviseDiagram} = setUp(
            draftShowing(`![](${DIAGRAM})`),
        );

        // Act
        reviseDiagram("g1");

        // Assert
        expect(listener).toHaveBeenLastCalledWith(
            expect.objectContaining({revision: 1}),
            {g1: 2},
        );
    });

    it("follows a diagram the draft starts showing", () => {
        // Arrange
        const {listener, saveDraft, reviseDiagram} = setUp(
            draftShowing("No diagram"),
        );
        saveDraft(draftShowing(`![](${DIAGRAM})`, 2));
        listener.mockClear();

        // Act
        reviseDiagram("g1");

        // Assert
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it("stops sending once stopped", () => {
        // Arrange
        const {listener, stop, reviseDiagram} = setUp(
            draftShowing(`![](${DIAGRAM})`),
        );
        listener.mockClear();

        // Act
        stop();
        reviseDiagram("g1");

        // Assert
        expect(listener).not.toHaveBeenCalled();
    });
});
