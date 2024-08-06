/* eslint-disable react/forbid-prop-types, react/sort-comp */
/**
 * This is a PhET simulation widget. It is used for rendering simulations
 * from https://phet.colorado.edu/.
 */

import Banner from "@khanacademy/wonder-blocks-banner";
import Button from "@khanacademy/wonder-blocks-button";
import PropTypes from "prop-types";
import * as React from "react";

import {getDependencies} from "../dependencies";
import * as Changeable from "../mixins/changeable";

import type {PerseusPhetSimWidgetOptions} from "../perseus-types";
import type {WidgetExports, WidgetProps} from "../types";

type RenderProps = PerseusPhetSimWidgetOptions; // transform = _.identity
type Props = WidgetProps<RenderProps, PerseusPhetSimWidgetOptions>;

type State = {
    errMessage: string | null;
};

/* This renders the PhET sim */
class PhetSim extends React.Component<Props, State> {
    static propTypes = {
        ...Changeable.propTypes,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        url: PropTypes.string,
        description: PropTypes.string,
    };

    private readonly url: URL | null;
    private readonly iframeRef: React.RefObject<HTMLIFrameElement>;

    state: State = {
        errMessage: null,
    };

    constructor(props) {
        super(props);
        // Initialize the URL
        const {kaLocale} = getDependencies();
        this.url = new URL(this.props.url);
        // TODO(Anna): Update kaLocale to match PhET locale format
        this.url.searchParams.set("locale", kaLocale);
        if (this.url.origin !== "https://phet.colorado.edu") {
            // TODO(Anna): Report some kind of error
            this.url = null;
        }
        // Initialize the IFrame ref
        this.iframeRef = React.createRef<HTMLIFrameElement>();
    }

    getUserInput: () => any = () => {
        return null;
    };

    async componentDidMount() {
        const {kaLocale} = getDependencies();
        if (await this.showLocaleWarning(kaLocale)) {
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
        // Add "px" to unitless numbers
        Object.entries(style).forEach(([key, value]: [any, any]) => {
            if (!value.endsWith("%") && !value.endsWith("px")) {
                style[key] = value + "px";
            }
        });

        // We sandbox the iframe so that we allowlist only the functionality
        // that we need. This makes it a bit safer in case some content
        // creator "went wild".
        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        const sandboxProperties = "allow-same-origin allow-scripts";
        return (
            <>
                {this.state.errMessage && (
                    <Banner
                        kind="warning"
                        layout="floating"
                        text={this.state.errMessage}
                        onDismiss={() => {
                            this.setState({errMessage: null});
                        }}
                    />
                )}
                <iframe
                    ref={this.iframeRef}
                    title={this.props.description}
                    sandbox={sandboxProperties}
                    style={style}
                    src={this.url?.toString()}
                    srcDoc={
                        this.url ? undefined : "Could not load PhET simulation."
                    }
                    allow="fullscreen"
                />
                <Button
                    onClick={() => {
                        this.iframeRef.current?.requestFullscreen();
                    }}
                >
                    Fullscreen
                </Button>
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

    async showLocaleWarning(kaLocale: string): Promise<boolean> {
        // If there is no actual simulation, we shouldn't show any locale warnings
        if (!this.url) {
            return false;
        }

        /*
        Access to fetch at 'https://phet.colorado.edu/services/check-html-updates' from origin 'http://localhost:6006'
        has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No
        'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your
        needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
         */
        const phetRegex: RegExp =
            /https:\/\/phet\.colorado\.edu\/sims\/html\/([a-zA-Z0-9-]+)\/.*/g;
        const match: RegExpExecArray | null = phetRegex.exec(
            this.url.toString(),
        );
        if (!match) {
            return false;
        }
        const simName = match[1];
        const locales = await fetch(
            `https://phet.colorado.edu/sims/html/${simName}/latest/string-map.json`,
        )
            .then((response: Response) => response.json())
            .then((json: any) => {
                console.log(Object.keys(json));
                return Object.keys(json);
            });

        //return !locales.includes(kaLocale);

        return fetch(this.url)
            .then((response: Response): Promise<string> => response.text())
            .then((html: string): boolean => {
                // Find where window.phet.chipper.localeData is set.
                const localeDataVar: string =
                    "window.phet.chipper.localeData = ";
                const startIndex = html.indexOf(localeDataVar);
                html = html.substring(startIndex + localeDataVar.length);
                const endIndex = html.indexOf(";");
                html = html.substring(0, endIndex);
                const locales: string[] = Object.keys(JSON.parse(html));
                console.log(locales);
                return !locales.includes(kaLocale);
            })
            .catch((error: any) => {
                // If we have an error grabbing locale data, we shouldn't show
                // a locale warning in case it is spurious
                return false;
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
