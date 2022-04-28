/* eslint-env node, mocha */
const assert = require("assert");

const GestureStateMachine = require("../src/components/gesture-state-machine");

const swipeThresholdPx = 5;
const longPressWaitTimeMs = 5;
const holdIntervalMs = 5;

// Generates a set of handlers, to be passed to a GestureStateMachine instance,
// that track any callbacks, along with their arguments, by pushing to the
// provided buffer on call.
const eventTrackers = (buffer) => {
    const handlers = {};
    const callbackNames = [
        "onBlur",
        "onFocus",
        "onTrigger",
        "onTouchEnd",
        "onLongPress",
        "onSwipeChange",
        "onSwipeEnd",
    ];
    callbackNames.forEach((callbackName) => {
        handlers[callbackName] = function() {
            buffer.push([callbackName, ...arguments]);
        };
    });
    return handlers;
};

// Arbitrary node IDs (representative of arbitrary keys) to be used in testing.
const NodeIds = {
    first: "first",
    second: "second",
    third: "third",
    swipeDisabled: "swipeDisabled",
    multiPressable: "multiPressable",
};

describe("GestureStateMachine", () => {
    let eventBuffer;
    let stateMachine;

    beforeEach(() => {
        eventBuffer = [];
        stateMachine = new GestureStateMachine(
            eventTrackers(eventBuffer),
            {
                swipeThresholdPx,
                longPressWaitTimeMs,
                holdIntervalMs,
            },
            [NodeIds.swipeDisabled],
            [NodeIds.multiPressable],
        );
    });

    const assertEvents = (expectedEvents) => {
        assert.deepEqual(eventBuffer, expectedEvents);
    };

    it("should trigger a tap on a simple button", () => {
        const touchId = 1;

        // Trigger a touch start, followed immediately by a touch end.
        stateMachine.onTouchStart(() => NodeIds.first, touchId, 0);
        stateMachine.onTouchEnd(() => NodeIds.first, touchId, 0);

        // Assert that we saw a focus and a touch end, in that order.
        const expectedEvents = [
            ["onFocus", NodeIds.first],
            ["onTouchEnd", NodeIds.first],
        ];
        assertEvents(expectedEvents);
    });

    it("should shift focus to a new button on move", () => {
        const touchId = 1;

        // Trigger a touch start on one node before moving over another node and
        // releasing.
        stateMachine.onTouchStart(() => NodeIds.first, touchId, 0);
        stateMachine.onTouchMove(() => NodeIds.second, touchId, 0);
        stateMachine.onTouchEnd(() => NodeIds.second, touchId, 0);

        // Assert that we saw a focus on both nodes.
        const expectedEvents = [
            ["onFocus", NodeIds.first],
            ["onFocus", NodeIds.second],
            ["onTouchEnd", NodeIds.second],
        ];
        assertEvents(expectedEvents);
    });

    it("should trigger a long press on hold", (done) => {
        const touchId = 1;

        /// Trigger a touch start.
        stateMachine.onTouchStart(() => NodeIds.first, touchId, 0);

        // Assert that we see a focus event immediately.
        const initialExpectedEvents = [["onFocus", NodeIds.first]];
        assertEvents(initialExpectedEvents);

        setTimeout(() => {
            const expectedEventsAfterLongPress = [
                ...initialExpectedEvents,
                ["onLongPress", NodeIds.first],
            ];
            assertEvents(expectedEventsAfterLongPress);

            // Finish up the interaction.
            stateMachine.onTouchEnd(() => NodeIds.first, touchId, 0);

            // Assert that we still see a touch-end.
            const expectedEventsAfterRelease = [
                ...expectedEventsAfterLongPress,
                ["onTouchEnd", NodeIds.first],
            ];
            assertEvents(expectedEventsAfterRelease);

            done();
        }, longPressWaitTimeMs);
    });

    it("should trigger multiple presses on hold", (done) => {
        const touchId = 1;

        // Trigger a touch start on the multi-pressable node.
        stateMachine.onTouchStart(() => NodeIds.multiPressable, touchId, 0);

        // Assert that we see an immediate focus and trigger.
        const initialExpectedEvents = [
            ["onFocus", NodeIds.multiPressable],
            ["onTrigger", NodeIds.multiPressable],
        ];
        assertEvents(initialExpectedEvents);

        setTimeout(() => {
            // Assert that we see an additional trigger after the delay.
            const expectedEventsAfterHold = [
                ...initialExpectedEvents,
                ["onTrigger", NodeIds.multiPressable],
            ];
            assertEvents(expectedEventsAfterHold);

            // Now release, and verify that we see a blur, but no touch-end.
            stateMachine.onTouchEnd(() => NodeIds.multiPressable, touchId, 0);
            const expectedEventsAfterRelease = [
                ...expectedEventsAfterHold,
                ["onBlur"],
            ];
            assertEvents(expectedEventsAfterRelease);

            done();
        }, holdIntervalMs);
    });

    it("should be robust to multiple touch starts", (done) => {
        const touchId = 1;

        // Trigger a touch start on the multi-pressable node twice, because
        // the webview was acting up.
        stateMachine.onTouchStart(() => NodeIds.multiPressable, touchId, 0);
        stateMachine.onTouchStart(() => NodeIds.multiPressable, touchId, 0);

        // Assert that we see only one set of focus and triggers.
        const initialExpectedEvents = [
            ["onFocus", NodeIds.multiPressable],
            ["onTrigger", NodeIds.multiPressable],
        ];
        assertEvents(initialExpectedEvents);

        setTimeout(() => {
            // Assert that we see an additional trigger after the delay.
            const expectedEventsAfterHold = [
                ...initialExpectedEvents,
                ["onTrigger", NodeIds.multiPressable],
            ];
            assertEvents(expectedEventsAfterHold);

            // Now release, and verify that we see a blur, but no touch-end.
            stateMachine.onTouchEnd(() => NodeIds.multiPressable, touchId, 0);
            const expectedEventsAfterRelease = [
                ...expectedEventsAfterHold,
                ["onBlur"],
            ];
            assertEvents(expectedEventsAfterRelease);

            setTimeout(() => {
                // Ensure the touch end cleaned it up, and that we didn't
                // create multiple listeners.
                assertEvents(expectedEventsAfterRelease);
                done();
            }, holdIntervalMs);
        }, holdIntervalMs);
    });

    /* Swiping. */

    it("should transition to a swipe", () => {
        const touchId = 1;

        // Trigger a touch start, followed by a move past the swipe threshold.
        const startX = 0;
        const swipeDistancePx = swipeThresholdPx + 1;
        stateMachine.onTouchStart(() => NodeIds.first, touchId, startX);
        stateMachine.onTouchMove(
            () => NodeIds.first,
            touchId,
            startX + swipeDistancePx,
            true,
        );
        stateMachine.onTouchEnd(
            () => NodeIds.first,
            touchId,
            startX + swipeDistancePx,
        );

        // Assert that the node is focused and then blurred before transitioning
        // to a swipe.
        const expectedEvents = [
            ["onFocus", NodeIds.first],
            ["onBlur"],
            ["onSwipeChange", swipeDistancePx],
            ["onSwipeEnd", swipeDistancePx],
        ];
        assertEvents(expectedEvents);
    });

    it("should not transition to a swipe when swiping is diabled", () => {
        const touchId = 1;

        // Trigger a touch start, followed by a move past the swipe threshold.
        const startX = 0;
        const swipeDistancePx = swipeThresholdPx + 1;
        stateMachine.onTouchStart(() => NodeIds.first, touchId, startX);
        stateMachine.onTouchMove(
            () => NodeIds.first,
            touchId,
            startX + swipeDistancePx,
            false,
        );

        // Assert that the node is focused but never blurred.
        const expectedEvents = [["onFocus", NodeIds.first]];
        assertEvents(expectedEvents);
    });

    it("should not transition to a swipe on drag from a locked key", () => {
        const touchId = 1;

        // Trigger a touch start, followed by a move past the swipe threshold.
        const startX = 0;
        const swipeDistancePx = swipeThresholdPx + 1;
        stateMachine.onTouchStart(() => NodeIds.swipeDisabled, touchId, startX);
        stateMachine.onTouchMove(
            () => NodeIds.swipeDisabled,
            touchId,
            startX + swipeDistancePx,
            true,
        );

        // Assert that the node is focused but never blurred.
        const expectedEvents = [["onFocus", NodeIds.swipeDisabled]];
        assertEvents(expectedEvents);
    });

    /* Multi-touch. */

    it("should respect simultaneous taps by two fingers", () => {
        const firstTouchId = 1;
        const secondTouchId = 2;

        // Tap down on the first node, then on the second node; then release
        // on the second, and then the first.
        stateMachine.onTouchStart(() => NodeIds.first, firstTouchId, 0);
        stateMachine.onTouchStart(() => NodeIds.second, secondTouchId, 0);
        stateMachine.onTouchEnd(() => NodeIds.second, secondTouchId, 0);
        stateMachine.onTouchEnd(() => NodeIds.first, firstTouchId, 0);

        // Assert that we saw a focus and a touch end, in that order.
        const expectedEvents = [
            ["onFocus", NodeIds.first],
            ["onFocus", NodeIds.second],
            ["onTouchEnd", NodeIds.second],
            ["onTouchEnd", NodeIds.first],
        ];
        assertEvents(expectedEvents);
    });

    it("should ignore any additional touches when swiping", () => {
        const firstTouchId = 1;
        const secondTouchId = 2;
        const thirdTouchId = 3;

        // Tap down on the first node, then on the second node. Then use the
        const startX = 0;
        stateMachine.onTouchStart(() => NodeIds.first, firstTouchId, startX);
        stateMachine.onTouchStart(() => NodeIds.second, secondTouchId, startX);

        // Now, swipe with the second finger.
        const swipeDistancePx = swipeThresholdPx + 1;
        stateMachine.onTouchMove(
            () => NodeIds.second,
            secondTouchId,
            startX + swipeDistancePx,
            true,
        );

        const expectedEventsAfterSwipeStart = [
            ["onFocus", NodeIds.first],
            ["onFocus", NodeIds.second],
            ["onBlur"],
            ["onSwipeChange", startX + swipeDistancePx],
        ];
        assertEvents(expectedEventsAfterSwipeStart);

        // Send some touch events via the non-swiping but active touch,
        // simulating moving the finger over another node, and even moving it
        // enough to swipe, before releasing.
        stateMachine.onTouchMove(() => NodeIds.first, firstTouchId, 0);
        stateMachine.onTouchMove(() => NodeIds.third, firstTouchId, 0);
        stateMachine.onTouchMove(
            () => NodeIds.third,
            firstTouchId,
            startX + swipeDistancePx,
            true,
        );
        stateMachine.onTouchEnd(() => NodeIds.third, firstTouchId, 0);

        // Assert that we see no new events.
        assertEvents(expectedEventsAfterSwipeStart);

        // Start a new touch event, over any node.
        stateMachine.onTouchStart(() => NodeIds.first, thirdTouchId, 0);

        // Assert that we still see no new events.
        assertEvents(expectedEventsAfterSwipeStart);

        // Finally, release with the second finger, which is mid-swipe.
        stateMachine.onTouchEnd(
            () => NodeIds.second,
            secondTouchId,
            startX + swipeDistancePx,
        );
        const expectedEventsAfterSwipeEnd = [
            ...expectedEventsAfterSwipeStart,
            ["onSwipeEnd", startX + swipeDistancePx],
        ];
        assertEvents(expectedEventsAfterSwipeEnd);
    });

    it("should track swipe displacement on a per-finger basis", () => {
        const firstTouchId = 1;
        const firstTouchStartX = 15;
        const secondTouchId = 2;
        const secondTouchStartX = firstTouchStartX + 2 * swipeThresholdPx;

        // Kick off two separate touch gestures at positions separated by more
        // than the swipe displacement.
        stateMachine.onTouchStart(
            () => NodeIds.first,
            firstTouchId,
            firstTouchStartX,
        );
        stateMachine.onTouchStart(
            () => NodeIds.second,
            secondTouchId,
            secondTouchStartX,
        );

        // Move less than the swipe threshold with both fingers.
        stateMachine.onTouchMove(
            () => NodeIds.first,
            firstTouchId,
            firstTouchStartX + swipeThresholdPx - 1,
            true,
        );
        stateMachine.onTouchMove(
            () => NodeIds.second,
            secondTouchId,
            secondTouchStartX + swipeThresholdPx - 1,
            true,
        );

        // Assert that we haven't started swiping--all we've done is focused the
        // various nodes.
        const initialExpectedEvents = [
            ["onFocus", NodeIds.first],
            ["onFocus", NodeIds.second],
        ];
        assertEvents(initialExpectedEvents);

        // Swipe past the threshold with one finger.
        const swipeDistancePx = swipeThresholdPx + 1;
        stateMachine.onTouchMove(
            () => NodeIds.first,
            firstTouchId,
            firstTouchStartX + swipeDistancePx,
            true,
        );
        const expectedEventsAfterSwipeStart = [
            ...initialExpectedEvents,
            ["onBlur"],
            ["onSwipeChange", swipeDistancePx],
        ];
        assertEvents(expectedEventsAfterSwipeStart);
    });

    it("should be robust to extraneous fingers", () => {
        const firstTouchId = 1;
        const firstTouchStartX = 15;
        const secondTouchId = 2;
        const secondTouchStartX = firstTouchStartX + 2 * swipeThresholdPx;

        // The first finger initiates a gesture, but the second finger starts
        // elsewhere on the screen and doesn't register a start...
        stateMachine.onTouchStart(
            () => NodeIds.first,
            firstTouchId,
            firstTouchStartX,
        );

        // Move the first finger, but less than the swipe threshold, and then
        // start showing move events from the second finger (as it slides into
        // the components we care about on screen)
        stateMachine.onTouchMove(
            () => NodeIds.first,
            firstTouchId,
            firstTouchStartX + swipeThresholdPx - 1,
            true,
        );
        stateMachine.onTouchMove(
            () => NodeIds.second,
            secondTouchId,
            secondTouchStartX,
            true,
        );

        // Assert we've started focusing but haven't blown up.
        const initialExpectedEvents = [["onFocus", NodeIds.first]];
        assertEvents(initialExpectedEvents);
    });
});
