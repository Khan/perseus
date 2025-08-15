import type {
    PerseusRenderer,
    ImageWidget,
    PerseusImageBackground,
} from "@khanacademy/perseus-core";

export function imageQuestionBuilder(): ImageQuestionBuilder {
    return new ImageQuestionBuilder();
}

class ImageQuestionBuilder {
    private content: string = "[[☃ image 1]]";
    private backgroundImage: PerseusImageBackground = {};
    private title?: string;
    private caption?: string;
    private alt?: string;

    build(): PerseusRenderer {
        return {
            content: this.content,
            images: {},
            widgets: {
                "image 1": {
                    type: "image",
                    graded: true,
                    version: {major: 0, minor: 0},
                    static: false,
                    alignment: "default",
                    options: {
                        title: this.title,
                        caption: this.caption,
                        alt: this.alt,
                        backgroundImage: this.backgroundImage,
                    },
                } satisfies ImageWidget,
            },
        };
    }

    withContent(content: string): ImageQuestionBuilder {
        this.content = content;
        return this;
    }

    withImage(
        imageUrl: string,
        options?: {width?: number; height?: number},
    ): ImageQuestionBuilder {
        this.backgroundImage = {
            url: imageUrl,
            ...options,
        };
        return this;
    }

    withTitle(title: string): ImageQuestionBuilder {
        this.title = title;
        return this;
    }

    withCaption(caption: string): ImageQuestionBuilder {
        this.caption = caption;
        return this;
    }

    withAlt(alt: string): ImageQuestionBuilder {
        this.alt = alt;
        return this;
    }
}
