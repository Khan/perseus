import {Radio, Widgets} from "@khanacademy/perseus";

import {getEditor} from "./editor-registry";
import {initPerseusEditor} from "./init";
import RadioEditor from "./widgets/radio-editor";

import * as PerseusEditor from "./index";

describe("initPerseusEditor", () => {
    it("keeps the barrel side-effect free and registers editors explicitly", () => {
        expect(PerseusEditor.Editor).toBeDefined();
        expect(() => getEditor("radio")).toThrow(
            "Perseus widget editor registry accessed before initialization!",
        );

        initPerseusEditor();

        expect(getEditor("radio")).toBe(RadioEditor);
        expect(Widgets.getWidget("radio")).toBe(Radio.widget);
    });
});
