import {
    CoreWidgetRegistry,
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {newDraft} from "../domain/draft";

import {DraftNotFoundError} from "./errors";
import {createImageUseCases} from "./images";
import {inMemoryRepository} from "./in-memory-draft-repository.testutils";

import type {ImageFetcher} from "../ports/image-fetcher";

function imageWidget(url: string, alt = "") {
    return generateImageWidget({
        options: generateImageOptions({
            alt,
            backgroundImage: {url, width: 400, height: 300},
        }),
    });
}

function setUp(fetcher: ImageFetcher) {
    const drafts = inMemoryRepository();
    drafts.save(
        newDraft({
            itemId: "d1",
            item: generateTestPerseusItem({
                question: generateTestPerseusRenderer({
                    content:
                        "[[☃ image 1]] [[☃ image 2]] [[☃ image 3]] " +
                        "[[☃ image 4]]",
                    widgets: {
                        "image 1": imageWidget(
                            "https://cdn.example/a.png",
                            "A",
                        ),
                        "image 2": imageWidget(
                            "web+graphie://perseus-mcp.localhost/graffiti/g1",
                        ),
                        "image 3": imageWidget(
                            "https://cdn.example/broken.png",
                        ),
                        "image 4": imageWidget(
                            "https://ka-perseus-graphie.s3.amazonaws.com/x.png",
                        ),
                    },
                }),
                hints: [
                    generateTestPerseusRenderer({
                        content: "![A graph](web+graphie://cdn.example/abc)",
                    }),
                ],
            }),
            change: "Created",
            now: new Date("2026-01-01T00:00:00Z"),
        }),
    );
    return createImageUseCases({drafts, images: fetcher});
}

const fetcher: ImageFetcher = {
    fetch: async (url) =>
        url.includes("broken")
            ? {error: "the server answered 404"}
            : {mimeType: "image/png", data: "aGk="},
};

describe("describeImages", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
    });

    it("lists each image with its description, pointers and view", async () => {
        // Arrange
        const images = setUp(fetcher);

        // Act
        const result = await images.describeImages("d1");

        // Assert
        expect(result.images).toEqual([
            expect.objectContaining({
                where: "question",
                widgetId: "image 1",
                format: "raster",
                alt: "A",
                size: {width: 400, height: 300},
                pointers: expect.objectContaining({
                    alt: "/question/widgets/image 1/options/alt",
                }),
                view: "attached",
            }),
            expect.objectContaining({
                format: "graffiti",
                graffitiId: "g1",
                view: expect.stringContaining('get_graffiti("g1")'),
            }),
            expect.objectContaining({
                view: "not attached: the server answered 404",
            }),
            expect.objectContaining({
                format: "graphie",
                view: expect.stringContaining("Graphie image"),
            }),
            expect.objectContaining({
                where: "hints[0]",
                kind: "markdown image",
                format: "graphie",
                alt: "A graph",
                pointers: {content: "/hints/0/content"},
            }),
        ]);
        expect(result.attachments).toEqual([
            {mimeType: "image/png", data: "aGk="},
        ]);
    });

    it("throws for a draft that doesn't exist", async () => {
        // Arrange
        const images = setUp(fetcher);

        // Act
        const result = images.describeImages("nope");

        // Assert
        await expect(result).rejects.toThrow(DraftNotFoundError);
    });
});
