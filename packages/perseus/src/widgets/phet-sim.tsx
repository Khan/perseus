/* eslint-disable react/forbid-prop-types, react/sort-comp */
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

import {PerseusI18nContext} from "../components/i18n-context";
import {getDependencies} from "../dependencies";
import * as Changeable from "../mixins/changeable";
import {phoneMargin} from "../styles/constants";
import {
    borderRadiusLarge,
    tableBackgroundHover,
} from "../styles/global-constants";

import type {PerseusPhetSimWidgetOptions} from "../perseus-types";
import type {WidgetExports, WidgetProps} from "../types";

type RenderProps = PerseusPhetSimWidgetOptions; // transform = _.identity
type Props = WidgetProps<RenderProps, PerseusPhetSimWidgetOptions>;

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

/* This renders the PhET sim */
export class PhetSim extends React.Component<Props, State> {
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
            <View style={styles.container}>
                {this.state.banner !== null && (
                    // TODO(anna): Make this banner focusable
                    <Banner
                        layout="floating"
                        kind={this.state.banner.kind}
                        text={this.state.banner.message}
                    />
                )}
                <iframe
                    ref={this.iframeRef}
                    title={this.props.description}
                    sandbox={sandboxProperties}
                    style={{
                        minWidth: 400,
                        width: "100%",
                        height: 225,
                    }}
                    src={this.state.url?.toString()}
                    srcDoc={this.state.url !== null ? undefined : "null"}
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

export default {
    name: "phet-sim",
    displayName: "PhET Simulation",
    widget: PhetSim,
    // Let's not expose it to all content creators yet
    hidden: false,
    isLintable: true,
} as WidgetExports<typeof PhetSim>;

const styles = StyleSheet.create({
    container: {
        borderRadius: borderRadiusLarge,
        backgroundColor: tableBackgroundHover,
        padding: phoneMargin,
        paddingBottom: 0,
        width: 500,
    },
});
