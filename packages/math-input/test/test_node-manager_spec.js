/* eslint-env node, mocha */
const assert = require("assert");

const NodeManager = require("../src/components/node-manager");

describe("NodeManager", () => {
    let nodeManager;

    beforeEach(() => {
        nodeManager = new NodeManager();
    });

    it("should register a single node with no children", () => {
        const nodeId = "1";
        nodeManager.registerDOMNode(nodeId, {}, []);
        assert.ok(nodeManager._nodesById[nodeId]);
        assert.ok(nodeManager._orderedIds.includes(nodeId));
    });

    it("should register a single node with children", () => {
        const nodeId = "1";
        const childNodeIds = ["2", "3"];
        nodeManager.registerDOMNode(nodeId, {}, childNodeIds);

        assert.ok(nodeManager._orderedIds.includes(nodeId));
        assert.ok(nodeManager._nodesById[nodeId]);

        for (const childId of childNodeIds) {
            // The children should appear in the list of ordered IDs, but not
            // in the list of registered nodes.
            assert.ok(!nodeManager._nodesById[childId]);
            assert.ok(nodeManager._orderedIds.includes(childId));
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
            assert.ok(childIndex < parentIndex);
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
            assert.ok(nodeManager._nodesById[id]);
        }

        // Verify that the child is ahead of the parent, and only appears once.
        assert.deepEqual(nodeManager._orderedIds, [childNodeId, nodeId]);
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
                assert.ok(childIndex < parentIndex);
            }
        }
    });
});
