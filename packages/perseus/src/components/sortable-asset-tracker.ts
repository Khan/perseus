type SetAssetStatus = (assetKey: string, status: boolean) => void;

// 50ms covers a typical measure → setState → remeasure cascade without
// adding noticeable delay to Chromatic snapshots downstream.
const DEFAULT_QUIET_MS = 50;

export class SortableAssetTracker {
    private _timer: ReturnType<typeof setTimeout> | null = null;

    constructor(
        private readonly _assetKey: string,
        private readonly _setAssetStatus: SetAssetStatus,
        private readonly _quietMs: number = DEFAULT_QUIET_MS,
    ) {}

    markUnsettled(): void {
        this._setAssetStatus(this._assetKey, false);
        this._clearTimer();
        this._timer = setTimeout(() => {
            this._timer = null;
            this._setAssetStatus(this._assetKey, true);
        }, this._quietMs);
    }

    markSettled(): void {
        this._clearTimer();
        this._setAssetStatus(this._assetKey, true);
    }

    private _clearTimer(): void {
        if (this._timer != null) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    }
}
