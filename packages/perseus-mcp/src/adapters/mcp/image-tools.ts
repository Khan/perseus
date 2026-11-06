// The tool for describing an item's images: what describes each one now,
// where to change it, and the images themselves to look at.
import {z} from "zod";

import {MAX_ATTACHED} from "../../app/images";

import type {ImageUseCases} from "../../app/images";
import type {CallToolResult, McpServer} from "@modelcontextprotocol/server";

export function registerImageTools(
    server: McpServer,
    {
        images,
        run,
    }: {
        images: ImageUseCases;
        /** Runs a tool's handler, recording its errors under its name. */
        run: (
            tool: string,
            handler: () => CallToolResult | Promise<CallToolResult>,
        ) => Promise<CallToolResult>;
    },
): void {
    server.registerTool(
        "describe_images",
        {
            title: "Describe a draft's images",
            description:
                "Everything needed to write or check the alt text and long " +
                "descriptions of a draft's images: each image (where it is, " +
                "its URL, its alt text, long description, decorative flag, " +
                "caption and size), the JSON Pointers to change them with " +
                `edit_item, and up to ${MAX_ATTACHED} of the images ` +
                "themselves, attached so you can see them (PNG, JPEG, GIF or " +
                "WebP; a Graphie or Graffiti image can't be, and says what " +
                "to do instead), with the procedure to follow. Use it " +
                "whenever an item has images, and in review_item's image " +
                "step.",
            inputSchema: z.object({itemId: z.string()}),
            annotations: {readOnlyHint: true},
        },
        ({itemId}) =>
            run("describe_images", async () => {
                const {attachments, ...result} =
                    await images.describeImages(itemId);
                return {
                    content: [
                        {type: "text", text: JSON.stringify(result, null, 2)},
                        ...attachments.map((image) => ({
                            type: "image" as const,
                            data: image.data,
                            mimeType: image.mimeType,
                        })),
                    ],
                };
            }),
    );
}
