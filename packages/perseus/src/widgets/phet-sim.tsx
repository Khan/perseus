/* eslint-disable react/forbid-prop-types, react/sort-comp */
/**
 * This is a PhET simulation widget. It is used for rendering simulations
 * from https://phet.colorado.edu/.
 */

import Banner from "@khanacademy/wonder-blocks-banner";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import cornersOutIcon from "@phosphor-icons/core/regular/corners-out.svg";
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
    url: URL | null;
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

    private readonly iframeRef: React.RefObject<HTMLIFrameElement>;
    private readonly locale: string;

    state: State = {
        url: null,
        errMessage: null,
    };

    constructor(props) {
        super(props);
        this.locale = this.getPhetCompatibleLocale(getDependencies().kaLocale);
        this.iframeRef = React.createRef<HTMLIFrameElement>();
        this.state.url = new URL(this.props.url);
        this.state.url.searchParams.set("locale", this.locale);
        if (this.state.url.origin !== "https://phet.colorado.edu") {
            this.state.url = null;
        }
    }

    getUserInput: () => any = () => {
        return null;
    };

    async componentDidMount() {
        // Display an error if we fail to load the resource
        if (this.state.url) {
            const validLink = await fetch(this.state.url).then(
                (response: Response) => response.ok,
            );
            if (!validLink) {
                this.setState({url: null});
            }
        }
        // Display a warning if the simulation doesn't have our locale
        if (await this.showLocaleWarning(this.locale)) {
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
                    src={this.state.url?.toString()}
                    srcDoc={
                        this.state.url
                            ? undefined
                            : "Could not load simulation."
                    }
                    allow="fullscreen"
                />
                <IconButton
                    icon={cornersOutIcon}
                    onClick={() => {
                        this.iframeRef.current?.requestFullscreen();
                    }}
                    aria-label={"Fullscreen"}
                    size={"small"}
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

    getPhetCompatibleLocale: (arg1: string) => string = (kaLocale) => {
        switch (kaLocale) {
            case "pt-pt":
                return "pt";
            case "zh-hans":
                return "zh_CN";
            case "zh-hant":
                return "zh_TW";
            case "fa-af":
                return "fa_DA";
            default:
                return kaLocale;
        }
    };

    async showLocaleWarning(locale: string): Promise<boolean> {
        // Do not show a locale warning on an invalid URL
        if (!this.state.url) {
            return false;
        }
        // Grab the simulation name
        const phetRegex: RegExp =
            /https:\/\/phet\.colorado\.edu\/sims\/html\/([a-zA-Z0-9-]+)\/.*/g;
        const match: RegExpExecArray | null = phetRegex.exec(
            this.state.url.toString(),
        );
        // Do not show a locale warning on a non-simulation URL
        if (!match) {
            return false;
        }
        const simName = match[1];
        const locales = await fetch(
            `https://phet.colorado.edu/sims/html/${simName}/latest/string-map.json`,
        )
            .then((response: Response) => response.json())
            .then((json: any) => {
                return Object.keys(json);
            });

        // Only display a locale warning if there is no fallback language
        const baseLocale = this.locale.split("_")[0];
        for (const l of locales) {
            if (baseLocale === l.split("_")[0]) {
                return false;
            }
        }
        return true;
    }
}

export default {
    name: "phet-sim",
    displayName: "PhET Simulation",
    widget: PhetSim,
    // Let's not expose it to all content creators yet
    hidden: true,
} as WidgetExports<typeof PhetSim>;
