/* eslint-disable react/forbid-prop-types, react/sort-comp */
/**
 * This is a PhET simulation widget. It is used for rendering simulations
 * from https://phet.colorado.edu/.
 */

import Banner from "@khanacademy/wonder-blocks-banner";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

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

    private readonly iframeRef: React.RefObject<HTMLIFrameElement>;
    private errMessage: string | null;

    constructor(props) {
        super(props);
        this.iframeRef = React.createRef<HTMLIFrameElement>();
        this.errMessage = null;
    }

    getUserInput: () => any = () => {
        return null;
    };

    componentDidMount() {
        if (this.iframeRef.current) {
            this.iframeRef.current.onload = () => {
                if (this.iframeRef.current) {
                    if (!this.checkForLocale(this.iframeRef.current)) {
                        this.errMessage =
                            "Sorry, this simulation isn't available in your language!";
                    }
                }
            };
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

        let url = this.props.url;

        // The URL needs to start with https://phet.colorado.edu/
        // Do we want to allow users to paste in a relative path instead of
        // just a full link?
        if (
            url &&
            url.length &&
            !url.startsWith("https://phet.colorado.edu/") // todo: find better check
        ) {
            // todo(anna): Error state, unable to provide content
            url = "";
            this.errMessage = "Cannot load PhET widget";
        }
        url = updateQueryString(url, "locale", kaLocale);

        const sandboxProperties = "allow-same-origin allow-scripts";

        // We sandbox the iframe so that we allowlist only the functionality
        // that we need. This makes it a bit safer in case some content
        // creator "went wild".
        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        return (
            <>
                {this.errMessage && (
                    <Banner
                        kind="warning"
                        layout="floating"
                        text={this.errMessage}
                        onDismiss={() => {
                            this.errMessage = null;
                        }}
                    />
                )}
                <iframe
                    ref={this.iframeRef}
                    sandbox={sandboxProperties}
                    style={style}
                    src={url}
                    aria-label={this.props.description}
                    allowFullScreen={true}
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

    checkForLocale: (arg1: HTMLIFrameElement) => boolean = (iframe) => {
        const {kaLocale} = getDependencies();
        if (iframe.contentWindow) {
            const locales: string[] = Object.keys(
                // TODO(Anna): Fix the CORS error
                iframe.contentWindow.phet.chipper.localeData,
            );
            return locales.includes(kaLocale);
        }
        // TODO(Anna): Feels like we should throw a different error if iframe.contentWindow
        // isn't accessible... But what do we return here, in that case?
        return false;
    };
}

export default {
    name: "phet-sim",
    displayName: "PhET Simulation",
    widget: PhetSim,
    // Let's not expose it to all content creators yet
    hidden: true,
} as WidgetExports<typeof PhetSim>;
