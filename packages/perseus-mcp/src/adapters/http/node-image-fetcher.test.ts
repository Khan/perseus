/**
 * @jest-environment node
 */
import {nodeImageFetcher} from "./node-image-fetcher";

const PNG = Buffer.from("89504e470d0a1a0a0000", "hex");

function respondWith(body: Buffer, status = 200) {
    jest.spyOn(global, "fetch").mockResolvedValue(
        new Response(new Uint8Array(body), {
            status,
            headers: {"content-type": "application/octet-stream"},
        }),
    );
}

describe("nodeImageFetcher", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("knows a PNG by its bytes, whatever its content type says", async () => {
        // Arrange
        respondWith(PNG);

        // Act
        const image = await nodeImageFetcher.fetch("https://example.com/a");

        // Assert
        expect(image).toEqual({
            mimeType: "image/png",
            data: PNG.toString("base64"),
        });
    });

    it("refuses what isn't an image an agent can see", async () => {
        // Arrange
        respondWith(Buffer.from("<svg></svg>"));

        // Act
        const image = await nodeImageFetcher.fetch("https://example.com/a.svg");

        // Assert
        expect(image).toEqual({
            error: "it isn't a PNG, JPEG, GIF or WebP image",
        });
    });

    it("says what the server answered when it fails", async () => {
        // Arrange
        respondWith(Buffer.from(""), 403);

        // Act
        const image = await nodeImageFetcher.fetch("https://example.com/a.png");

        // Assert
        expect(image).toEqual({error: "the server answered 403"});
    });
});
