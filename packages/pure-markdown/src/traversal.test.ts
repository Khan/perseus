import {describe, it, expect} from "@jest/globals";

import {traverseContent} from "./traversal";

import {parse} from "./index";

describe("traverseContent", () => {
    describe("basic node traversal", () => {
        it("should traverse simple text nodes", () => {
            // Arrange
            const markdown = "Hello world";
            const ast = parse(markdown);
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            expect(visitedNodes).toHaveLength(2); // paragraph + text node
            expect(visitedNodes[0]).toEqual({
                type: "paragraph",
                content: [{type: "text", content: "Hello world"}],
            });
            expect(visitedNodes[1]).toEqual({
                type: "text",
                content: "Hello world",
            });
        });

        it("should traverse math nodes", () => {
            // Arrange
            const markdown = "$x + y = z$";
            const ast = parse(markdown);
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            expect(visitedNodes).toHaveLength(1); // blockMath node only
            expect(visitedNodes[0]).toEqual({
                type: "blockMath",
                content: "x + y = z",
            });
        });

        it("should traverse mixed content with text and math", () => {
            // Arrange
            const markdown = "Hello $x + y$ world";
            const ast = parse(markdown);
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            expect(visitedNodes).toHaveLength(4); // paragraph + 3 content nodes
            expect(visitedNodes[0]).toEqual({
                type: "paragraph",
                content: [
                    {type: "text", content: "Hello "},
                    {type: "math", content: "x + y"},
                    {type: "text", content: " world"},
                ],
            });
            expect(visitedNodes[1]).toEqual({type: "text", content: "Hello "});
            expect(visitedNodes[2]).toEqual({type: "math", content: "x + y"});
            expect(visitedNodes[3]).toEqual({type: "text", content: " world"});
        });

        it("should traverse block math", () => {
            // Arrange
            const markdown = "$x^2 + y^2 = z^2$";
            const ast = parse(markdown);
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            expect(visitedNodes).toHaveLength(1);
            expect(visitedNodes[0]).toEqual({
                type: "blockMath",
                content: "x^2 + y^2 = z^2",
            });
        });
    });

    describe("special node types", () => {
        it("should traverse table nodes", () => {
            // Arrange
            const markdown = `| Header A | Header B |
                              |--------|--------|
                              | Cell A | Cell B |`;
            const ast = parse(markdown);
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            expect(visitedNodes.find((n) => n.type === "table")).toBeDefined();
            expect(
                visitedNodes.filter(
                    (n) => n.type === "text" && n.content.startsWith("Header "),
                ),
            ).toHaveLength(2);
            expect(
                visitedNodes.filter(
                    (n) => n.type === "text" && n.content.startsWith("Cell "),
                ),
            ).toHaveLength(2);
        });

        it("should traverse list nodes", () => {
            // Arrange
            const markdown = "- Item 1\n- Item 2";
            const ast = parse(markdown);
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            const listNode = visitedNodes.find((node) => node.type === "list");
            expect(listNode).toBeDefined();

            // Verify items are traversed (they're arrays, not individual listItem nodes)
            const textNodes = visitedNodes.filter(
                (node) => node.type === "text",
            );
            expect(textNodes).toHaveLength(2); // "Item 1" and "Item 2"
        });

        it("should traverse titled table nodes", () => {
            // Arrange
            // Use proper titled table syntax that actually creates a titledTable node
            const markdown =
                "|| My Title ||\n" +
                " Header A | Header B \n" +
                " - | - \n" +
                " Cell 1 | Cell 2 \n";
            const ast = parse(markdown);
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            const titledTableNode = visitedNodes.find(
                (node) => node.type === "titledTable",
            );
            expect(titledTableNode).toBeDefined();

            // Verify table property is traversed
            const tableNodes = visitedNodes.filter(
                (node) => node.type === "table",
            );
            expect(tableNodes.length).toBeGreaterThan(0);
        });

        it("should traverse columns nodes", () => {
            // Arrange
            const markdown =
                "Left column content\n\n=====\n\nRight column content";
            const ast = parse(markdown);
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            const columnsNode = visitedNodes.find(
                (node) => node.type === "columns",
            );
            expect(columnsNode).toBeDefined();

            // Verify col1 and col2 are traversed
            const paragraphNodes = visitedNodes.filter(
                (node) => node.type === "paragraph",
            );
            expect(paragraphNodes.length).toBeGreaterThan(0);
        });
    });

    describe("complex nested structures", () => {
        it("should traverse nested lists", () => {
            // Arrange
            const markdown = "- Item 1\n  - Nested item\n- Item 2";
            const ast = parse(markdown);
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            const listNodes = visitedNodes.filter(
                (node) => node.type === "list",
            );
            expect(listNodes.length).toBeGreaterThan(1); // Should have nested lists

            // Verify all text nodes from list items are traversed
            const textNodes = visitedNodes.filter(
                (node) => node.type === "text",
            );
            expect(textNodes.length).toBeGreaterThan(2); // Should have all list item texts
        });

        it("should traverse tables with complex content", () => {
            // Arrange
            const markdown =
                "| Header with $math$ |\n|--------|\n| Cell with **bold** |";
            const ast = parse(markdown);
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            const tableNode = visitedNodes.find(
                (node) => node.type === "table",
            );
            expect(tableNode).toBeDefined();

            // Should traverse math and strong nodes within table
            const mathNodes = visitedNodes.filter(
                (node) => node.type === "math",
            );
            const strongNodes = visitedNodes.filter(
                (node) => node.type === "strong",
            );
            expect(mathNodes.length).toBeGreaterThan(0);
            expect(strongNodes.length).toBeGreaterThan(0);
        });

        it("should traverse multiple block types", () => {
            // Arrange
            const markdown =
                "# Heading\n\nParagraph with $math$.\n\n- List item\n\n| Table |\n|-------|\n| Cell |";
            const ast = parse(markdown);
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            const headingNodes = visitedNodes.filter(
                (node) => node.type === "heading",
            );
            const paragraphNodes = visitedNodes.filter(
                (node) => node.type === "paragraph",
            );
            const mathNodes = visitedNodes.filter(
                (node) => node.type === "math",
            );
            const listNodes = visitedNodes.filter(
                (node) => node.type === "list",
            );
            const tableNodes = visitedNodes.filter(
                (node) => node.type === "table",
            );

            expect(headingNodes.length).toBeGreaterThan(0);
            expect(paragraphNodes.length).toBeGreaterThan(0);
            expect(mathNodes.length).toBeGreaterThan(0);
            expect(listNodes.length).toBeGreaterThan(0);
            expect(tableNodes.length).toBeGreaterThan(0);
        });
    });

    describe("edge cases", () => {
        it("should handle empty markdown", () => {
            // Arrange
            const markdown = "";
            const ast = parse(markdown);
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            expect(visitedNodes).toHaveLength(1); // newline node
            expect(visitedNodes[0]).toEqual({type: "newline"});
        });

        it("should handle whitespace-only markdown", () => {
            // Arrange
            const markdown = "   \n\n  ";
            const ast = parse(markdown);
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            expect(visitedNodes).toHaveLength(2); // paragraph + text node
            expect(visitedNodes[0]).toEqual({
                type: "paragraph",
                content: [{type: "text", content: "   "}],
            });
            expect(visitedNodes[1]).toEqual({type: "text", content: "   "});
        });

        it("should handle array input directly", () => {
            // Arrange
            const ast = [
                {
                    type: "paragraph",
                    content: [{type: "text", content: "Hello"}],
                },
                {
                    type: "paragraph",
                    content: [{type: "text", content: "World"}],
                },
            ];
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            expect(visitedNodes).toHaveLength(4); // 2 paragraphs + 2 text nodes
            expect(visitedNodes[0]).toEqual({
                type: "paragraph",
                content: [{type: "text", content: "Hello"}],
            });
            expect(visitedNodes[1]).toEqual({type: "text", content: "Hello"});
            expect(visitedNodes[2]).toEqual({
                type: "paragraph",
                content: [{type: "text", content: "World"}],
            });
            expect(visitedNodes[3]).toEqual({type: "text", content: "World"});
        });

        it("should handle null/undefined content gracefully", () => {
            // Arrange
            const ast = {type: "paragraph", content: null};
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            expect(visitedNodes).toHaveLength(1);
            expect(visitedNodes[0]).toEqual({type: "paragraph", content: null});
        });

        it("should handle nodes without content property", () => {
            // Arrange
            const ast = {type: "customNode", someOtherProp: "value"};
            const visitedNodes: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                visitedNodes.push(node);
            });

            // Assert
            expect(visitedNodes).toHaveLength(1);
            expect(visitedNodes[0]).toEqual({
                type: "customNode",
                someOtherProp: "value",
            });
        });
    });

    describe("callback behavior", () => {
        it("should call callback for each node exactly once", () => {
            // Arrange
            const markdown = "Hello $x + y$ world";
            const ast = parse(markdown);
            const callCount = {count: 0};

            // Act
            traverseContent(ast, (node) => {
                callCount.count++;
            });

            // Assert
            expect(callCount.count).toBe(4); // paragraph + 3 content nodes
        });

        it("should pass the correct node to callback", () => {
            // Arrange
            const markdown = "Hello $x^2$ world";
            const ast = parse(markdown);
            let receivedNode: any = null;

            // Act
            traverseContent(ast, (node) => {
                if (node.type === "math") {
                    receivedNode = node;
                }
            });

            // Assert
            expect(receivedNode).toEqual({type: "math", content: "x^2"});
        });

        it("should handle callback that returns values", () => {
            // Arrange
            const markdown = "Hello world";
            const ast = parse(markdown);
            const results: any[] = [];

            // Act
            traverseContent(ast, (node) => {
                return results.push(node.type);
            });

            // Assert
            expect(results).toEqual(["paragraph", "text"]);
        });
    });
});
