import {render, screen} from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";

import {testDependencies} from "../../../../testing/test-dependencies";
import * as Dependencies from "../dependencies";

import VideoTranscriptLink from "./video-transcript-link";

describe("VideoTranscriptLink", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            useVideo: (videoId, kind) => {
                if (videoId === "5qap5aO4i9A") {
                    return {
                        status: "success",
                        data: {
                            video: {
                                id: "YoutubeVideo",
                                title: "Youtube Video Title",
                                youtubeId: "5qap5aO4i9A",
                                contentId: "contentId",
                                __typename: "Video",
                            },
                        },
                    };
                }
                if (videoId === "slug-video-id") {
                    return {
                        status: "success",
                        data: {
                            video: {
                                id: "VideoId",
                                title: "Slug Video Title",
                                youtubeId: "YoutubeId",
                                contentId: "contentId",
                                __typename: "Video",
                            },
                        },
                    };
                }
                return {status: "loading"};
            },
        });
    });

    it("renders the title with youtube video name when given a youtube link", async () => {
        // Arrange
        render(
            <VideoTranscriptLink location="https://www.youtube.com/watch?v=5qap5aO4i9A" />,
        );

        // Assert
        // Find by Text test will fail if the indicated text is missing
        await screen.findByText("Youtube Video Title");
    });

    it("renders the title with slug video name when provided a slug-id", async () => {
        // Arrange
        render(<VideoTranscriptLink location="slug-video-id" />);

        // Assert
        await screen.findByText("Slug Video Title");
    });

    it("renders the button with the correct link", async () => {
        // Act
        render(<VideoTranscriptLink location="slug-video-id" />);

        // Assert
        await screen.findByText("Slug Video Title");
        await expect(screen.getByRole("link")).toHaveAttribute(
            "href",
            "/transcript/contentId",
        );
    });

    it("can parse a youtube URL with feature text", async () => {
        // Act
        render(
            <VideoTranscriptLink location="http://www.youtube.com/watch?v=5qap5aO4i9A&feature=feedrec_grec_index" />,
        );

        // Assert
        await screen.findByText("Youtube Video Title");
    });

    it("can parse a youtube URL with userID text", async () => {
        // Act
        render(
            <VideoTranscriptLink location="http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/5qap5aO4i9A" />,
        );

        // Assert
        await screen.findByText("Youtube Video Title");
    });

    it("can parse a youtube URL with location/language text", async () => {
        // Act
        render(
            <VideoTranscriptLink location="http://www.youtube.com/v/5qap5aO4i9A?fs=1&amp;hl=en_US&amp;rel=0" />,
        );

        // Assert
        await screen.findByText("Youtube Video Title");
    });

    it("can parse a youtube URL with a time stamp", async () => {
        // Act
        render(
            <VideoTranscriptLink location="http://www.youtube.com/watch?v=5qap5aO4i9A#t=0m10s" />,
        );

        // Assert
        await screen.findByText("Youtube Video Title");
    });

    it("can parse an embed youtube URL", async () => {
        // Act
        render(
            <VideoTranscriptLink location="http://www.youtube.com/embed/5qap5aO4i9A?rel=0" />,
        );

        // Assert
        await screen.findByText("Youtube Video Title");
    });

    it("can parse a shorthand youtube URL", async () => {
        // Act
        render(<VideoTranscriptLink location="http://youtu.be/5qap5aO4i9A" />);

        // Assert
        await screen.findByText("Youtube Video Title");
    });

    it("should link to /transcript/videoNotFound if the URL is not a youtube URL", () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            // @ts-expect-error - TS2322 - Type '(videoId: string, kind: VideoKind) => { status: "success"; data: {}; }' is not assignable to type '(id: string, kind: VideoKind) => Result<{ video: VideoData | null | undefined; }>'.
            useVideo: (videoId, kind) => {
                return {status: "success", data: {}};
            },
        });

        render(<VideoTranscriptLink location="http://stackoverflow.com" />);

        expect(
            screen.getByRole("link", {name: "See video transcript"}),
        ).toHaveAttribute("href", "/transcript/videoNotFound");
    });

    it("should handle a success state", () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            useVideo: (videoId, kind) => {
                return {status: "loading"};
            },
        });

        render(<VideoTranscriptLink location="regula-1" />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should link to /transcript/videoNotFound if there's no data", () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            // @ts-expect-error - TS2322 - Type '(videoId: string, kind: VideoKind) => { status: "success"; data: {}; }' is not assignable to type '(id: string, kind: VideoKind) => Result<{ video: VideoData | null | undefined; }>'.
            useVideo: (videoId, kind) => {
                return {status: "success", data: {}};
            },
        });

        render(<VideoTranscriptLink location="regula-1" />);

        expect(
            screen.getByRole("link", {name: "See video transcript"}),
        ).toHaveAttribute("href", "/transcript/videoNotFound");
    });

    it("should handle an error state", () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            // @ts-expect-error - TS2322 - Type '(videoId: string, kind: VideoKind) => { status: "error"; }' is not assignable to type '(id: string, kind: VideoKind) => Result<{ video: VideoData | null | undefined; }>'.
            useVideo: (videoId, kind) => {
                return {status: "error"};
            },
        });

        render(<VideoTranscriptLink location="regula-1" />);

        expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    });

    it("should handle an aborted state", () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            useVideo: (videoId, kind) => {
                return {status: "aborted"};
            },
        });

        render(<VideoTranscriptLink location="regula-1" />);

        expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    });
});
