export {default as ArticleEditor} from "./article-editor.jsx";
export {default as DeviceFramer} from "./components/device-framer.jsx";
export {default as ViewportResizer} from "./components/viewport-resizer.jsx";
export {default as ArticleDiff} from "./diffs/article-diff.jsx";
export {default as ItemDiff} from "./diffs/item-diff.jsx";
export {default as StructuredItemDiff} from "./diffs/structured-item-diff.jsx";
export {default as EditorPage} from "./editor-page.jsx";
export {default as Editor} from "./editor.jsx";
export {default as i18n} from "./i18n.jsx";
export {default as IframeContentRenderer} from "./iframe-content-renderer.jsx";
export {default as MultiRendererEditor} from "./multirenderer-editor.jsx";
export {default as StatefulArticleEditor} from "./stateful-article-editor.jsx";
export {default as StatefulEditorPage} from "./stateful-editor-page.jsx";

import "./styles/perseus-editor.less";

// eslint-disable-next-line import/order
import {Widgets} from "@khanacademy/perseus";
import AllEditors from "./all-editors";
import AllWidgets from "./all-widgets";

Widgets.registerEditors(AllEditors);
Widgets.registerWidgets(AllWidgets);

export {AllEditors, AllWidgets};
