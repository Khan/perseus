import {
    components,
    ApiOptions,
    Categorizer as CategorizerWidget,
    Changeable,
    EditorJsonify,
} from "@khanacademy/perseus";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";

const {TextListEditor} = components;
const Categorizer = CategorizerWidget.widget;

type Props = any;

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a categorizer widget that allows users to sort items into categories.
 */
class CategorizerEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        apiOptions: ApiOptions.propTypes,
        items: PropTypes.arrayOf(PropTypes.string),
        categories: PropTypes.arrayOf(PropTypes.string),
        values: PropTypes.arrayOf(PropTypes.number),
        randomizeItems: PropTypes.bool,
    };

    static widgetName = "categorizer" as const;

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        const categorizerProps: Partial<PropsFor<typeof Categorizer>> = {
            items: this.props.items,
            categories: this.props.categories,
            userInput: {values: this.props.values},
            handleUserInput: (userInput) => {
                this.props.onChange({values: userInput.values});
            },
            apiOptions: this.props.apiOptions,
            trackInteraction: function () {},
        };

        return (
            <div>
                <div className="perseus-widget-row">
                    <Checkbox
                        label="Randomize item order"
                        checked={this.props.randomizeItems}
                        onChange={(value) => {
                            this.props.onChange({randomizeItems: value});
                        }}
                    />
                </div>
                Categories:
                <TextListEditor
                    options={this.props.categories}
                    onChange={(cat) => {
                        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
                        this.change("categories", cat);
                    }}
                    layout="horizontal"
                />
                Items:
                <TextListEditor
                    options={this.props.items}
                    onChange={(items) => {
                        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                        this.change({
                            items: items,
                            // NOTE(eater): This truncates props.values so there
                            // are never more correct answers than items,
                            // ensuring the widget is possible to answer
                            // correctly. It doesn't necessarly keep each
                            // answer with its corresponding item if an item
                            // is deleted from the middle. Inconvenient, but
                            // it's at least possible for content creators to
                            // catch and fix.
                            values: _.first(this.props.values, items.length),
                        });
                    }}
                    layout="vertical"
                />
                {/* There are a bunch of props that renderer.jsx passes to each widget
                    via widget-container.jsx that we aren't passing to Categorizer here.
                    See perseus-all-package/types.js#WidgetProps for details. */}
                <Categorizer
                    {...(categorizerProps as PropsFor<typeof Categorizer>)}
                />
            </div>
        );
    }
}

export default CategorizerEditor;
