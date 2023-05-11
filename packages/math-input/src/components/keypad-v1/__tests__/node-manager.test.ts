import NodeManager from "../node-manager";

describe("NodeManager", () => {
    let nodeManager;

    beforeEach(() => {
        nodeManager = new NodeManager();
    });

    it("should register a single node with no children", () => {
        const nodeId = "1";
        nodeManager.registerDOMNode(nodeId, {}, []);

        expect(nodeManager._nodesById[nodeId]).toBeTruthy();
        expect(nodeManager._orderedIds.includes(nodeId)).toBeTruthy();
    });

    it("should register a single node with children", () => {
        const nodeId = "1";
        const childNodeIds = ["2", "3"];
        nodeManager.registerDOMNode(nodeId, {}, childNodeIds);

        expect(nodeManager._orderedIds.includes(nodeId)).toBeTruthy();
        expect(nodeManager._nodesById[nodeId]).toBeTruthy();

        for (const childId of childNodeIds) {
            // The children should appear in the list of ordered IDs, but not
            // in the list of registered nodes.
            expect(!nodeManager._nodesById[childId]).toBeTruthy();
            expect(nodeManager._orderedIds.includes(childId)).toBeTruthy();
        }
    });

    it("should order children ahead of their parents", () => {
        const nodeId = "1";
        const childNodeIds = ["2", "3"];
        nodeManager.registerDOMNode(nodeId, {}, childNodeIds);

        const parentIndex = nodeManager._orderedIds.indexOf(nodeId);
        for (const childId of childNodeIds) {
            // The children should appear ahead of the parent in the ordered
            // list.
            const childIndex = nodeManager._orderedIds.indexOf(childId);
            expect(childIndex < parentIndex).toBeTruthy();
        }
    });

    it("should de-dupe the list of node IDs", () => {
        const nodeId = "1";
        const childNodeId = "2";

        // Register both nodes.
        nodeManager.registerDOMNode(nodeId, {}, [childNodeId]);
        nodeManager.registerDOMNode(childNodeId, {}, []);

        // Verify that both were added to the list of DOM nodes.
        for (const id of [nodeId, childNodeId]) {
            expect(nodeManager._nodesById[id]).toBeTruthy();
        }

        // Verify that the child is ahead of the parent, and only appears once.
        expect(nodeManager._orderedIds).toStrictEqual([childNodeId, nodeId]);
    });

    it("should handle multiple sets of children", () => {
        const firstNodeId = "1";
        const firstNodeChildIds = ["2", "3"];
        const secondNodeId = "4";
        const secondNodeChildIds = ["5", "6"];
        const nodeChildIdPairs = [
            [firstNodeId, firstNodeChildIds],
            [secondNodeId, secondNodeChildIds],
        ];

        for (const [nodeId, childNodeIds] of nodeChildIdPairs) {
            nodeManager.registerDOMNode(nodeId, {}, childNodeIds);
        }

        for (const [nodeId, childNodeIds] of nodeChildIdPairs) {
            const parentIndex = nodeManager._orderedIds.indexOf(nodeId);
            for (const childId of childNodeIds) {
                // The children should appear ahead of the parent in the
                // ordered list.
                const childIndex = nodeManager._orderedIds.indexOf(childId);
                expect(childIndex < parentIndex).toBeTruthy();
            }
        }
    });
});
