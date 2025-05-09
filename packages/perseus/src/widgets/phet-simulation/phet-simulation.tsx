/**
 * This is a PhET simulation widget. It is used for rendering simulations
 * from https://phet.colorado.edu/.
 */

import Banner from "@khanacademy/wonder-blocks-banner";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import cornersOutIcon from "@phosphor-icons/core/regular/corners-out.svg";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import {getDependencies} from "../../dependencies";
import {phoneMargin} from "../../styles/constants";
import {isFileProtocol} from "../../util/mobile-native-utils";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/phet-simulation/phet-simulation-ai-utils";

import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {UnsupportedWidgetPromptJSON} from "../../widget-ai-utils/unsupported-widget";
import type {PerseusPhetSimulationWidgetOptions} from "@khanacademy/perseus-core";

type RenderProps = PerseusPhetSimulationWidgetOptions;
type Props = WidgetProps<RenderProps>;

type State = {
    banner: {
        message: string;
        kind: "warning" | "critical";
    } | null;
    url: URL | null;
    isFullScreen: boolean;
};

// This renders the PhET sim
export class PhetSimulation
    extends React.Component<Props, State>
    implements Widget
{
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;
    private readonly iframeRef: React.RefObject<HTMLIFrameElement> =
        React.createRef<HTMLIFrameElement>();
    private readonly locale: string;

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    state: State = {
        url: null,
        banner: null,
        isFullScreen: false,
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

    getPromptJSON(): UnsupportedWidgetPromptJSON {
        return _getPromptJSON();
    }

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
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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

    toggleFullScreen = () => {
        // Use our fake fullscreen implementation for mobile
        this.setState((prevState) => ({
            isFullScreen: !prevState.isFullScreen,
        }));
    };

    render(): React.ReactNode {
        // We handle fullscreen differently in the mobile app, as it doesn't
        // support the fullscreen API. Instead, we use our own fake fullscreen
        // implementation to take up the full webview.
        const {isFullScreen} = this.state;
        const {isMobileApp} = this.props.apiOptions;

        // Determine which container style to use based on fullscreen state
        const containerStyle =
            isFullScreen && isMobileApp
                ? styles.fullScreenWidgetContainer
                : styles.widgetContainer;

        // Determine iframe container style based on fullscreen state
        const iframeContainerStyle =
            isFullScreen && isMobileApp
                ? styles.fullScreenIframeContainer
                : styles.iframeContainer;

        // We sandbox the iframe so that we allowlist only the functionality
        // that we need. This makes it safer to present third-party content
        // from the PhET website.
        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        const sandboxProperties = "allow-same-origin allow-scripts";

        return (
            <View style={containerStyle}>
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
                <View style={iframeContainerStyle}>
                    <iframe
                        ref={this.iframeRef}
                        title={this.props.description}
                        sandbox={sandboxProperties}
                        className={css(styles.iframeResponsive)}
                        src={this.state.url?.toString()}
                        allow="fullscreen"
                    />
                </View>
                {this.state.url !== null && (
                    <View style={styles.buttonContainer}>
                        {isFullScreen && isMobileApp ? (
                            <IconButton
                                icon={xIcon}
                                onClick={this.toggleFullScreen}
                                kind="tertiary"
                                actionType="neutral"
                                aria-label={"Exit fullscreen"}
                                style={styles.fullScreenButton}
                            />
                        ) : (
                            <IconButton
                                icon={cornersOutIcon}
                                onClick={
                                    isMobileApp
                                        ? this.toggleFullScreen
                                        : () => {
                                              this.iframeRef.current?.requestFullscreen();
                                          }
                                }
                                kind="tertiary"
                                actionType="neutral"
                                aria-label={"Fullscreen"}
                                style={styles.fullScreenButton}
                            />
                        )}
                    </View>
                )}
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
    widgetContainer: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#CCC",
        padding: spacing.medium_16,
        paddingBottom: 0,
    },
    fullScreenWidgetContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000,
        backgroundColor: "white",
        margin: "0 0 120px 0",
        display: "flex",
        flexDirection: "column",
    },
    iframeContainer: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        // 16:9 aspect ratio
        paddingTop: "56.25%",
    },
    fullScreenIframeContainer: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        flex: 1,
    },
    iframeResponsive: {
        borderWidth: 0,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        height: "100%",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 5,
        marginBottom: 5,
    },
    fullScreenButton: {
        alignSelf: "flex-end",
    },
});

export default {
    name: "phet-simulation",
    displayName: "PhET Simulation",
    widget: PhetSimulation,
    isLintable: true,
} satisfies WidgetExports<typeof PhetSimulation>;
