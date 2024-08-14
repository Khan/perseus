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

type State = {
    errMessage: string | null;
    url: URL | null;
};

/* This renders the PhET sim */
class PhetSim extends React.Component<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;
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
    }

    getUserInput: () => any = () => {
        return null;
    };

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
        // that we need. This makes it a bit safer in case some content
        // creator "went wild".
        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        const sandboxProperties = "allow-same-origin allow-scripts";
        return (
            <View>
                {this.state.errMessage && (
                    // TODO(anna): Make this banner focusable
                    <Banner
                        kind="warning"
                        layout="floating"
                        text={this.state.errMessage}
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
                            this.state.url
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

    makeSafeUrl(urlString: string): URL | null {
        let url: URL | null = null;
        if (URL.canParse(urlString)) {
            url = new URL(urlString);
            url.searchParams.set("locale", this.locale);
            if (url.origin !== "https://phet.colorado.edu") {
                url = null;
            }
        }
        return url;
    }

    async updateSimState(urlString: string) {
        const url = this.makeSafeUrl(urlString);
        if (url) {
            // Display an error if we fail to load the resource
            const validLink = await fetch(url)
                .then((response: Response) => response.ok)
                .catch(() => false);
            if (validLink) {
                const showLocaleWarning = await this.showLocaleWarning(url);
                this.setState({
                    url: url,
                    errMessage: showLocaleWarning
                        ? this.context.strings.simulationLocaleWarning
                        : null,
                });
                return;
            }
        }
        this.setState({url: null, errMessage: null});
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
    isLintable: true,
} as WidgetExports<typeof PhetSim>;
