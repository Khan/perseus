import TreeTransformer from "../tree-transformer";

import type {TraversalState} from "../tree-transformer";

describe("PerseusLinter tree transformer", () => {
    function clone(o) {
        return JSON.parse(JSON.stringify(o));
    }

    const tree1 = {
        id: 0,
        type: "root",
        content: [
            {id: 1, type: "text", content: "Hello, "},
            {
                id: 2,
                type: "em",
                content: {
                    id: 3,
                    type: "text",
                    content: "World!",
                },
            },
            {
                id: 4,
                type: "list",
                items: [
                    {id: 5, type: "text", content: "A"},
                    {id: 6, type: "text", content: "B"},
                    {id: 7, type: "text", content: "C"},
                ],
            },
        ],
    } as const;

    // These are three variants on the same tree where we use arrays
    // instead of single nodes. The tests below will be run over all
    // four variants, and should work the same for all.
    const tree2 = [clone(tree1)];
    const tree3 = clone(tree1);
    tree3.content[1].content = [tree3.content[1].content];
    const tree4 = clone(tree2);
    tree4[0].content[1].content = [tree4[0].content[1].content];

    const trees = [tree1, tree2, tree3, tree4];

    const postOrderTraversalOrder = [1, 3, 2, 5, 6, 7, 4, 0];
    const parentNodeIds = [-1, 0, 0, 2, 0, 4, 4, 4];
    const previousNodeIds = [-1, -1, 1, -1, 2, -1, 5, 6];
    const nextNodeIds = [-1, 2, 4, -1, -1, 6, 7, -1];

    // The first test will fill in this array mapping numbers to nodes
    // Then subsequent tests can use it
    const nodes: Array<any> = [];

    function getTraversalOrder(tree: any) {
        const order: Array<any> = [];
        new TreeTransformer(tree).traverse((n, state) => {
            order.push(n.id);
        });
        return order;
    }

    trees.forEach((tree: any, treenum: number) => {
        it("does post-order traversal of each node in the tree " +
            treenum, () => {
            const tt = new TreeTransformer(tree);
            const ids: Array<any> = [];

            tt.traverse((n: any) => {
                nodes[n.id] = n; // Remember the nodes by id for later tests
                ids.push(n.id);
            });

            // Post-order traversal means we visit the nodes on the way
            // back up, not on the way down.
            expect(ids).toEqual(postOrderTraversalOrder);
        });

        it("tracks the current node " + treenum, () => {
            new TreeTransformer(tree).traverse((n, state) => {
                expect(state.currentNode()).toEqual(n);
            });
        });

        it("correctly gets the siblings for each node " + treenum, () => {
            new TreeTransformer(tree).traverse((n: any, state) => {
                const previd = previousNodeIds[n.id];
                expect(state.hasPreviousSibling()).toEqual(previd >= 0);
                expect(state.previousSibling()).toEqual(
                    previd >= 0 ? nodes[previd] : null,
                );

                const nextid = nextNodeIds[n.id];
                expect(state.nextSibling()).toEqual(
                    nextid >= 0 ? nodes[nextid] : null,
                );
            });
        });

        it("knows the ancestors for each node: " + treenum, () => {
            const ancestorsById = [
                [],
                [0],
                [0],
                [0, 2],
                [0],
                [0, 4],
                [0, 4],
                [0, 4],
            ];
            const ancestorTypesById = [
                [],
                ["root"],
                ["root"],
                ["root", "em"],
                ["root"],
                ["root", "list"],
                ["root", "list"],
                ["root", "list"],
            ];

            new TreeTransformer(tree).traverse((n: any, state) => {
                expect(state.hasParent()).toEqual(
                    ancestorsById[n.id].length > 0,
                );
                const ancestorids = ancestorsById[n.id];
                expect(state.parent()).toEqual(
                    nodes[ancestorids[ancestorids.length - 1]],
                );
                expect(state.ancestors()).toEqual(
                    ancestorsById[n.id].map((id) => nodes[id]),
                );
                expect(ancestorsById[n.id].map((id) => nodes[id].type)).toEqual(
                    ancestorTypesById[n.id],
                );
            });
        });

        it("computes the textContent for each node " + treenum, () => {
            const textContentForNode = [
                "Hello, World!ABC",
                "Hello, ",
                "World!",
                "World!",
                "ABC",
                "A",
                "B",
                "C",
            ];

            new TreeTransformer(tree).traverse((n: any, state, content) => {
                expect(content).toEqual(textContentForNode[n.id]);
            });
        });

        it("can remove the next sibling " + treenum, () => {
            const expectedTraversals = [
                // if a node has no next sibling, the test is a no-op
                postOrderTraversalOrder,
                [1, 5, 6, 7, 4, 0],
                [1, 3, 2, 0],
                postOrderTraversalOrder,
                postOrderTraversalOrder,
                [1, 3, 2, 5, 7, 4, 0],
                [1, 3, 2, 5, 6, 4, 0],
                postOrderTraversalOrder,
            ];

            // For each node in the tree
            for (let id = 0; id < nodes.length; id++) {
                // Start with a copy of the tree
                const copy = clone(tree);

                // Remove the next sibling of the node with this id
                new TreeTransformer(copy).traverse((n: any, state: any) => {
                    if (n.id === id) {
                        state.removeNextSibling();
                    }

                    // Ensure that we don't iterate the removed sibling
                    expect(n.id).not.toEqual(nextNodeIds[id]);
                });

                // And then get the traversal order of the resulting tree
                const traversal = getTraversalOrder(copy);

                // Compare it to the expected value
                expect(traversal).toEqual(expectedTraversals[id]);
            }
        });

        it("won't try to replace the root of the tree " + treenum, () => {
            const copy = clone(tree);
            new TreeTransformer(copy).traverse((n, state) => {
                if (n === state.root) {
                    expect(() => state.replace()).toThrow();
                }
            });
        });

        it("Can remove nodes " + treenum, () => {
            const expectedTraversals = [
                null,
                [3, 2, 5, 6, 7, 4, 0],
                [1, 5, 6, 7, 4, 0],
                [1, 2, 5, 6, 7, 4, 0],
                [1, 3, 2, 0],
                [1, 3, 2, 6, 7, 4, 0],
                [1, 3, 2, 5, 7, 4, 0],
                [1, 3, 2, 5, 6, 4, 0],
            ];

            // Loop through all the nodes except the root
            for (let id = 1; id < nodes.length; id++) {
                // Make a copy of the tree
                const copy = clone(tree);
                // Remove this node from it
                new TreeTransformer(copy).traverse((n: any, state: any) => {
                    if (n.id === id) {
                        state.replace();
                    }
                });

                // Traverse what remains and see if we get what is expected
                expect(getTraversalOrder(copy)).toEqual(expectedTraversals[id]);
            }
        });

        it("Can replace nodes " + treenum, () => {
            const expectedTraversals = [
                null,
                [99, 3, 2, 5, 6, 7, 4, 0],
                [1, 99, 5, 6, 7, 4, 0],
                [1, 99, 2, 5, 6, 7, 4, 0],
                [1, 3, 2, 99, 0],
                [1, 3, 2, 99, 6, 7, 4, 0],
                [1, 3, 2, 5, 99, 7, 4, 0],
                [1, 3, 2, 5, 6, 99, 4, 0],
            ];

            // Loop through all the nodes except the root
            for (let id = 1; id < nodes.length; id++) {
                // Make a copy of the tree
                const copy = clone(tree);
                // Replace the node with a different one
                new TreeTransformer(copy).traverse((n: any, state) => {
                    if (n.id === id) {
                        state.replace({
                            // @ts-expect-error - TS2345 - Argument of type '{ id: number; type: string; }' is not assignable to parameter of type 'TreeNode'.
                            id: 99,
                            type: "replacement",
                        });
                    }

                    // Ensure that we don't traverse the new node
                    expect(n.id).not.toEqual(99);
                });

                // Traverse what remains and see if we get what is expected
                expect(getTraversalOrder(copy)).toEqual(expectedTraversals[id]);
            }
        });

        it("Can reparent nodes " + treenum, () => {
            const expectedTraversals = [
                null,
                [1, 99, 3, 2, 5, 6, 7, 4, 0],
                [1, 3, 2, 99, 5, 6, 7, 4, 0],
                [1, 3, 99, 2, 5, 6, 7, 4, 0],
                [1, 3, 2, 5, 6, 7, 4, 99, 0],
                [1, 3, 2, 5, 99, 6, 7, 4, 0],
                [1, 3, 2, 5, 6, 99, 7, 4, 0],
                [1, 3, 2, 5, 6, 7, 99, 4, 0],
            ];

            // Loop through all the nodes except the root
            for (let id = 1; id < nodes.length; id++) {
                // Make a copy of the tree
                const copy = clone(tree);
                let count = 0;
                // Replace the node with a different one
                new TreeTransformer(copy).traverse((n: any, state) => {
                    if (n.id === id) {
                        // Ensure that we don't traverse the node more than once
                        expect(++count).toEqual(1);
                        state.replace({
                            // @ts-expect-error - TS2345 - Argument of type '{ id: number; type: string; content: any; }' is not assignable to parameter of type 'TreeNode'.
                            id: 99,
                            type: "reparent",
                            content: n,
                        });
                    }

                    // Ensure that we don't traverse the new node
                    expect(n.id).not.toEqual(99);
                });

                // Traverse what remains and see if we get what is expected
                expect(getTraversalOrder(copy)).toEqual(expectedTraversals[id]);
            }
        });

        it("Can replace nodes with an array of nodes " + treenum, () => {
            const expectedTraversals = [
                null,
                [99, 101, 100, 3, 2, 5, 6, 7, 4, 0],
                [1, 99, 101, 100, 5, 6, 7, 4, 0],
                [1, 99, 101, 100, 2, 5, 6, 7, 4, 0],
                [1, 3, 2, 99, 101, 100, 0],
                [1, 3, 2, 99, 101, 100, 6, 7, 4, 0],
                [1, 3, 2, 5, 99, 101, 100, 7, 4, 0],
                [1, 3, 2, 5, 6, 99, 101, 100, 4, 0],
            ];

            // Loop through all the nodes except the root
            for (let id = 1; id < nodes.length; id++) {
                // Make a copy of the tree
                const copy = clone(tree);
                // Replace the node with two new ones
                new TreeTransformer(copy).traverse((n: any, state) => {
                    if (n.id === id) {
                        // @ts-expect-error - TS2345 - Argument of type '({ id: number; type: string; } | { id: number; type: string; content: { id: number; type: string; }; })[]' is not assignable to parameter of type 'TreeNode'.
                        state.replace([
                            {
                                id: 99,
                                type: "replacement",
                            },
                            {
                                id: 100,
                                type: "replacement",
                                content: {
                                    id: 101,
                                    type: "nested",
                                },
                            },
                        ]);
                    }

                    // Ensure that we don't traverse any new nodes
                    expect(n.id).not.toEqual(99);
                    expect(n.id).not.toEqual(100);
                    expect(n.id).not.toEqual(101);
                });

                // Traverse what remains and see if we get what is expected
                expect(getTraversalOrder(copy)).toEqual(expectedTraversals[id]);
            }
        });

        it("Can replace nodes with two nodes " + treenum, () => {
            const expectedTraversals = [
                null,
                [99, 101, 100, 3, 2, 5, 6, 7, 4, 0],
                [1, 99, 101, 100, 5, 6, 7, 4, 0],
                [1, 99, 101, 100, 2, 5, 6, 7, 4, 0],
                [1, 3, 2, 99, 101, 100, 0],
                [1, 3, 2, 99, 101, 100, 6, 7, 4, 0],
                [1, 3, 2, 5, 99, 101, 100, 7, 4, 0],
                [1, 3, 2, 5, 6, 99, 101, 100, 4, 0],
            ];

            // Loop through all the nodes except the root
            for (let id = 1; id < nodes.length; id++) {
                // Make a copy of the tree
                const copy = clone(tree);
                // Replace the node with two new ones
                new TreeTransformer(copy).traverse((n: any, state) => {
                    if (n.id === id) {
                        state.replace(
                            {
                                // @ts-expect-error - TS2345 - Argument of type '{ id: number; type: string; }' is not assignable to parameter of type 'TreeNode'.
                                id: 99,
                                type: "replacement",
                            },
                            {
                                id: 100,
                                type: "replacement",
                                content: {
                                    id: 101,
                                    type: "nested",
                                },
                            },
                        );
                    }

                    // Ensure that we don't traverse any new nodes
                    expect(n.id).not.toEqual(99);
                    expect(n.id).not.toEqual(100);
                    expect(n.id).not.toEqual(101);
                });

                // Traverse what remains and see if we get what is expected
                expect(getTraversalOrder(copy)).toEqual(expectedTraversals[id]);
            }
        });

        it("goToParent() and goToPreviousSibling() work " + treenum, () => {
            // Traverse the tree, saving copies of the state object
            // for each node. Then check that goToParent() and
            // goToPreviousSibling() on each saved state object
            // modify the states in apprpriate ways.
            const states: Array<TraversalState> = [];

            const tt = new TreeTransformer(tree);
            tt.traverse((n: any, state, content) => {
                states[n.id] = state.clone();
                // Verify that a clone() and equal() work as expected
                expect(state.equals(states[n.id])).toBeTruthy();
            });

            // Check that goToPreviousSibling() works
            for (let n = 0; n < states.length; n++) {
                const state = states[n].clone();
                const previousNodeId = previousNodeIds[n];
                if (previousNodeId === -1) {
                    expect(() => {
                        state.goToPreviousSibling();
                    }).toThrow();
                } else {
                    state.goToPreviousSibling();
                    expect(state.equals(states[previousNodeId])).toBeTruthy();
                }
            }

            // Check that goToParent() works
            for (let n = 0; n < states.length; n++) {
                const state = states[n].clone();
                const parentNodeId = parentNodeIds[n];
                if (parentNodeId === -1) {
                    expect(() => {
                        state.goToParent();
                    }).toThrow();
                } else {
                    state.goToParent();
                    expect(state.equals(states[parentNodeId])).toBeTruthy();
                }
            }
        });
    });
});
