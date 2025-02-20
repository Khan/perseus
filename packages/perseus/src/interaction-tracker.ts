import type {APIOptions, Tracking} from "./types";

/**
 * This alternate version of `.track` does nothing as an optimization.
 */
function _noop() {}

/**
 * Wrapper for the trackInteraction apiOption.
 */
class InteractionTracker<T> {
    // @ts-expect-error - TS2564 - Property '_tracked' has no initializer and is not definitely assigned in the constructor.
    _tracked: boolean;
    // @ts-expect-error - TS2564 - Property 'setting' has no initializer and is not definitely assigned in the constructor.
    setting: Tracking;
    track: (extraData?: T) => void;
    trackApi: any;
    // @ts-expect-error - TS2564 - Property 'widgetID' has no initializer and is not definitely assigned in the constructor.
    widgetID: string;
    // @ts-expect-error - TS2564 - Property 'widgetType' has no initializer and is not definitely assigned in the constructor.
    widgetType: string;

    constructor(
        trackApi: APIOptions["trackInteraction"],
        widgetType: string,
        widgetID: string,
        setting: Tracking,
    ) {
        if (!trackApi) {
            this.track = _noop;
        } else {
            this._tracked = false;
            this.trackApi = trackApi;
            this.widgetType = widgetType;
            this.widgetID = widgetID;
            this.setting = setting;
            // @ts-expect-error: Type 'T | undefined' is not assignable to type 'T'.
            this.track = this._track;
        }
    }

    /**
     * Function that actually calls the API to mark the interaction. This is
     * private. The public version is just `.track` and is bound to this object
     * for easy use in other context.
     *
     * @param extraData Any extra data to track about the event.
     * @private
     */
    _track: (extraData: T) => void = (extraData) => {
        if (this._tracked && !this.setting) {
            return;
        }
        this._tracked = true;
        this.trackApi({
            type: this.widgetType,
            id: this.widgetID,
            ...extraData,
        });
    };
}

export default InteractionTracker;
