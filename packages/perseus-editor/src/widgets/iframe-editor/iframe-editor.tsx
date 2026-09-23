import {
    iframeLogic,
    type PerseusIFrameWidgetOptions,
} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import * as React from "react";

import BlurInput from "../../components/blur-input";
import {PairsEditor} from "../../components/pairs-editor";
import EditorJsonify from "../../mixins/editor-jsonify";

interface IframeEditorProps extends PerseusIFrameWidgetOptions {
    onChange: (options: PerseusIFrameWidgetOptions) => void;
}

/**
 * This is the main editor for this widget, to specify all the options.
 */
class IframeEditor extends React.Component<IframeEditorProps> {
    static defaultProps: PerseusIFrameWidgetOptions =
        iframeLogic.defaultWidgetOptions;

    handleChange(changes: Partial<PerseusIFrameWidgetOptions>) {
        this.props.onChange({
            url: this.props.url,
            settings: this.props.settings,
            width: this.props.width,
            height: this.props.height,
            allowFullScreen: this.props.allowFullScreen,
            allowTopNavigation: this.props.allowTopNavigation,
            ...changes,
        });
    }

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        return (
            <div>
                <div style={{fontWeight: "bold", textAlign: "center"}}>
                    This widget is deprecated! <br />
                    Try using the Video or CS Program widgets instead.
                </div>
                <label>
                    Url or Program ID:
                    <BlurInput
                        value={this.props.url}
                        onChange={(url) => this.handleChange({url})}
                    />
                </label>
                <br />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- TODO(LEMS-2871): Address a11y error */}
                <label>
                    Settings:
                    <PairsEditor
                        pairs={this.props.settings ?? []}
                        onChange={(settings) => this.handleChange({settings})}
                    />
                </label>
                <br />
                <label>
                    Width:
                    <BlurInput
                        value={String(this.props.width)}
                        onChange={(width) => this.handleChange({width})}
                    />
                </label>
                <label>
                    Height:
                    <BlurInput
                        value={String(this.props.height)}
                        onChange={(height) => this.handleChange({height})}
                    />
                </label>
                <Checkbox
                    label="Allow full screen"
                    checked={this.props.allowFullScreen}
                    onChange={(allowFullScreen) => {
                        this.handleChange({allowFullScreen});
                    }}
                />
                <br />
                <Checkbox
                    label="Allow iframe content to redirect the page"
                    checked={this.props.allowTopNavigation}
                    onChange={(allowTopNavigation) => {
                        this.handleChange({allowTopNavigation});
                    }}
                />
            </div>
        );
    }
}

export default IframeEditor;
