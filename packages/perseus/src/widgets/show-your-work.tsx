/* eslint-disable no-console */
import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../components/i18n-context";
import * as Changeable from "../mixins/changeable";

import {ShowYourWork} from "./show-your-work/show-your-work";

import type {PerseusShowYourWorkWidgetOptions} from "../perseus-types";
import type {PerseusScore, WidgetExports, WidgetProps} from "../types";

type RenderProps = PerseusShowYourWorkWidgetOptions; // transform = _.identity

type Rubric = PerseusShowYourWorkWidgetOptions;

type UserInput = Empty;

type Props = WidgetProps<RenderProps, PerseusShowYourWorkWidgetOptions>;

type DefaultProps = {
    linterContext: Props["linterContext"];
};

class ShowYourWorkWidget extends React.Component<Props> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        linterContext: linterContextDefault,
    };

    _mounted: boolean = false;

    static validate(userInput: UserInput, rubric: Rubric): PerseusScore {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    }

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    getUserInput: () => Empty = () => {
        return {};
    };

    simpleValidate: (arg1: Rubric) => PerseusScore = (rubric) => {
        return ShowYourWorkWidget.validate(this.getUserInput(), rubric);
    };

    render(): React.ReactNode {
        return <ShowYourWork question="2x+5=10" />;
    }
}

export default {
    name: "show-your-work",
    displayName: "ShowYourWork",
    accessible: true,
    defaultAlignment: "inline",
    widget: ShowYourWorkWidget,
    transform: _.identity,
    isLintable: true,
} as WidgetExports<typeof ShowYourWorkWidget>;
