import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/image/image-ai-utils";

import {ImageComponent} from "./image";

import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {ImagePromptJSON} from "../../widget-ai-utils/image/image-ai-utils";
import type {Range, PerseusImageWidgetOptions} from "@khanacademy/perseus-core";

const defaultBoxSize = 400;
const defaultRange: Range = [0, 10];
const defaultBackgroundImage = {
    url: null,
    width: 0,
    height: 0,
} as const;

type Props = WidgetProps<PerseusImageWidgetOptions>;

export interface ImageProps extends Props {
    alignment: NonNullable<Props["alignment"]>;
    title: NonNullable<Props["title"]>;
    range: NonNullable<Props["range"]>;
    box: NonNullable<Props["box"]>;
    backgroundImage: NonNullable<Props["backgroundImage"]>;
    labels: NonNullable<Props["labels"]>;
    alt: NonNullable<Props["alt"]>;
    caption: NonNullable<Props["caption"]>;
    linterContext: NonNullable<Props["linterContext"]>;
}

interface DefaultProps extends Partial<ImageProps> {
    alignment: ImageProps["alignment"];
    title: ImageProps["title"];
    range: ImageProps["range"];
    box: ImageProps["box"];
    backgroundImage: ImageProps["backgroundImage"];
    labels: ImageProps["labels"];
    alt: ImageProps["alt"];
    caption: ImageProps["caption"];
    linterContext: ImageProps["linterContext"];
}

class ImageWidget extends React.Component<ImageProps> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        alignment: "block",
        title: "",
        range: [defaultRange, defaultRange],
        box: [defaultBoxSize, defaultBoxSize],
        backgroundImage: defaultBackgroundImage,
        labels: [],
        alt: "",
        caption: "",
        linterContext: linterContextDefault,
    };

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    getPromptJSON(): ImagePromptJSON {
        return _getPromptJSON(this.props);
    }

    render(): React.ReactNode {
        return <ImageComponent {...this.props} />;
    }
}

export default {
    name: "image",
    displayName: "Image",
    widget: ImageWidget,
    isLintable: true,
} satisfies WidgetExports<typeof ImageWidget>;
