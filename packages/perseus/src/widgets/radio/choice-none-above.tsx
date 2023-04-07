import * as i18n from "@khanacademy/wonder-blocks-i18n";
import * as React from "react";

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

const ChoiceNoneAbove = function (
    props: PropsWithForwardRef,
): React.ReactElement {
    const {showContent, content, forwardedRef, ...rest} = props;

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
                content={i18n._("None of the above")}
            />
        ),
    } as const;

    return <Choice {...choiceProps} ref={forwardedRef} />;
};

ChoiceNoneAbove.defaultProps = {
    showContent: true,
};

export default React.forwardRef<HTMLButtonElement, Props>((props, ref) => (
    <ChoiceNoneAbove {...props} forwardedRef={ref} />
));
