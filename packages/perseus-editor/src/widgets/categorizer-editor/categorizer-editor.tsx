import {
    Categorizer as CategorizerWidget,
    Changeable,
    EditorJsonify,
} from "@khanacademy/perseus";
import {categorizerLogic} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import * as React from "react";
import _ from "underscore";

import TextListEditor from "../../components/text-list-editor";

import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {CategorizerDefaultWidgetOptions} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

const Categorizer = CategorizerWidget.widget;

interface Props
    extends CategorizerDefaultWidgetOptions,
        Changeable.ChangeableProps {
    apiOptions?: APIOptionsWithDefaults;
}

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a categorizer widget that allows users to sort items into categories.
 */
class CategorizerEditor extends React.Component<Props> {
    static widgetName = "categorizer" as const;

    static defaultProps: CategorizerDefaultWidgetOptions =
        categorizerLogic.defaultWidgetOptions;

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        const categorizerProps: Partial<PropsFor<typeof Categorizer>> = {
            options: {
                items: this.props.items,
                categories: this.props.categories,
                // The preview keeps the authored item order so the editor's
                // item list lines up with the rows of the preview table.
                randomizeItems: false,
                values: [],
            },
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
                    // eslint-disable-next-line no-restricted-syntax
                    {...(categorizerProps as PropsFor<typeof Categorizer>)}
                />
            </div>
        );
    }
}

export default CategorizerEditor;
