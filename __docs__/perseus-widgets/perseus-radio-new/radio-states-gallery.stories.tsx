import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import type {Meta} from "@storybook/react-vite";

export default {
    title: "Perseus/Widgets/RadioNew/Widget States Gallery",
    parameters: {
        viewMode: "docs",
    },
    tags: ["!autodocs"],
} as Meta;

const styles = StyleSheet.create({
    stateContainer: {
        border: "1px solid #eee",
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
    },
    stateTitle: {
        fontWeight: "bold",
        marginBottom: 8,
    },
    stateDescription: {
        marginBottom: 16,
    },
    stateDemo: {
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 4,
    },
});

export const StateGallery = () => (
    <div>
        <h1>RadioNew Widget States Gallery</h1>
        <p>
            This page showcases the various visual states of the RadioNew
            widget. Each state represents how the widget appears under different
            conditions.
        </p>

        <div className={css(styles.stateContainer)}>
            <h2 className={css(styles.stateTitle)}>Default State</h2>
            <div className={css(styles.stateDescription)}>
                The default appearance of the RadioNew widget before any user
                interaction.
            </div>
            <div className={css(styles.stateDemo)}>
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                border: "2px solid #888",
                                marginRight: 8,
                            }}
                        ></div>
                        <span>Option A</span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                border: "2px solid #888",
                                marginRight: 8,
                            }}
                        ></div>
                        <span>Option B</span>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                border: "2px solid #888",
                                marginRight: 8,
                            }}
                        ></div>
                        <span>Option C</span>
                    </div>
                </div>
            </div>
        </div>

        <div className={css(styles.stateContainer)}>
            <h2 className={css(styles.stateTitle)}>Selected State</h2>
            <div className={css(styles.stateDescription)}>
                The appearance when a user has selected an option.
            </div>
            <div className={css(styles.stateDemo)}>
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                border: "2px solid #1865f2",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: 8,
                            }}
                        >
                            <div
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    backgroundColor: "#1865f2",
                                }}
                            ></div>
                        </div>
                        <span>Option A</span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                border: "2px solid #888",
                                marginRight: 8,
                            }}
                        ></div>
                        <span>Option B</span>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                border: "2px solid #888",
                                marginRight: 8,
                            }}
                        ></div>
                        <span>Option C</span>
                    </div>
                </div>
            </div>
        </div>

        <div className={css(styles.stateContainer)}>
            <h2 className={css(styles.stateTitle)}>Focus State</h2>
            <div className={css(styles.stateDescription)}>
                The appearance when an option receives keyboard focus.
            </div>
            <div className={css(styles.stateDemo)}>
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                border: "2px solid #888",
                                marginRight: 8,
                            }}
                        ></div>
                        <span>Option A</span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                            padding: 4,
                            outline: "2px solid #1865f2",
                            borderRadius: 4,
                        }}
                    >
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                border: "2px solid #888",
                                marginRight: 8,
                            }}
                        ></div>
                        <span>Option B</span>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                border: "2px solid #888",
                                marginRight: 8,
                            }}
                        ></div>
                        <span>Option C</span>
                    </div>
                </div>
            </div>
        </div>

        <div className={css(styles.stateContainer)}>
            <h2 className={css(styles.stateTitle)}>Correct Answer State</h2>
            <div className={css(styles.stateDescription)}>
                The appearance when an option is marked as correct.
            </div>
            <div className={css(styles.stateDemo)}>
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                            padding: 4,
                            backgroundColor: "#d3edd9",
                            borderRadius: 4,
                        }}
                    >
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                border: "2px solid #1da538",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: 8,
                            }}
                        >
                            <div
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    backgroundColor: "#1da538",
                                }}
                            ></div>
                        </div>
                        <span>Option A</span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                border: "2px solid #888",
                                marginRight: 8,
                            }}
                        ></div>
                        <span>Option B</span>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                border: "2px solid #888",
                                marginRight: 8,
                            }}
                        ></div>
                        <span>Option C</span>
                    </div>
                </div>
            </div>
        </div>

        <div className={css(styles.stateContainer)}>
            <h2 className={css(styles.stateTitle)}>Incorrect Answer State</h2>
            <div className={css(styles.stateDescription)}>
                The appearance when an incorrect option is selected.
            </div>
            <div className={css(styles.stateDemo)}>
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                border: "2px solid #888",
                                marginRight: 8,
                            }}
                        ></div>
                        <span>Option A</span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                            padding: 4,
                            backgroundColor: "#fbe7e8",
                            borderRadius: 4,
                        }}
                    >
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                border: "2px solid #d92916",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: 8,
                            }}
                        >
                            <div
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    backgroundColor: "#d92916",
                                }}
                            ></div>
                        </div>
                        <span>Option B</span>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                border: "2px solid #888",
                                marginRight: 8,
                            }}
                        ></div>
                        <span>Option C</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
