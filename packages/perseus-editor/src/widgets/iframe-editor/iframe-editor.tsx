/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {
    iframeLogic,
    type PerseusIFrameWidgetOptions,
    type PerseusCSProgramSetting,
} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import * as React from "react";

import BlurInput from "../../components/blur-input";
import {deprecatedChangeableChange} from "../../mixins/changeable";
import EditorJsonify from "../../mixins/editor-jsonify";

import type {ChangeableProps, ChangeFn} from "../../mixins/changeable";

interface PairEditorProps extends PerseusCSProgramSetting, ChangeableProps {}

/**
 * This is used for editing a name/value pair.
 *
 * TODO: PairsEditor and PairEditor are duplicated
 * between iframe-editor and cs-program-editor;
 * we should consolidate them
 */
class PairEditor extends React.Component<PairEditorProps> {
    change: ChangeFn = (...args) => {
        return deprecatedChangeableChange.apply(this, args);
    };

    render(): React.ReactNode {
        return (
            <fieldset>
                <label>
                    Name:
                    <BlurInput
                        value={this.props.name}
                        onChange={this.change("name")}
                    />
                </label>
                <label>
                    Value:
                    <BlurInput
                        value={this.props.value}
                        onChange={this.change("value")}
                    />
                </label>
            </fieldset>
        );
    }
}

interface PairsEditorProps extends ChangeableProps {
    pairs: PerseusCSProgramSetting[];
}

/**
 * This is used for editing a set of name/value pairs.
 *
 * TODO: PairsEditor and PairEditor are duplicated
 * between iframe-editor and cs-program-editor;
 * we should consolidate them
 */
class PairsEditor extends React.Component<PairsEditorProps> {
    change: ChangeFn = (...args) => {
        return deprecatedChangeableChange.apply(this, args);
    };

    handlePairChange = (pairIndex: any, pair: any) => {
        // If they're both non empty, add a new one
        const pairs = this.props.pairs.slice();
        pairs[pairIndex] = pair;

        const lastPair = pairs[pairs.length - 1];
        if (lastPair.name && lastPair.value) {
            pairs.push({name: "", value: ""});
        }
        this.change("pairs", pairs);
    };

    render(): React.ReactNode {
        const editors = this.props.pairs.map((pair, i) => {
            return (
                <PairEditor
                    key={i}
                    name={pair.name}
                    value={pair.value}
                    onChange={this.handlePairChange.bind(this, i)}
                />
            );
        });
        return <div>{editors}</div>;
    }
}

interface IframeEditorProps
    extends PerseusIFrameWidgetOptions,
        ChangeableProps {}

/**
 * This is the main editor for this widget, to specify all the options.
 */
class IframeEditor extends React.Component<IframeEditorProps> {
    static widgetName = "iframe" as const;

    static defaultProps: PerseusIFrameWidgetOptions =
        iframeLogic.defaultWidgetOptions;

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return deprecatedChangeableChange.apply(this, args);
    };

    handleSettingsChange: (arg1: any) => void = (settings) => {
        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
        this.change({settings: settings.pairs});
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
                        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                        onChange={this.change("url")}
                    />
                </label>
                <br />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- TODO(LEMS-2871): Address a11y error */}
                <label>
                    Settings:
                    <PairsEditor
                        pairs={this.props.settings ?? []}
                        onChange={this.handleSettingsChange}
                    />
                </label>
                <br />
                <label>
                    Width:
                    <BlurInput
                        value={String(this.props.width)}
                        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                        onChange={this.change("width")}
                    />
                </label>
                <label>
                    Height:
                    <BlurInput
                        value={String(this.props.height)}
                        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
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
