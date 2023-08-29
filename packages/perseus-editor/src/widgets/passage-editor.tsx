import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Editor from "../editor";

const {InfoTip, PropCheckBox} = components;

type Props = any;

class PassageEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        passageTitle: PropTypes.string,
        passageText: PropTypes.string,
        footnotes: PropTypes.string,
        showLineNumbers: PropTypes.bool,
    };

    static widgetName = "passage" as const;

    static defaultProps: Props = {
        passageTitle: "",
        passageText: "",
        footnotes: "",
        showLineNumbers: true,
    };

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        const passageEditor = (
            <Editor
                // eslint-disable-next-line react/no-string-refs
                ref="passage-editor"
                apiOptions={this.props.apiOptions}
                content={this.props.passageText}
                widgetEnabled={false}
                placeholder="Type passage here..."
                onChange={(newProps) => {
                    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                    this.change({passageText: newProps.content});
                }}
                showWordCount={true}
            />
        );
        const footnotesEditor = (
            <Editor
                // eslint-disable-next-line react/no-string-refs
                ref="passage-footnotes-editor"
                apiOptions={this.props.apiOptions}
                content={this.props.footnotes}
                widgetEnabled={false}
                placeholder="Type footnotes here..."
                onChange={(newProps) => {
                    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                    this.change({footnotes: newProps.content});
                }}
            />
        );
        return (
            <div className="perseus-widget-passage-editor">
                <div className="perseus-widget-row">
                    <PropCheckBox
                        label="Show line numbers"
                        labelAlignment="right"
                        showLineNumbers={this.props.showLineNumbers}
                        onChange={this.props.onChange}
                    />
                </div>
                <div>
                    Passage title:
                    <InfoTip>
                        <p>
                            An optional title that will appear directly above
                            the passage in the same font style. (E.g. Passage 1)
                        </p>
                    </InfoTip>
                    <div>
                        <input
                            type="text"
                            defaultValue={this.props.passageTitle}
                            onChange={(e) => {
                                // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                                this.change({passageTitle: e.target.value});
                            }}
                        />
                    </div>
                </div>
                <div>
                    Passage Text:
                    {passageEditor}
                </div>
                <div>
                    Footnotes:
                    <InfoTip>
                        <p>
                            To add footnotes, add ^ characters where they belong
                            in the passage. Then, add ^ in the footnotes area to
                            reference the footnotes in the passage.
                        </p>
                    </InfoTip>
                    {footnotesEditor}
                </div>
            </div>
        );
    }
}

export default PassageEditor;
