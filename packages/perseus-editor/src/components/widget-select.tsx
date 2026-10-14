import {Widgets} from "@khanacademy/perseus";
import * as React from "react";
import _ from "underscore";

import type {APIOptions} from "@khanacademy/perseus";
import type {PerseusFeatureFlags} from "@khanacademy/perseus-core";

// TODO(LEMS-4396): clean up feature flag
const WIDGETS_BEHIND_FLAGS: Record<
    string,
    (typeof PerseusFeatureFlags)[number]
> = {
    "fill-in-the-blank": "dnd-widget-fitb",
};

type WidgetSelectProps = {
    onChange?: (widgetType: string) => unknown;
    flags?: APIOptions["flags"];
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
        const widgets = {...Widgets.getPublicWidgets()};

        // TODO(LEMS-4396): clean up feature flag
        for (const [widgetType, flag] of Object.entries(WIDGETS_BEHIND_FLAGS)) {
            const widgetExport = Widgets.getWidgetExport(widgetType);
            if (this.props.flags?.[flag] && widgetExport) {
                widgets[widgetType] = widgetExport;
            } else {
                delete widgets[widgetType];
            }
        }

        const orderedWidgetNames = _.sortBy(Object.keys(widgets), (name) => {
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
