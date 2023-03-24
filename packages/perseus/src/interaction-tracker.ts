/**
 * This alternate version of `.track` does nothing as an optimization.
 */
function _noop() {}

/**
 * Wrapper for the trackInteraction apiOption.
 */
class InteractionTracker {
// @ts-expect-error [FEI-5003] - TS2564 - Property '_tracked' has no initializer and is not definitely assigned in the constructor.
    _tracked: boolean;
// @ts-expect-error [FEI-5003] - TS2564 - Property 'setting' has no initializer and is not definitely assigned in the constructor.
    setting: string;
    track: (extraData?: any) => void;
    // eslint-disable-next-line ft-flow/no-weak-types
    trackApi: any;
// @ts-expect-error [FEI-5003] - TS2564 - Property 'widgetID' has no initializer and is not definitely assigned in the constructor.
    widgetID: string;
// @ts-expect-error [FEI-5003] - TS2564 - Property 'widgetType' has no initializer and is not definitely assigned in the constructor.
    widgetType: string;

    constructor(
        // eslint-disable-next-line ft-flow/no-weak-types
        trackApi: any, // original apiOptions.trackInteraction
        widgetType: string,
        widgetID: string,
        setting: '' | 'all', // "" means track once
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
    _track: (extraData: unknown) => void = (extraData: unknown) => {
        if (this._tracked && !this.setting) {
            return;
        }
        this._tracked = true;
        this.trackApi({
            type: this.widgetType,
            id: this.widgetID,
// @ts-expect-error [FEI-5003] - TS2698 - Spread types may only be created from object types.
            ...extraData,
        });
    };
}

export default InteractionTracker;
