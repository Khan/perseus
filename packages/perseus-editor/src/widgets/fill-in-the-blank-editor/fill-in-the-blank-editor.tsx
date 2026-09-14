import {fillInTheBlankLogic, isFeatureOn} from "@khanacademy/perseus-core";
import * as React from "react";

import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {PerseusFillInTheBlankWidgetOptions} from "@khanacademy/perseus-core";

const defaultOptions: PerseusFillInTheBlankWidgetOptions =
    fillInTheBlankLogic.defaultWidgetOptions;

type Props = PerseusFillInTheBlankWidgetOptions & {
    onChange: (
        newOptions: Partial<PerseusFillInTheBlankWidgetOptions>,
        callback?: () => void,
    ) => void;
    apiOptions?: APIOptionsWithDefaults;
};

/**
 * Imperative API that WidgetEditor calls
 */
type FillInTheBlankEditorHandle = {
    serialize: () => PerseusFillInTheBlankWidgetOptions;
    getSaveWarnings: () => string[];
};

/**
 * An editor for a Fill in the Blank widget, where the learner drags answer
 * tiles from a choice bank into blanks in a passage.
 *
 * The controls are not built yet (LEMS-4371). Until they are, the editor
 * serializes the options it was given, so a widget authored in JSON mode
 * survives a round trip through the content editor.
 */
const FillInTheBlankEditor = React.forwardRef<
    FillInTheBlankEditorHandle,
    Props
>(function FillInTheBlankEditor(
    {
        content = defaultOptions.content,
        widgets = defaultOptions.widgets,
        tiles = defaultOptions.tiles,
        maxUsesPerTile = defaultOptions.maxUsesPerTile,
        randomize = defaultOptions.randomize,
        apiOptions,
    },
    ref,
) {
    React.useImperativeHandle(
        ref,
        () => ({
            serialize: () => {
                return {content, widgets, tiles, maxUsesPerTile, randomize};
            },

            // TODO(LEMS-3643): Remove `getSaveWarnings` once the frontend
            // uses the new linter rules for save warnings.
            getSaveWarnings: () => [],
        }),
        [content, widgets, tiles, maxUsesPerTile, randomize],
    );

    // TODO(LEMS-4396): clean up feature flag
    if (!isFeatureOn({apiOptions}, "dnd-widget-fitb")) {
        return null;
    }

    // TODO(LEMS-4371): FITB Content Editor
    return (
        <div data-testid="fill-in-the-blank-editor">
            The Fill in the Blank editor is not built yet. Edit this
            widget&rsquo;s options in JSON mode.
        </div>
    );
});

export default Object.assign(FillInTheBlankEditor, {
    defaultProps: defaultOptions,
});
