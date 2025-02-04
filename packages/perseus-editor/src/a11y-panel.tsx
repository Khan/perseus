import {components, iconChevronDown} from "@khanacademy/perseus";
import * as axeCore from "axe-core";
import * as React from "react";
import {useEffect, useState} from "react";

import {iconChevronRight} from "./styles/icon-paths";

import type axe from "axe-core";

const {InlineIcon} = components;
const axeCoreOptions = {
    include: {
        fromFrames: ["iframe", "#page-container"],
    },
    exclude: {
        fromFrames: ["iframe", '[target="lint-help-window"]'],
    },
    reporter: "v2",
};

const AccessibilityPanel = () => {
    const [violations, setViolations] = useState([] as axe.Result[]);
    const [incompletes, setIncompletes] = useState([] as axe.Result[]);

    let timeoutId = setTimeout(() => {});

    const runAxeCoreOnUpdate = () => {
        // eslint-disable-next-line no-console
        console.log(`Cancelling: `, timeoutId);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            axeCore.run(axeCoreOptions).then((results) => {
                // eslint-disable-next-line no-console
                console.log(`Results: `, results);
                // axeCoreResults = results;
                setViolations(results.violations);
                setIncompletes(results.incomplete);
            });
        }, 1500);
        // eslint-disable-next-line no-console
        console.log(`New ID: `, timeoutId);
    };

    useEffect(() => {
        window.addEventListener("message", runAxeCoreOnUpdate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log(`Updating results...`);
    }, [violations, incompletes]);

    // TODO: Build UI for panel
    //          Panel should be pre-collapsed, with issue counts & icons in header
    //          List out violations and incompletes as accordion sections (when header accordion is expanded)
    //          Details are listed in accordion panel
    //          Highlight element toggle
    return (
        <div className="perseus-widget-editor">
            <div className="perseus-widget-editor-title">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    className="perseus-widget-editor-title-id"
                    href="#"
                    // onClick={this._toggleWidget}
                    role="button"
                >
                    <InlineIcon {...iconChevronRight} />
                    Accessibility
                </a>
                {`${violations.length + incompletes.length} issues`}
            </div>
        </div>
    );
};

export default AccessibilityPanel;
