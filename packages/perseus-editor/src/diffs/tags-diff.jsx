// @flow
/**
 * A side by side diff view for general passage layout tags.
 */

import * as React from "react";

import TextDiff from "./text-diff.jsx";

type Props = {|
    afterOnly: $ReadOnlyArray<string>,
    beforeOnly: $ReadOnlyArray<string>,
    intersection: $ReadOnlyArray<string>,
    showSeparator: boolean,
    title: string,
|};

class TagsDiff extends React.Component<Props> {
    static defaultProps: {|
        afterOnly: $ReadOnlyArray<any>,
        beforeOnly: $ReadOnlyArray<any>,
        showSeparator: boolean,
        title: string,
    |} = {
        afterOnly: [],
        beforeOnly: [],
        showSeparator: false,
        title: "Question tags",
    };

    render(): React.Element<"div"> {
        const {afterOnly, beforeOnly, intersection, showSeparator} = this.props;

        const beforeTags = intersection.concat(beforeOnly).join("\n") + "\n";
        const afterTags = intersection.concat(afterOnly).join("\n") + "\n";

        return (
            <div>
                <TextDiff
                    before={beforeTags}
                    after={afterTags}
                    title={this.props.title}
                />
                {showSeparator && <div className="diff-separator" />}
            </div>
        );
    }
}

export default TagsDiff;
