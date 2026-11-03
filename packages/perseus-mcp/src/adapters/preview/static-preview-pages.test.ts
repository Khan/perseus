/**
 * @jest-environment node
 */
import {mkdtemp, mkdir, writeFile} from "node:fs/promises";
import {tmpdir} from "node:os";
import path from "node:path";

import {
    createStaticAppPage,
    createStaticPreviewPages,
} from "./static-preview-pages";

import type {IncomingMessage, ServerResponse} from "node:http";

async function prebuiltPages() {
    const dir = await mkdtemp(path.join(tmpdir(), "perseus-mcp-pages-"));
    await mkdir(path.join(dir, "preview/assets"), {recursive: true});
    await writeFile(path.join(dir, "preview/shell.html"), "<p>shell</p>");
    await writeFile(path.join(dir, "preview/assets/shell-abc.js"), "code()");
    await writeFile(path.join(dir, "secret.txt"), "not an asset");
    await writeFile(path.join(dir, "preview-app.html"), "<p>app</p>");
    return dir;
}

/** Runs the middleware for `url`, reporting what it sent or that it passed. */
function request(
    pages: ReturnType<typeof createStaticPreviewPages>,
    url: string,
): Promise<{passed: true} | {status: number; type: string; body: string}> {
    return new Promise((resolve) => {
        let status = 0;
        let type = "";
        const res = {
            writeHead(code: number, headers: Record<string, string>) {
                status = code;
                type = headers["Content-Type"];
            },
            end(data: Buffer) {
                resolve({status, type, body: data.toString()});
            },
        };
        pages.middleware(
            // eslint-disable-next-line no-restricted-syntax
            {url} as IncomingMessage,
            // eslint-disable-next-line no-restricted-syntax
            res as unknown as ServerResponse,
            () => resolve({passed: true}),
        );
    });
}

describe("createStaticPreviewPages", () => {
    it("serves an asset with its content type", async () => {
        // Arrange
        const pages = createStaticPreviewPages(await prebuiltPages());

        // Act
        const response = await request(pages, "/preview/assets/shell-abc.js");

        // Assert
        expect(response).toEqual({
            status: 200,
            type: "text/javascript; charset=utf-8",
            body: "code()",
        });
    });

    it("passes requests outside the assets on", async () => {
        // Arrange
        const pages = createStaticPreviewPages(await prebuiltPages());

        // Act
        const response = await request(pages, "/drafts/abc/preview");

        // Assert
        expect(response).toEqual({passed: true});
    });

    it("passes on a path that climbs out of the assets directory", async () => {
        // Arrange
        const pages = createStaticPreviewPages(await prebuiltPages());

        // Act
        const response = await request(
            pages,
            "/preview/assets/..%2F..%2Fsecret.txt",
        );

        // Assert
        expect(response).toEqual({passed: true});
    });

    it("passes on an asset that doesn't exist", async () => {
        // Arrange
        const pages = createStaticPreviewPages(await prebuiltPages());

        // Act
        const response = await request(pages, "/preview/assets/missing.js");

        // Assert
        expect(response).toEqual({passed: true});
    });

    it("returns a page's HTML", async () => {
        // Arrange
        const pages = createStaticPreviewPages(await prebuiltPages());

        // Act
        const html = await pages.html("shell", "/drafts/abc/preview");

        // Assert
        expect(html).toBe("<p>shell</p>");
    });
});

describe("createStaticAppPage", () => {
    it("returns the prebuilt MCP Apps page", async () => {
        // Arrange
        const page = createStaticAppPage(await prebuiltPages());

        // Act
        const html = await page.html();

        // Assert
        expect(html).toBe("<p>app</p>");
    });
});
