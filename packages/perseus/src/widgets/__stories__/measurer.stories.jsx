
// @flow
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui.jsx";
import {question1} from "../__testdata__/categorizer_testdata.js";
import Measurer from "../measurer.jsx";

export default {
    title: "Perseus/Widgets/Measurer",
};


const props = {
    "box": [
      480,
      480
    ],
    "image": {
      "url": "https://cdn.kastatic.org/ka-perseus-images/6318666cc0a7a7b35cca6cc2d25734cdebb5854a.png"
    },
    "rulerLabel": "",
    "rulerLength": 10,
    "rulerPixels": 40,
    "rulerTicks": 10,
    "showProtractor": true,
    "showRuler": false,
    "static": false,
    "widgetId": "measurer 1",
    "alignment": "default",
    "problemNum": 1992981480,
    "apiOptions": {
      "isArticle": false,
      "isMobile": false,
      "satStyling": false,
      "onInputError": "ƒ onInputError() {}",
      "onFocusChange": "ƒ () {}",
      "staticRender": false,
      "GroupMetadataEditor": "ƒ Z() {}",
      "showAlignmentOptions": false,
      "readOnly": false,
      "groupAnnotator": "ƒ groupAnnotator() {}",
      "baseElements": "{Link: ƒ Link() {}}",
      "setDrawingAreaAvailable": "ƒ () {}",
      "useDraftEditor": false,
      "styling": "{radioStyleVersion: \"final\"}",
      "canScrollPage": false,
      "inModal": true,
      "crossOutEnabled": false,
      "editorChangeDelay": 0,
      "hintProgressColor": "#1152b0",
      "customKeypad": false,
      "getAnotherHint": "ƒ () {}",
      "answerableCallback": "ƒ () {}",
      "interactionCallback": "ƒ interactionCallback() {}"
    },
    "keypadElement": {
      "props": "{children: Array(2), style: Array(3)}",
      "context": "{}",
      "refs": "{}",
      "updater": "{enqueueForceUpdate: ƒ enqueueForceUpdate() {}, enq…}",
      "_reactInternalFiber": "{alternate: {…}, child: {…}, childExpirationTime: 0…}",
      "state": null,
      "activate": "ƒ () {}",
      "dismiss": "ƒ () {}",
      "configure": "ƒ () {}",
      "setCursor": "ƒ () {}",
      "setKeyHandler": "ƒ () {}",
      "getDOMNode": "ƒ () {}"
    },
    "questionCompleted": false,
    "onFocus": "ƒ () {}",
    "onBlur": "ƒ () {}",
    "findWidgets": "ƒ () {}",
    "reviewModeRubric": null,
    "onChange": "ƒ onChange() {}",
    "trackInteraction": "ƒ ai() {}",
    "isLastUsedWidget": false,
    "linterContext": {
      "contentType": "",
      "highlightLint": false,
      "paths": "[]",
      "stack": "[\"widget\"]"
    },
    "containerSizeClass": "medium",
    "protractorX": 7.5,
    "protractorY": 0.5
  }


type StoryArgs = {||};

export const Question1 = (args: StoryArgs): React.Node => {
    return <Measurer.widget {...props} />;
};
