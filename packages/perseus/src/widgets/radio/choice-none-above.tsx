// @ts-expect-error [FEI-5003] - TS2307 - Cannot find module 'flow-to-typescript-codemod' or its corresponding type declarations.
import {Flow} from 'flow-to-typescript-codemod';

import * as i18n from "@khanacademy/wonder-blocks-i18n";
import * as React from "react";

import Renderer from '../../renderer';

import Choice from './choice';

import type {ChoiceProps} from './choice';

type Props = (ChoiceProps) & {
    showContent: boolean
};

type WithForwardRef = {
    forwardedRef: React.Ref<'button'>
};

type PropsWithForwardRef = (Props) & (WithForwardRef);

const ChoiceNoneAbove: React.FC<PropsWithForwardRef> = function(props): React.ReactElement {
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

type ExportProps = Flow.Diff<JSX.LibraryManagedAttributes<typeof ChoiceNoneAbove, React.ComponentProps<typeof ChoiceNoneAbove>>, WithForwardRef>;

// @ts-expect-error [FEI-5003] - TS2740 - Type '{ forwardedRef: ForwardedRef<Flow.Diff<ChoiceProps & { showContent: boolean; } & WithForwardRef & { children?: ReactNode; }, WithForwardRef>>; ... 300 more ...; focus(options?: FocusOptions | undefined): void; }' is missing the following properties from type 'ChoiceProps': apiOptions, checked, rationale, content, and 9 more.
export default React.forwardRef<ExportProps, HTMLButtonElement>((props, ref) => <ChoiceNoneAbove {...props} forwardedRef={ref} />) as Flow.AbstractComponent<ExportProps, HTMLButtonElement>;
