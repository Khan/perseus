import {imagesOf} from "../domain/items/images";

import {DraftNotFoundError} from "./errors";

import type {ItemImage} from "../domain/items/images";
import type {DraftRepository} from "../ports/draft-repository";
import type {FetchedImage, ImageFetcher} from "../ports/image-fetcher";

/** The most images one call attaches for the agent to look at. */
export const MAX_ATTACHED = 4;

/** How to describe the images, for the agent, with what describe_images returns. */
const PROCEDURE = `\
Before writing or checking a description, read the guidelines' image-descriptions
topic and math-images with get_guidelines. Then, for each image:
1. Look at it (the attached images, in the order of \`attached\`), and read the
   question, hints and answer around it with read_items or export_item.
2. Decide its purpose: assessment (the learner needs it to answer),
   instruction (it supports the text), or decorative (it adds nothing to the
   task).
3. Write its alt text (125 characters or less) and, if it needs more, a long
   description; or set decorative. Don't give the answer away.
4. Change the draft with edit_item at the pointers given, then run
   validate_item.
5. Tell the person the purpose you assumed for each image, with what you
   wrote, so they can check it. Don't stop to ask while drafting.
An image you can't see (a Graphie or Graffiti image, or one not attached):
describe it from the item, and for a Graffiti diagram from get_graffiti's script
and labels, and say you couldn't see it.`;

export type DescribedImage = ItemImage & {
    /** Whether it's attached to the result, or why not. */
    view: "attached" | string;
};

export function createImageUseCases(deps: {
    drafts: DraftRepository;
    images: ImageFetcher;
}) {
    function why(image: ItemImage): string {
        switch (image.format) {
            case "graffiti":
                return `a Graffiti diagram: get_graffiti("${image.graffitiId}") gives its script and labels`;
            case "graphie":
                return "a Graphie image (an SVG with labels laid over it), which can't be attached";
            default:
                return "not a PNG, JPEG, GIF or WebP URL";
        }
    }

    return {
        /**
         * The draft's images, each with its description, the pointers to
         * change it, and (up to MAX_ATTACHED raster images) the image itself.
         *
         * @throws DraftNotFoundError
         */
        async describeImages(itemId: string): Promise<{
            itemId: string;
            revision: number;
            question: string;
            images: DescribedImage[];
            attachments: FetchedImage[];
            procedure: string;
        }> {
            const draft = deps.drafts.get(itemId);
            if (draft == null) {
                throw new DraftNotFoundError(itemId);
            }
            const attachments: FetchedImage[] = [];
            const images: DescribedImage[] = [];
            for (const image of imagesOf(draft.item)) {
                if (image.format !== "raster") {
                    images.push({...image, view: why(image)});
                    continue;
                }
                if (attachments.length >= MAX_ATTACHED) {
                    images.push({
                        ...image,
                        view: `not attached: at most ${MAX_ATTACHED} images a call`,
                    });
                    continue;
                }
                const fetched = await deps.images.fetch(image.url);
                if ("error" in fetched) {
                    images.push({
                        ...image,
                        view: `not attached: ${fetched.error}`,
                    });
                } else {
                    attachments.push(fetched);
                    images.push({...image, view: "attached"});
                }
            }
            return {
                itemId,
                revision: draft.revision,
                question: draft.item.question.content,
                images,
                attachments,
                procedure: PROCEDURE,
            };
        },
    };
}

export type ImageUseCases = ReturnType<typeof createImageUseCases>;
