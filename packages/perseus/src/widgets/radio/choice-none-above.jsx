// @flow

import * as i18n from "@khanacademy/wonder-blocks-i18n";
import * as React from "react";

import Renderer from "../../renderer.jsx";

import Choice from "./choice.jsx";

import type {ChoiceProps} from "./choice.jsx";

type Props = {|
    ...ChoiceProps,
    showContent: boolean,
|};

type WithForwardRef = {|forwardedRef: React.Ref<"button">|};

type PropsWithForwardRef = {|
    ...Props,
    ...WithForwardRef,
|};

function ChoiceNoneAbove(props: PropsWithForwardRef): React.Node {
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
            <Renderer
                key="noneOfTheAboveRenderer"
                content={i18n._("None of the above")}
            />
        ),
    };

    return <Choice {...choiceProps} ref={forwardedRef} />;
}

ChoiceNoneAbove.defaultProps = {
    showContent: true,
};

type ExportProps = $Diff<
    React.ElementConfig<typeof ChoiceNoneAbove>,
    WithForwardRef,
>;

export default (React.forwardRef<ExportProps, HTMLButtonElement>(
    (props, ref) => <ChoiceNoneAbove {...props} forwardedRef={ref} />,
): React.AbstractComponent<ExportProps, HTMLButtonElement>);
