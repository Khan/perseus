import {init, Widgets, Renderer} from "./perseus/src";

export interface PerseusCore {
    init: typeof init;
    Widgets: typeof Widgets;
    Renderer: typeof Renderer;
}
export {init, Widgets, Renderer};

export type {WidgetExports} from "./perseus/src";
