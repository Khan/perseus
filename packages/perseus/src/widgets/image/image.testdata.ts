import {
    generateTestPerseusRenderer,
    generateImageOptions,
    generateImageWidget,
} from "@khanacademy/perseus-core";

export const question = generateTestPerseusRenderer({
    content:
        "[[☃ image 1]]\n\n=====\n\nA quilter wants to make the design shown at left using the Golden Ratio. Specifically, he wants the ratio of the triangle heights $A:B$ and $B:C$ to each equal $1.62$. If the quilter makes the triangle height $A=8\\ \\text{in}$, approximately how tall should he make triangle height $C$?",
    widgets: {
        "image 1": generateImageWidget({
            options: generateImageOptions({
                title: "Image Title",
                caption: "Image Caption",
                alt: "An array of isosceles triangles. A triangle has height A. Two smaller triangle, one with height B and one with height C, have approximately the same combined height as A.",
                backgroundImage: {
                    url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/2ac8f769a7323f55e41c12cfa39e774be08bc138",
                    width: 420,
                    height: 345,
                },
            }),
        }),
    },
});

export const questionWithZoom = generateTestPerseusRenderer({
    content:
        "[[☃ image 1]]\n\n=====\n\nA quilter wants to make the design shown at left using the Golden Ratio. Specifically, he wants the ratio of the triangle heights $A:B$ and $B:C$ to each equal $1.62$. If the quilter makes the triangle height $A=8\\ \\text{in}$, approximately how tall should he make triangle height $C$?",
    widgets: {
        "image 1": generateImageWidget({
            options: generateImageOptions({
                title: "Image Title",
                caption: "Image Caption",
                alt: "An array of isosceles triangles. A triangle has height A. Two smaller triangle, one with height B and one with height C, have approximately the same combined height as A.",
                backgroundImage: {
                    url: "https://cdn.kastatic.org/ka-perseus-images/01f44d5b73290da6bec97c75a5316fb05ab61f12.jpg",
                    width: 1698,
                    height: 955,
                },
            }),
        }),
    },
});
