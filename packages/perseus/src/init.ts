import basicWidgets from "./basic-widgets";
import extraWidgets from "./extra-widgets";
import * as Widgets from "./widgets";

declare const MathJax: any;

export type PerseusOptions = {
    // TODO(LEMS-1608): remove skipMathJax once we have completely removed the
    // legacy MathJax 2 renderer from webapp.
    skipMathJax: boolean;
};

/**
 * This should be called by all clients, specifying whether extra widgets are
 * needed via `loadExtraWidgets`. It is idempotent, so it's not a problem to
 * call it multiple times.
 *
 * skipMathJax:
 *   If false/undefined, MathJax will be configured, and the
 *   promise will wait for MathJax to load (if it hasn't already).
 */
const init = function (options: PerseusOptions): Promise<undefined> {
    Widgets.registerWidgets(basicWidgets);
    Widgets.registerWidgets(extraWidgets);

    Widgets.replaceDeprecatedWidgets();

    // Pass skipMathJax: true if MathJax is already loaded and configured.
    const skipMathJax = options.skipMathJax;

    if (skipMathJax) {
        // @ts-expect-error - TS2322 - Type 'Promise<void>' is not assignable to type 'Promise<undefined>'.
        return Promise.resolve();
    }

    return new Promise(
        (
            resolve: (result: Promise<never>) => void,
            reject: (error?: any) => void,
        ) => {
            MathJax.Hub.Config({
                messageStyle: "none",
                skipStartupTypeset: "none",
                "HTML-CSS": {
                    availableFonts: ["TeX"],
                    imageFont: null,
                    scale: 100,
                    showMathMenu: false,
                },
            });

            MathJax.Hub.Configured();
            MathJax.Hub.Queue(resolve);
        },
    );
};

export default init;
