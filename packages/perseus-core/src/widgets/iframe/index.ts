import {getIFramePublicWidgetOptions} from "./iframe-util";

import type {PerseusIFrameWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusIFrameWidgetOptions = {
    url: "",
    settings: [{name: "", value: ""}],
    width: "400",
    height: "400",
    allowFullScreen: false,
    allowTopNavigation: false,
};

const iframeWidgetLogic: WidgetLogic<
    PerseusIFrameWidgetOptions,
    PerseusIFrameWidgetOptions
> = {
    name: "iframe",
    defaultWidgetOptions,
    getPublicWidgetOptions: getIFramePublicWidgetOptions,
    accessible: false,
};

export default iframeWidgetLogic;
