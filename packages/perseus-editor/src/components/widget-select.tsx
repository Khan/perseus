import {Widgets} from "@khanacademy/perseus";
import * as React from "react";
import _ from "underscore";

type WidgetSelectProps = {
    onChange?: (widgetType: string) => unknown;
};

class WidgetSelect extends React.Component<WidgetSelectProps> {
    shouldComponentUpdate() {
        return false;
    }

    handleChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
        const widgetType = e.currentTarget.value;
        if (widgetType === "") {
            // NOTE(alpert): Not sure if change will trigger here
            // but might as well be safe
            return;
        }
        if (this.props.onChange) {
            this.props.onChange(widgetType);
        }
    };

    render(): React.ReactNode {
        const widgets = Widgets.getPublicWidgets();
        const orderedWidgetNames = _.sortBy(_.keys(widgets), (name) => {
            return widgets[name].displayName;
        });
        const addWidgetString = "Add a widget\u2026";
        return (
            <select
                value=""
                onChange={this.handleChange}
                data-testid="editor__widget-select"
            >
                <option value="">{addWidgetString}</option>
                <option disabled>--</option>
                {orderedWidgetNames.map((name) => {
                    return (
                        <option key={name} value={name}>
                            {widgets[name].displayName}
                        </option>
                    );
                })}
            </select>
        );
    }
}

export default WidgetSelect;
