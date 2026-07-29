/**
 * This widget is for embedding Khan Academy Python programs.
 */
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import React, {forwardRef, useImperativeHandle} from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import {withDependencies} from "../../components/with-dependencies";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/python-program/python-ai-utils";

import type {
    PerseusDependenciesV2,
    Widget,
    WidgetExports,
    WidgetPropsV2,
} from "../../types";
import type {UnsupportedWidgetPromptJSON} from "../../widget-ai-utils/unsupported-widget";
import type {PerseusPythonProgramWidgetOptions} from "@khanacademy/perseus-core";

function getUrlFromProgramID(programID: string) {
    return `/python-program/${programID}/embedded`;
}

type Props = WidgetPropsV2<PerseusPythonProgramWidgetOptions> & {
    dependencies: PerseusDependenciesV2;
};

// The Widget-interface methods this component exposes via its ref.
type WidgetHandle = Pick<Widget, "getPromptJSON">;

/**
 * This renders the program in an iframe.
 */
const PythonProgram = forwardRef<WidgetHandle, Props>(
    function PythonProgram(props, ref) {
        const {strings, locale} = usePerseusI18n();
        const {programID, height} = props.options;
        const {dependencies} = props;

        useImperativeHandle(ref, () => ({
            getPromptJSON: (): UnsupportedWidgetPromptJSON => {
                return _getPromptJSON();
            },
        }));

        const url = dependencies.generateUrl({
            url: getUrlFromProgramID(programID),
            context: "python_program:program_url",
            kaLocale: locale,
        });

        const iframeStyle = {
            height,
            width: "100%",
        } as const;

        const sandboxOptions = [
            "allow-popups",
            "allow-same-origin",
            "allow-scripts",
            "allow-top-navigation",
        ].join(" ");

        // We sandbox the iframe so that we allowlist only the functionality
        //  that we need. This makes it a bit safer in case some content
        //  creator "went wild".
        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        return (
            <View style={styles.container}>
                <iframe
                    title={strings.pythonProgram}
                    sandbox={sandboxOptions}
                    src={url}
                    style={iframeStyle}
                    allowFullScreen={true}
                />
            </View>
        );
    },
);

const styles = StyleSheet.create({
    container: {
        margin: "auto",
        width: "100%",
    },
});

const WrappedPythonProgram = withDependencies(PythonProgram);

export default {
    name: "python-program",
    displayName: "Python Program",
    widget: WrappedPythonProgram,
} satisfies WidgetExports<typeof WrappedPythonProgram>;
