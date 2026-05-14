import {SortableAssetTracker} from "../sortable-asset-tracker";

describe("SortableAssetTracker", () => {
    const assetKey = "test-sortable-key";
    let setAssetStatus: jest.Mock;
    let tracker: SortableAssetTracker;

    beforeEach(() => {
        setAssetStatus = jest.fn();
        tracker = new SortableAssetTracker(assetKey, setAssetStatus);
    });

    describe("markUnsettled", () => {
        it("marks the asset as unsettled immediately", () => {
            // Arrange, Act
            tracker.markUnsettled();

            // Assert
            expect(setAssetStatus).toHaveBeenCalledWith(assetKey, false);
        });

        it("settles the asset after the quiescence window", () => {
            // Arrange, Act
            tracker.markUnsettled();
            jest.advanceTimersByTime(50);

            // Assert
            expect(setAssetStatus).toHaveBeenLastCalledWith(assetKey, true);
        });

        it("does not settle before the quiescence window expires", () => {
            // Arrange, Act
            tracker.markUnsettled();
            jest.advanceTimersByTime(49);

            // Assert
            expect(setAssetStatus).not.toHaveBeenCalledWith(assetKey, true);
        });

        it("does not settle when called again mid-window", () => {
            // Arrange, Act: first call schedules a 50ms timer; second call
            // 30ms in resets that timer. Total clock reaches 50ms, which
            // would have fired the original timer if reset weren't working.
            tracker.markUnsettled();
            jest.advanceTimersByTime(30);
            tracker.markUnsettled();
            jest.advanceTimersByTime(20);

            // Assert
            expect(setAssetStatus).not.toHaveBeenCalledWith(assetKey, true);
        });

        it("settles after the new deadline when called mid-window", () => {
            // Arrange, Act: second call mid-window resets to a fresh 50ms
            // window. Advance well past the new deadline.
            tracker.markUnsettled();
            jest.advanceTimersByTime(30);
            tracker.markUnsettled();
            jest.advanceTimersByTime(120);

            // Assert
            expect(setAssetStatus).toHaveBeenCalledWith(assetKey, true);
        });
    });

    describe("markSettled", () => {
        it("marks the asset as settled immediately", () => {
            // Arrange, Act
            tracker.markSettled();

            // Assert
            expect(setAssetStatus).toHaveBeenCalledWith(assetKey, true);
        });

        it("clears any pending quiescence timer", () => {
            // Arrange
            tracker.markUnsettled();
            tracker.markSettled();
            const callCountAfterSettle = setAssetStatus.mock.calls.length;

            // Act: advance past where the cleared timer would have fired.
            jest.advanceTimersByTime(100);

            // Assert
            expect(setAssetStatus).toHaveBeenCalledTimes(callCountAfterSettle);
        });
    });
});
