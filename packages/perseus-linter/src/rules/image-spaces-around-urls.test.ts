import {expectWarning, expectPass} from "../__tests__/test-utils";

import imageSpacesAroundUrlsRule from "./image-spaces-around-urls";

describe("image-spaces-around-urls", () => {
    expectWarning(imageSpacesAroundUrlsRule, [
        "![alternative]( http://example.com/image.jpg )",
        "![alternative]( http://example.com/image.jpg)",
        "![alternative](http://example.com/image.jpg )",
        "![alternative](\thttp://example.com/image.jpg)",
        "![alternative](http://example.com/image.jpg\t)",
        "![alternative](\nhttp://example.com/image.jpg)",
        "![alternative](http://example.com/image.jpg\n)",
    ]);
    expectPass(imageSpacesAroundUrlsRule, [
        "![alternative](http://example.com/image.jpg)",
        "![alternative](image.jpg)",
        "![alternative](--image.jpg--)",
    ]);
});
