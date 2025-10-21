export {libVersion} from "./version";

export {default as ArticleEditor} from "./article-editor";
export {default as DeviceFramer} from "./components/device-framer";
export {default as ViewportResizer} from "./components/viewport-resizer";
export {default as ArticleDiff} from "./diffs/article-diff";
export {default as ItemDiff} from "./diffs/item-diff";
export {default as EditorPage} from "./editor-page";
export {default as Editor} from "./editor";
export {default as IframeContentRenderer} from "./iframe-content-renderer";
export {default as ContentPreview} from "./content-preview";
export type {Issue} from "./components/issues-panel";

import "./styles/perseus-editor.css";

// eslint-disable-next-line import/order
import {Widgets, widgets} from "@khanacademy/perseus";
import AllEditors from "./all-editors";

Widgets.registerEditors(AllEditors);
Widgets.registerWidgets(widgets);

Widgets.replaceDeprecatedWidgets();
Widgets.replaceDeprecatedEditors();

export {AllEditors, widgets};
