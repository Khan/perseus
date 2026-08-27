import Clickable from "@khanacademy/wonder-blocks-clickable";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import * as React from "react";
import {forwardRef, useImperativeHandle} from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import {DefinitionConsumer} from "../../definition-context";
import {useDependencies} from "../../dependencies";
import Renderer from "../../renderer";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/definition/definition-ai-utils";

import styles from "./definition.module.css";
// TODO (LEMS-3815): Legacy styling - Remove this code
import stylesLegacy from "./definition_legacy-styles";

import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {DefinitionPromptJSON} from "../../widget-ai-utils/definition/definition-ai-utils";
import type {PerseusDefinitionWidgetOptions} from "@khanacademy/perseus-core";

type Props = WidgetProps<PerseusDefinitionWidgetOptions>;

const Definition = forwardRef<Widget, Props>(function Definition(props, ref) {
    const {strings} = usePerseusI18n();
    const dependencies = useDependencies();

    useOnMountEffect(() => {
        dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "definition",
                widgetId: props.widgetId,
            },
        });
    });

    useImperativeHandle(ref, () => ({
        getPromptJSON(): DefinitionPromptJSON {
            return _getPromptJSON(props);
        },
    }));

    return (
        <DefinitionConsumer>
            {({activeDefinitionId, setActiveDefinitionId}) => (
                <Popover
                    dismissEnabled
                    content={
                        <PopoverContentCore
                            // TODO: replace stylesLegacy with `className={styles.tooltipBody}` once 'className' is supported
                            style={stylesLegacy.tooltipBody}
                            closeButtonVisible={true}
                        >
                            <Renderer
                                apiOptions={props.apiOptions}
                                content={props.options.definition}
                                strings={strings}
                            />
                        </PopoverContentCore>
                    }
                    opened={activeDefinitionId === props.widgetId}
                    onClose={() => setActiveDefinitionId(null)}
                    placement="top"
                >
                    <Clickable
                        onClick={() => {
                            props.trackInteraction();
                            setActiveDefinitionId(props.widgetId);
                        }}
                        aria-label={strings.definitionIdentifier({
                            word: props.options.togglePrompt,
                        })}
                    >
                        {() => (
                            <span className={styles.definition}>
                                {props.options.togglePrompt}
                            </span>
                        )}
                    </Clickable>
                </Popover>
            )}
        </DefinitionConsumer>
    );
});

export default {
    name: "definition",
    displayName: "Definition",
    widget: Definition,
} satisfies WidgetExports<typeof Definition>;
