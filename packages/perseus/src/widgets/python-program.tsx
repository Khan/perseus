/**
 * This widget is for embedding Khan Academy Python programs.
 */

import {StyleSheet, css} from "aphrodite";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import {getDependencies} from "../dependencies";
import {isFileProtocol} from "../util/mobile-native-utils";
import {toAbsoluteUrl} from "../util/url-utils";

import type {WidgetExports} from "../types";

function getUrlFromProgramID(programID: any) {
    const {InitialRequestUrl} = getDependencies();

    const path = `/python-program/${programID}/embedded`;

    return toAbsoluteUrl(path);
}

/* This renders the program in an iframe. */
class PythonProgram extends React.Component<any> {
    static propTypes = {
        programID: PropTypes.string,
        height: PropTypes.number,
    };

    static defaultProps: any = {
        height: 400,
    };

    render(): React.ReactNode {
        if (!this.props.programID) {
            return <div />;
        }

        let url = getUrlFromProgramID(this.props.programID);
        let className = "perseus-python-program";
        const style = {
            height: this.props.height,
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
            <div className={css(styles.container)}>
                <iframe
                    sandbox={sandboxOptions}
                    src={url}
                    style={style}
                    className={className}
                    allowFullScreen={true}
                />
            </div>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: "auto",
        width: "100%",
    },
});

export default {
    name: "python-program",
    displayName: "Python Program",
    widget: PythonProgram,
} as WidgetExports<typeof PythonProgram>;
