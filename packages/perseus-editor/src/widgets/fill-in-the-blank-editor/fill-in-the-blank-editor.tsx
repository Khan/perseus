import {fillInTheBlankLogic, isFeatureOn} from "@khanacademy/perseus-core";
import * as React from "react";

import type {APIOptions} from "@khanacademy/perseus";
import type {PerseusFillInTheBlankWidgetOptions} from "@khanacademy/perseus-core";

const defaultOptions: PerseusFillInTheBlankWidgetOptions =
    fillInTheBlankLogic.defaultWidgetOptions;

// TODO(benchristel): Define Props in terms of WidgetEditorProps. We can't do
//  this currently because `pnpm build:types` fails with a cryptic error. The
//  cause seems to be a combination of WidgetEditorProps' use of APIOptions and
//  the fact that this is a functional component.
interface Props extends PerseusFillInTheBlankWidgetOptions {
    onChange: (options: PerseusFillInTheBlankWidgetOptions) => void;
    apiOptions?: APIOptions;
}

/**
 * An editor for a Fill in the Blank widget, where the learner drags answer
 * tiles from a choice bank into blanks in a passage.
 *
 * The controls are not built yet (LEMS-4371). Until they are, the editor
 * serializes the options it was given, so a widget authored in JSON mode
 * survives a round trip through the content editor.
 */
function FillInTheBlankEditor({apiOptions}: Props) {
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
}

export default Object.assign(FillInTheBlankEditor, {
    defaultProps: defaultOptions,
});
