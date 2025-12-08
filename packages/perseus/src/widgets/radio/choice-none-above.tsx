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
        content: (
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
