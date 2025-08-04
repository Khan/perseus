import * as React from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import Renderer from "../../renderer";

import Choice from "./choice";

import type {ChoiceProps} from "./choice";

type Props = ChoiceProps & {
    showContent?: boolean;
};

type WithForwardRef = {
    forwardedRef: React.ForwardedRef<HTMLButtonElement>;
};

type PropsWithForwardRef = Props & WithForwardRef;

const ChoiceNoneAbove = function ({
    content,
    forwardedRef,
    showContent = true,
    ...rest
}: PropsWithForwardRef): React.ReactElement {
    const {strings} = usePerseusI18n();

    const choiceProps = {
        ...rest,
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
};

export default React.forwardRef<HTMLButtonElement, Props>(
    function ChoiceNoneAboveWithRef(props, ref) {
        return <ChoiceNoneAbove {...props} forwardedRef={ref} />;
    },
);
