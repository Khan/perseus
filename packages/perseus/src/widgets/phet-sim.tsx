/* eslint-disable react/forbid-prop-types, react/sort-comp */
/**
 * This is a PhET simulation widget. It is used for rendering simulations
 * from https://phet.colorado.edu/.
 */

import Banner from "@khanacademy/wonder-blocks-banner";
import PropTypes from "prop-types";
import * as React from "react";

import {getDependencies} from "../dependencies";
import * as Changeable from "../mixins/changeable";
import Util from "../util";

import type {WidgetExports} from "../types";

const {updateQueryString} = Util;

/* This renders the PhET sim */
class PhetSim extends React.Component<any> {
    static propTypes = {
        ...Changeable.propTypes,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        url: PropTypes.string,
        description: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            iframeRef: React.createRef<HTMLIFrameElement>(),
            errMessage: null,
        };
    }

    getUserInput: () => any = () => {
        return null;
    };

    async componentDidMount() {
        const {kaLocale} = getDependencies();
        if (!(await this.checkForLocale(kaLocale))) {
            this.setState({
                errMessage:
                    "Sorry, this simulation isn't available in your language!",
            });
        }
    }

    render(): React.ReactNode {
        const style = {
            width: String(this.props.width),
            height: String(this.props.height),
        } as const;

        const {kaLocale} = getDependencies();

        // Add "px" to unitless numbers
        Object.entries(style).forEach(([key, value]: [any, any]) => {
            if (!value.endsWith("%") && !value.endsWith("px")) {
                style[key] = value + "px";
            }
        });

        let url: string = this.props.url;
        url = updateQueryString(url, "locale", kaLocale);

        // The URL needs to start with https://phet.colorado.edu/
        // Do we want to allow users to paste in a relative path instead of
        // just a full link?
        if (
            url &&
            url.length &&
            !url.startsWith("https://phet.colorado.edu/")
        ) {
            // TODO(Anna): Do we want to report an error on this?
            url = "";
        }

        const sandboxProperties = "allow-same-origin allow-scripts";

        // We sandbox the iframe so that we allowlist only the functionality
        // that we need. This makes it a bit safer in case some content
        // creator "went wild".
        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        return (
            <>
                {this.state["errMessage"] && (
                    <Banner
                        kind="warning"
                        layout="floating"
                        text={this.state["errMessage"]}
                        onDismiss={() => {
                            this.setState({errMessage: null});
                        }}
                    />
                )}
                <iframe
                    ref={this.state["iframeRef"]}
                    sandbox={sandboxProperties}
                    style={style}
                    src={url}
                    srcDoc={url ? undefined : "Could not load PhET simulation."}
                    title={this.props.description}
                    allow="fullscreen"
                />
            </>
        );
    }

    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

    simpleValidate: (arg1: any) => any = (rubric) => {
        // @ts-expect-error - TS2339 - Property 'validate' does not exist on type 'typeof PhetSim'.
        return PhetSim.validate(this.getUserInput(), rubric);
    };

    async checkForLocale(kaLocale: string): Promise<boolean> {
        return fetch(this.props.url)
            .then((response: Response): Promise<string> => response.text())
            .then((html: string): boolean => {
                try {
                    // Find where window.phet.chipper.localeData is set.
                    const localeDataVar: string =
                        "window.phet.chipper.localeData = ";
                    const startIndex = html.indexOf(localeDataVar);
                    html = html.substring(startIndex + localeDataVar.length);
                    const endIndex = html.indexOf(";");
                    html = html.substring(0, endIndex);
                    const locales: string[] = Object.keys(JSON.parse(html));
                    return locales.includes(kaLocale);
                } catch {
                    // TODO(Anna): Feels like we should throw a different error if locale data
                    // isn't accessible... But what do we return in that case?
                    return false;
                }
            });
    }
}

export default {
    name: "phet-sim",
    displayName: "PhET Simulation",
    widget: PhetSim,
    // Let's not expose it to all content creators yet
    hidden: true,
} as WidgetExports<typeof PhetSim>;
