import {lintWarning} from "../lint";
import Rule from "../rule";

export default Rule.makeRule({
    name: "heading-level-1",
    selector: "heading",
    lint: function (state, content, nodes, match) {
        const heading: any = nodes[0];
        if (heading.level === 1) {
            return lintWarning(`Don't use level-1 headings:
Begin headings with two or more # characters.`);
        }
    },
});
