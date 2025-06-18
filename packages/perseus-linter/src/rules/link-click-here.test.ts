import {expectWarning, expectPass} from "../__tests__/test-utils";

import linkClickHereRule from "./link-click-here";

describe("link-click-here", () => {
    expectWarning(linkClickHereRule, [
        "[click here](http://google.com)",
        "[Click here, please](http://google.com)",
        "[For a good time, Click Here](http://google.com)",
    ]);
    expectPass(linkClickHereRule, [
        "[click to activate this link here](http://google.com)",
    ]);
});
