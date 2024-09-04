/**
 * This is a PhET simulation widget. It is used for rendering simulations
 * from https://phet.colorado.edu/.
 */

import Banner from "@khanacademy/wonder-blocks-banner";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import cornersOutIcon from "@phosphor-icons/core/regular/corners-out.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import {getDependencies} from "../../dependencies";
import {phoneMargin} from "../../styles/constants";
import {
    basicBorderColor,
    borderRadiusLarge,
} from "../../styles/global-constants";

import type {PerseusPhetSimulationWidgetOptions} from "../../perseus-types";
import type {WidgetExports, WidgetProps} from "../../types";

type RenderProps = PerseusPhetSimulationWidgetOptions;
type Props = WidgetProps<RenderProps, PerseusPhetSimulationWidgetOptions>;

// For returning user input, but currently the PhET widget
// does not support accessing user input
type UserInput = null;

type State = {
    banner: {
        message: string;
        kind: "warning" | "critical";
    } | null;
    url: URL | null;
};

// This renders the PhET sim
export class PhetSimulation extends React.Component<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;
    private readonly iframeRef: React.RefObject<HTMLIFrameElement> =
        React.createRef<HTMLIFrameElement>();
    private readonly locale: string;

    state: State = {
        url: null,
        banner: null,
    };

    constructor(props) {
        super(props);
        this.locale = this.getPhetCompatibleLocale(getDependencies().kaLocale);
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

    getUserInput(): UserInput {
        return null;
    }

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

    displayLoadFailure: () => void = () => {
        this.setState({
            url: null,
            banner: {
                message: this.context.strings.simulationLoadFail,
                kind: "critical",
            },
        });
    };

    async updateSimState(urlString: string) {
        const url = makeSafeUrl(urlString, this.locale);
        if (url === null) {
            this.displayLoadFailure();
            return;
        }
        const response = await fetch(url);
        if (!response.ok) {
            this.displayLoadFailure();
            return;
        }
        const showLocaleWarning = await this.showLocaleWarning(url);
        this.setState({
            url: url,
            banner: showLocaleWarning
                ? {
                      message: this.context.strings.simulationLocaleWarning,
                      kind: "warning",
                  }
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
        if (match === null) {
            return false;
        }
        const simName = match[1];
        const response = await fetch(
            `https://phet.colorado.edu/sims/html/${simName}/latest/string-map.json`,
        );
        if (!response.ok) {
            return false;
        }

        let responseJson: any;
        try {
            responseJson = await response.json();
        } catch {
            // If the file exists but there is no content to parse into a JSON,
            // response.json() will throw an error that we want to catch.
            return false;
        }
        const locales: string[] = Object.keys(responseJson);

        // Only display a locale warning if there is no fallback language
        const baseLocale: string = this.locale.split("_")[0];
        for (const l of locales) {
            if (baseLocale === l.split("_")[0]) {
                return false;
            }
        }
        return true;
    }

    render(): React.ReactNode {
        // We sandbox the iframe so that we allowlist only the functionality
        // that we need. This makes it safer to present third-party content
        // from the PhET website.
        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        const sandboxProperties = "allow-same-origin allow-scripts";
        return (
            <View style={styles.container}>
                {this.state.banner !== null && (
                    // TODO(anna): Make this banner focusable
                    <View
                        style={{
                            marginBottom: phoneMargin,
                        }}
                    >
                        <Banner
                            layout="floating"
                            kind={this.state.banner.kind}
                            text={this.state.banner.message}
                        />
                    </View>
                )}
                <iframe
                    ref={this.iframeRef}
                    title={this.props.description}
                    sandbox={sandboxProperties}
                    style={{
                        minWidth: 400,
                        height: 360,
                        width: "100%",
                        borderWidth: 0,
                    }}
                    src={this.state.url?.toString()}
                    allow="fullscreen"
                />
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
                    disabled={this.state.url === null}
                />
            </View>
        );
    }
}

// Setting URL to null will display an error message in the iframe
export const makeSafeUrl = (urlString: string, locale: string): URL | null => {
    if (!URL.canParse(urlString)) {
        return null;
    }
    const url = new URL(urlString);
    if (url.origin !== "https://phet.colorado.edu") {
        return null;
    }
    url.searchParams.set("locale", locale);
    return url;
};

const styles = StyleSheet.create({
    container: {
        borderRadius: borderRadiusLarge,
        borderWidth: 1,
        borderColor: basicBorderColor,
        padding: phoneMargin,
        paddingBottom: 0,
        width: 650,
    },
});

export default {
    name: "phet-simulation",
    displayName: "PhET Simulation",
    widget: PhetSimulation,
    // Hides widget from content creators until full release
    hidden: true,
    isLintable: true,
} as WidgetExports<typeof PhetSimulation>;
