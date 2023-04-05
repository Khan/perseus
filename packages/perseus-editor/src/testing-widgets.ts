import ExampleGraphieWidget from "./widgets/example-graphie-widget";
import ExampleWidget from "./widgets/example-widget";
import SimpleMarkdownTester from "./widgets/simple-markdown-tester";

import type {WidgetExports} from "@khanacademy/perseus";

export default [
    ExampleGraphieWidget,
    ExampleWidget,
    SimpleMarkdownTester,
] as ReadonlyArray<WidgetExports>;
