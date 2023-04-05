import type {ImageWidget} from "../../perseus-types";

export const question = {
    content:
        "[[☃ image 1]]\n\n=====\n\nA quilter wants to make the design shown at left using the Golden Ratio. Specifically, he wants the ratio of the triangle heights $A:B$ and $B:C$ to each equal $1.62$. If the quilter makes the triangle height $A=8\\ \\text{in}$, approximately how tall should he make triangle height $C$?",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/511d44e43c38d8c76812517e9c6f48e64ea42b20.png":
            {height: 377, width: 460},
    },
    widgets: {
        "image 1": {
            alignment: "block",
            graded: true,
            options: {
                alt: "An array of isosceles triangles. A triangle has height A. Two smaller triangle, one with height B and one with height C, have approximately the same combined height as A.",
                title: "Image Title",
                caption: "Image Caption",
                backgroundImage: {
                    height: 345,
                    url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/2ac8f769a7323f55e41c12cfa39e774be08bc138",
                    width: 420,
                },
                box: [420, 345],
                labels: [],
                range: [
                    [0, 10],
                    [0, 10],
                ],
                static: false,
            },
            static: false,
            type: "image",
            version: {major: 0, minor: 0},
        } as ImageWidget,
    },
} as const;
