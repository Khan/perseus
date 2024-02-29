import {init, Widgets, Renderer} from "./perseus/src";
import GraphUtils from "./perseus/src/util/graphie";

export interface PerseusCore {
    init: typeof init;
    Widgets: typeof Widgets;
    Renderer: typeof Renderer;
    GraphUtils: typeof GraphUtils;
}
export {init, Widgets, Renderer, GraphUtils};

export type {WidgetExports} from "./perseus/src";
