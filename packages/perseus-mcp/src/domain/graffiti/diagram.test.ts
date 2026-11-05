import {diagramIdsIn} from "./diagram";

describe("diagramIdsIn", () => {
    it("returns each diagram an item shows once, in order", () => {
        // Arrange
        const item = {
            question: {
                content: "[[☃ image 1]] [[☃ image 2]]",
                widgets: {
                    "image 1": {
                        options: {
                            backgroundImage: {
                                url: "web+graphie://perseus-mcp.localhost/graffiti/b2",
                            },
                        },
                    },
                    "image 2": {
                        options: {
                            backgroundImage: {
                                url: "web+graphie://perseus-mcp.localhost/graffiti/a1",
                            },
                        },
                    },
                },
            },
            hints: [
                {
                    content:
                        "![](web+graphie://perseus-mcp.localhost/graffiti/b2)",
                },
            ],
        };

        // Act
        const ids = diagramIdsIn(item);

        // Assert
        expect(ids).toEqual(["b2", "a1"]);
    });

    it("ignores Graphie images from anywhere else", () => {
        // Arrange, Act
        const ids = diagramIdsIn({
            url: "web+graphie://cdn.kastatic.org/ka-perseus-graphie/abc",
        });

        // Assert
        expect(ids).toEqual([]);
    });
});
