/* eslint-disable react/forbid-prop-types, react/sort-comp */
/**
 * This is a PhET simulation widget. It is used for rendering simulations
 * from https://phet.colorado.edu/.
 */

import Banner from "@khanacademy/wonder-blocks-banner";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import cornersOutIcon from "@phosphor-icons/core/regular/corners-out.svg";
import * as React from "react";

import {PerseusI18nContext} from "../components/i18n-context";
import {getDependencies} from "../dependencies";
import * as Changeable from "../mixins/changeable";

import type {PerseusPhetSimWidgetOptions} from "../perseus-types";
import type {WidgetExports, WidgetProps} from "../types";

type RenderProps = PerseusPhetSimWidgetOptions; // transform = _.identity
type Props = WidgetProps<RenderProps, PerseusPhetSimWidgetOptions>;

// For returning user input, but currently the PhET widget
// does not support accessing user input
type UserInput = null;

type State = {
    bannerMessage: string | null;
    url: URL | null;
};

/* This renders the PhET sim */
class PhetSim extends React.Component<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;
    private readonly iframeRef: React.RefObject<HTMLIFrameElement> =
        React.createRef<HTMLIFrameElement>();
    private readonly locale: string;

    state: State = {
        url: null,
        bannerMessage: null,
    };

    constructor(props) {
        super(props);
        this.locale = this.getPhetCompatibleLocale(getDependencies().kaLocale);
    }

    getUserInput(): UserInput {
        return null;
    }

    async componentDidMount() {
        await this.updateSimState(this.props.url);
    }

    async componentDidUpdate(prevProps) {
        // If the URL has changed, update our state
        if (prevProps.url !== this.props.url) {
            await this.updateSimState(this.props.url);
        }
    }

    render(): React.ReactNode {
        // We sandbox the iframe so that we allowlist only the functionality
        // that we need. This makes it safer to present third-party content
        // from the PhET website.
        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        const sandboxProperties = "allow-same-origin allow-scripts";
        return (
            <View>
                {this.state.bannerMessage && (
                    // TODO(anna): Make this banner focusable
                    <Banner
                        kind="warning"
                        layout="floating"
                        text={this.state.bannerMessage}
                    />
                )}
                <View>
                    <iframe
                        ref={this.iframeRef}
                        title={this.props.description}
                        sandbox={sandboxProperties}
                        style={{
                            width: 400,
                            height: 400,
                        }}
                        src={this.state.url?.toString()}
                        srcDoc={
                            this.state.url !== null
                                ? undefined
                                : this.context.strings.simulationLoadFail
                        }
                        allow="fullscreen"
                    />
                </View>
                <IconButton
                    icon={cornersOutIcon}
                    onClick={() => {
                        this.iframeRef.current?.requestFullscreen();
                    }}
                    kind={"secondary"}
                    aria-label={"Fullscreen"}
                    style={{
                        marginTop: 5,
                        marginBottom: 5,
                        alignSelf: "flex-end",
                    }}
                />
            </View>
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

    // kaLocales and PhET locales use different formats and abbreviations.
    // PhET accepts different formats, i.e. kaLocale's hyphens, but it does not accept
    // different abbreviations, so in points of divergence of abbreviations, we need to
    // convert kaLocale abbreviations into abbreviations recognized by PhET.
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

    // Setting URL to null will display an error message in the iframe
    makeSafeUrl(urlString: string): URL | null {
        if (!URL.canParse(urlString)) {
            return null;
        }
        const url = new URL(urlString);
        if (url.origin !== "https://phet.colorado.edu") {
            return null;
        }
        url.searchParams.set("locale", this.locale);
        return url;
    }

    async updateSimState(urlString: string) {
        const url = this.makeSafeUrl(urlString);
        if (url === null) {
            this.setState({url: null, bannerMessage: null});
            return;
        }
        const response = await fetch(url);
        if (!response.ok) {
            this.setState({url: null, bannerMessage: null});
            return;
        }
        const showLocaleWarning = await this.showLocaleWarning(url);
        this.setState({
            url: url,
            bannerMessage: showLocaleWarning
                ? this.context.strings.simulationLocaleWarning
                : null,
        });
    }

    async showLocaleWarning(url: URL): Promise<boolean> {
        // Do not show a locale warning on an invalid URL
        if (!url) {
            return false;
        }
        // Grab the simulation name
        const phetRegex: RegExp =
            /https:\/\/phet\.colorado\.edu\/sims\/html\/([a-zA-Z0-9-]+)\/.*/g;
        const match: RegExpExecArray | null = phetRegex.exec(url.toString());
        // Do not show a locale warning on a non-simulation URL
        if (!match) {
            return false;
        }
        const simName = match[1];
        const response = await fetch(
            `https://phet.colorado.edu/sims/html/${simName}/latest/string-map.json`,
        );
        if (!response.ok) {
            return false;
        }
        const responseJson = await response.json();
        if (!responseJson) {
            return false;
        }
        const locales = Object.keys(responseJson);

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
    isLintable: true,
} as WidgetExports<typeof PhetSim>;
