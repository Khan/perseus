import {linterGuideline} from "../lint";
import Rule from "../rule";

export default Rule.makeRule({
    name: "long-paragraph",
    selector: "paragraph",
    pattern: /^.{501,}/,
    lint: function (state, content, nodes, match) {
        return linterGuideline(`Paragraph too long:
This paragraph is ${content.length} characters long.
Shorten it to 500 characters or fewer.`);
    },
});
