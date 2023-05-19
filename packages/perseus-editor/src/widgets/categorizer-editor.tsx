import {
    components,
    APIOptionsWithDefaults,
    Categorizer as CategorizerWidget,
    Changeable,
    EditorJsonify,
} from "@khanacademy/perseus";
import * as React from "react";
import _ from "underscore";

const {PropCheckBox, TextListEditor} = components;
const Categorizer = CategorizerWidget.widget;

type Props = typeof CategorizerEditor.defaultProps &
    Changeable.ChangeableProps & {
        apiOptions: APIOptionsWithDefaults;
        items: Array<string>;
        categories: Array<string>;
        values: Array<number>;
        randomizeItems: boolean;
    };

class CategorizerEditor extends React.Component<Props> {
    static widgetName = "categorizer" as const;

    static defaultProps = {
        items: [],
        categories: [],
        values: [],
        randomizeItems: false,
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        return (
            <div>
                <div className="perseus-widget-row">
                    <PropCheckBox
                        label="Randomize item order"
                        labelAlignment="right"
                        randomizeItems={this.props.randomizeItems}
                        onChange={this.props.onChange}
                    />
                </div>
                Categories:
                <TextListEditor
                    options={this.props.categories}
                    onChange={(cat) => {
                        Changeable.changeSingleProp(this, "categories", cat);
                    }}
                    layout="horizontal"
                />
                Items:
                <TextListEditor
                    options={this.props.items}
                    onChange={(items) => {
                        // @ts-expect-error [FEI-5003] - TS2554 - Expected 3 arguments, but got 1.
                        this.change({
                            items: items,
                            // TODO(eater): This truncates props.values so there
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
                {/* @ts-expect-error [FEI-5003] - TS2769 - No overload matches this call. */}
                <Categorizer
                    apiOptions={this.props.apiOptions}
                    items={this.props.items}
                    categories={this.props.categories}
                    values={this.props.values}
                    onChange={(newProps) => {
                        this.props.onChange(newProps);
                    }}
                    // eslint-disable-next-line react/jsx-no-bind
                    trackInteraction={function () {}}
                />
            </div>
        );
    }
}

export default CategorizerEditor;
