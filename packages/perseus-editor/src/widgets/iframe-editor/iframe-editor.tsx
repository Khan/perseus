/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {
    iframeLogic, PerseusCSProgramSetting,
    type PerseusIFrameWidgetOptions,
} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import * as React from "react";

import BlurInput from "../../components/blur-input";
import {deprecatedChangeableChange} from "../../mixins/changeable";
import EditorJsonify from "../../mixins/editor-jsonify";

import type {ChangeableProps} from "../../mixins/changeable";
import {PairsEditor} from "../../components/pairs-editor";

interface IframeEditorProps
    extends PerseusIFrameWidgetOptions,
        ChangeableProps {}

/**
 * This is the main editor for this widget, to specify all the options.
 */
class IframeEditor extends React.Component<IframeEditorProps> {
    static defaultProps: PerseusIFrameWidgetOptions =
        iframeLogic.defaultWidgetOptions;

    change: (arg1: any) => any = (...args) => {
        return deprecatedChangeableChange.apply(this, args);
    };

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
                        onChange={this.change("url")}
                    />
                </label>
                <br />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- TODO(LEMS-2871): Address a11y error */}
                <label>
                    Settings:
                    <PairsEditor
                        pairs={this.props.settings ?? []}
                        onChange={(settings) => this.change({settings})}
                    />
                </label>
                <br />
                <label>
                    Width:
                    <BlurInput
                        value={String(this.props.width)}
                        onChange={this.change("width")}
                    />
                </label>
                <label>
                    Height:
                    <BlurInput
                        value={String(this.props.height)}
                        onChange={this.change("height")}
                    />
                </label>
                <Checkbox
                    label="Allow full screen"
                    checked={this.props.allowFullScreen}
                    onChange={(value) => {
                        this.props.onChange({allowFullScreen: value});
                    }}
                />
                <br />
                <Checkbox
                    label="Allow iframe content to redirect the page"
                    checked={this.props.allowTopNavigation}
                    onChange={(value) => {
                        this.props.onChange({allowTopNavigation: value});
                    }}
                />
            </div>
        );
    }
}

export default IframeEditor;
