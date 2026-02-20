/**
 * This is a PhET simulation widget. It is used for rendering simulations
 * from https://phet.colorado.edu/.
 */

import {makeSafeUrl} from "@khanacademy/perseus-core";
import Banner from "@khanacademy/wonder-blocks-banner";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import cornersOutIcon from "@phosphor-icons/core/regular/corners-out.svg";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import {phoneMargin} from "../../styles/constants";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/phet-simulation/phet-simulation-ai-utils";

import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {UnsupportedWidgetPromptJSON} from "../../widget-ai-utils/unsupported-widget";
import type {PerseusPhetSimulationWidgetOptions} from "@khanacademy/perseus-core";

type Props = WidgetProps<PerseusPhetSimulationWidgetOptions>;

type State = {
    banner: {
        message: string;
        kind: "warning" | "critical";
    } | null;
    url: URL | null;
    isFullScreen: boolean;
};

// A constant for the bottom bar height in the mobile app.
// This is a little hacky, but seems to be the best way to make sure the
// simulation is not cut off by the bottom bar.
const MOBILE_APP_BOTTOM_BAR_HEIGHT = 66;

// This renders the PhET sim
export class PhetSimulation
    extends React.Component<Props, State>
    implements Widget
{
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;
    private readonly iframeRef: React.RefObject<HTMLIFrameElement> =
        React.createRef<HTMLIFrameElement>();

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    state: State = {
        url: null,
        banner: null,
        isFullScreen: false,
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

    private get locale(): string {
        return this.getPhetCompatibleLocale(this.context.locale);
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
        const url = makeSafeUrl(
            urlString,
            this.locale,
            "https://phet.colorado.edu",
        );
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

    /**
     * Mobile App Fullscreen Implementation
     *
     * The mobile app environment doesn't support the standard browser fullscreen API.
     * Instead, we implement a "fake" fullscreen mode with the following approach:
     *
     * 1. When fullscreen is toggled, we use a fixed position container that covers
     *    almost the entire viewport (appFullScreenWidgetContainer)
     * 2. We leave space at the bottom for the mobile app's Check Answer bar (66px)
     * 3. We position a close button in the top-right corner for exiting fullscreen
     * 4. The iframe container expands to fill the available space
     *
     * This differs from the web implementation which uses the browser's
     * native Fullscreen API via requestFullscreen().
     *
     * Note: Unfortunately, full screen is not supported in iOS mobile web due to
     * the lack of support for the Fullscreen API.
     */
    toggleFullScreen = () => {
        // Use our fake fullscreen implementation for mobile
        this.setState((prevState) => ({
            isFullScreen: !prevState.isFullScreen,
        }));
    };

    render(): React.ReactNode {
        // Extract state and props we'll use
        const {isFullScreen, banner, url} = this.state;
        const {isMobileApp} = this.props.apiOptions;

        // Determine if we're using the mobile app fullscreen implementation
        const isMobileAppFullscreen = isFullScreen && isMobileApp;

        // Determine which container style to use based on isMobileAppFullscreen
        const containerStyle = isMobileAppFullscreen
            ? {
                  ...styles.appFullScreenWidgetContainer,
              }
            : styles.widgetContainer;

        // Determine iframe container style based on isMobileAppFullscreen
        const iframeContainerStyle = isMobileAppFullscreen
            ? styles.appFullScreenIframeContainer
            : styles.iframeContainer;

        // We sandbox the iframe so that we allowlist only the functionality
        // that we need. This makes it safer to present third-party content
        // from the PhET website.
        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        const sandboxProperties = "allow-same-origin allow-scripts";

        return (
            <View style={containerStyle}>
                {banner !== null && (
                    <View
                        style={{
                            marginBottom: phoneMargin,
                        }}
                    >
                        <Banner kind={banner.kind} text={banner.message} />
                    </View>
                )}

                {/* Mobile app fullscreen close button */}
                {isMobileAppFullscreen && (
                    <View style={styles.closeButtonContainer}>
                        <IconButton
                            icon={xIcon}
                            onClick={this.toggleFullScreen}
                            kind="tertiary"
                            actionType="neutral"
                            aria-label={"Exit fullscreen"}
                            style={styles.closeButton}
                        />
                    </View>
                )}

                {/* PhET simulation iframe */}
                <View style={iframeContainerStyle}>
                    <iframe
                        ref={this.iframeRef}
                        title={this.props.description}
                        sandbox={sandboxProperties}
                        className={css(styles.iframeResponsive)}
                        src={url?.toString()}
                        allow="fullscreen"
                    />
                </View>

                {/* Fullscreen button (only shown when not in mobile app fullscreen) */}
                {url !== null && !isMobileAppFullscreen && (
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
                        style={{
                            marginTop: 5,
                            marginBottom: 5,
                            alignSelf: "flex-end",
                        }}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    widgetContainer: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#CCC",
        padding: spacing.medium_16,
        paddingBottom: 0,
    },
    iframeContainer: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        // 16:9 aspect ratio
        paddingTop: "56.25%",
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
    // Mobile app fullscreen implementation styles
    appFullScreenWidgetContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        // Ensure that the Check Answer bar does not cover the bottom of the simulation
        bottom: MOBILE_APP_BOTTOM_BAR_HEIGHT,
        width: "100%",
        height: "auto",
        zIndex: 1000,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
    },
    appFullScreenIframeContainer: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        flex: 1,
    },
    closeButtonContainer: {
        position: "absolute",
        top: spacing.xSmall_8,
        right: spacing.xSmall_8,
        zIndex: 1001,
    },
    closeButton: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "50%",
    },
});

export default {
    name: "phet-simulation",
    displayName: "PhET Simulation",
    widget: PhetSimulation,
    isLintable: true,
} satisfies WidgetExports<typeof PhetSimulation>;
