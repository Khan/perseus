// @flow
import ExampleGraphieWidget from "./widgets/example-graphie-widget.jsx";
import ExampleWidget from "./widgets/example-widget.jsx";
import SimpleMarkdownTester from "./widgets/simple-markdown-tester.jsx";

import type {WidgetExports} from "@khanacademy/perseus";

export default ([
    ExampleGraphieWidget,
    ExampleWidget,
    SimpleMarkdownTester,
]: $ReadOnlyArray<WidgetExports<>>);
