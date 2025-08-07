import {addons} from "storybook/manager-api";
import theme from "./theme";

addons.setConfig({
    sidebar: {
        // This will hide the root nodes in the sidebar and show it as folders instead.
        // See docs https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#roots
        showRoots: false,
    },
    theme: theme,
});
