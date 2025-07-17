import * as React from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import Renderer from "../../renderer";

import Choice from "./choice-option.temp.new";

import type {ChoiceProps} from "./choice-option.temp.new";

interface ChoiceNoneAboveProps extends ChoiceProps {
    showContent?: boolean;
}

/**
 * This component is a duplicate of the ChoiceNoneAbove component in choice-none-above.tsx
 * for the Radio Revitalization Project. (LEMS-2933)
 * This component will eventually replace choice-none-above.tsx when the feature flag is no longer needed.
 *
 * TODO(LEMS-2994): Clean up this file.
 */
const ChoiceNoneAbove = React.forwardRef<
    HTMLButtonElement,
    ChoiceNoneAboveProps
>(
    (
        {content, showContent = true, ...otherChoiceProps},
        forwardedRef,
    ): React.ReactElement => {
        const {strings} = usePerseusI18n();

        const choiceProps = {
            ...otherChoiceProps,
            content: showContent ? (
                content
            ) : (
                // We use a Renderer here because that is how
                // `this.props.content` is wrapped otherwise.
                // We pass in a key here so that we avoid a semi-spurious
                // react warning when we render this in the same place
                // as the previous choice content renderer.
                // Note this destroys state, but since all we're doing
                // is outputting "None of the above", that is okay.
                //
                // todo(matthewc): this seems like way overkill
                // just to render a string
                <Renderer
                    key="noneOfTheAboveRenderer"
                    content={strings.noneOfTheAbove}
                    strings={strings}
                />
            ),
        } as const;

        return <Choice {...choiceProps} ref={forwardedRef} />;
    },
);

export default ChoiceNoneAbove;
