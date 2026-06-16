import {expectWarning, expectPass} from "../__tests__/test-utils";

import imageSpacesAroundUrlsRule from "./image-spaces-around-urls";

describe("image-spaces-around-urls", () => {
    it.each([
        "![alternative]( http://example.com/image.jpg )",
        "![alternative]( http://example.com/image.jpg)",
        "![alternative](http://example.com/image.jpg )",
        "![alternative](\thttp://example.com/image.jpg)",
        "![alternative](http://example.com/image.jpg\t)",
        "![alternative](\nhttp://example.com/image.jpg)",
        "![alternative](http://example.com/image.jpg\n)",
    ])("imageSpacesAroundUrlsRule warns with: %s", (str: string) => {
        expectWarning(imageSpacesAroundUrlsRule, str);
    });

    it.each([
        "![alternative](http://example.com/image.jpg)",
        "![alternative](image.jpg)",
        "![alternative](--image.jpg--)",
    ])("imageSpacesAroundUrlsRule passes with: %s", (str: string) => {
        expectPass(imageSpacesAroundUrlsRule, str);
    });
});
