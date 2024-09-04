/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {
    linterContextProps,
    linterContextDefault,
} from "@khanacademy/perseus-linter";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Sortable from "../../components/sortable";
import {ApiOptions} from "../../perseus-api";
import Util from "../../util";

import type {SortableOption} from "../../components/sortable";
import type {WidgetExports} from "../../types";

const {shuffle} = Util;
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

class Sorter extends React.Component<any, any> {
    // @ts-expect-error - TS2564 - Property '_isMounted' has no initializer and is not definitely assigned in the constructor.
    _isMounted: boolean;

    static propTypes = {
        apiOptions: ApiOptions.propTypes,
        // eslint-disable-next-line react/forbid-prop-types
        correct: PropTypes.array,
        layout: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
        onChange: PropTypes.func,
        padding: PropTypes.bool,
        problemNum: PropTypes.number,
        trackInteraction: PropTypes.func.isRequired,
        linterContext: linterContextProps,
    };

    static defaultProps: any = {
        correct: [],
        layout: HORIZONTAL,
        padding: true,
        problemNum: 0,
        onChange: function () {},
        linterContext: linterContextDefault,
    };

    static validate(state: any, rubric: any): any {
        const correct = _.isEqual(state.options, rubric.correct);

        return {
            type: "points",
            earned: correct ? 1 : 0,
            total: 1,
            message: null,
        };
    }

    state: any = {
        changed: false,
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        if (!this._isMounted) {
            return;
        }

        this.setState({changed: true}, () => {
            // Wait until all components have rendered. In React 16, the
            // setState callback fires immediately after componentDidUpdate,
            // and there is no guarantee that parent/siblings components have
            // finished rendering.
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
            // eslint-disable-next-line no-restricted-syntax
            setTimeout(() => {
                this.props.onChange(e);
                this.props.trackInteraction();
            }, 0);
        });
    };

    getUserInput: () => {
        options: any;
    } = () => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'getOptions' does not exist on type 'ReactInstance'.
        return {options: this.refs.sortable.getOptions()};
    };

    moveOptionToIndex: (option: SortableOption, index: number) => void = (
        option,
        index,
    ) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'moveOptionToIndex' does not exist on type 'ReactInstance'.
        this.refs.sortable.moveOptionToIndex(option, index);
    };

    simpleValidate: (arg1: any) => any = (rubric) => {
        // If this widget hasn't been changed yet, we treat it as "empty" which
        // prevents the "Check" button from becoming active. We want the user
        // to make a change before trying to move forward. This makes an
        // assumption that the initial order isn't the correct order! However,
        // this should be rare if it happens, and interacting with the list
        // will enable the button, so they won't be locked out of progressing.
        if (!this.state.changed) {
            return {
                type: "invalid",
                message: null,
            };
        }

        return Sorter.validate(this.getUserInput(), rubric);
    };

    render(): React.ReactNode {
        const options = shuffle(
            this.props.correct,
            this.props.problemNum,
            /* ensurePermuted */ true,
        );

        const {apiOptions} = this.props;
        const marginPx = apiOptions.isMobile ? 8 : 5;

        return (
            <div className="perseus-widget-sorter perseus-clearfix">
                <Sortable
                    // @ts-expect-error - TS2322 - Type 'readonly unknown[]' is not assignable to type 'readonly string[]'.
                    options={options}
                    layout={this.props.layout}
                    margin={marginPx}
                    padding={this.props.padding}
                    onChange={this.handleChange}
                    linterContext={this.props.linterContext}
                    // eslint-disable-next-line react/no-string-refs
                    ref="sortable"
                />
            </div>
        );
    }
}

export default {
    name: "sorter",
    displayName: "Sorter",
    widget: Sorter,
    isLintable: true,
} as WidgetExports<typeof Sorter>;
