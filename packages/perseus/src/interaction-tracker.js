// @flow

/**
 * This alternate version of `.track` does nothing as an optimization.
 */
function _noop() {}

/**
 * Wrapper for the trackInteraction apiOption.
 */
class InteractionTracker {
    _tracked: boolean;
    setting: string;
    track: (extraData?: any) => void;
    // eslint-disable-next-line flowtype/no-weak-types
    trackApi: Function;
    widgetID: string;
    widgetType: string;

    constructor(
        // eslint-disable-next-line flowtype/no-weak-types
        trackApi: Function, // original apiOptions.trackInteraction
        widgetType: string,
        widgetID: string,
        setting: "" | "all", // "" means track once
    ) {
        if (!trackApi) {
            this.track = _noop;
        } else {
            this._tracked = false;
            this.trackApi = trackApi;
            this.widgetType = widgetType;
            this.widgetID = widgetID;
            this.setting = setting;
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
    _track: (extraData: mixed) => void = (extraData: mixed) => {
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
