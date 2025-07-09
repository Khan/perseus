import * as React from "react";

import ScrollableView from "../scrollable-view";

import styles from "./scrollable-view.stories.module.css";

import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof ScrollableView>;

const meta: Meta<typeof ScrollableView> = {
    title: "Components/ScrollableView",
    component: ScrollableView,
    parameters: {
        docs: {
            description: {
                component:
                    "A component that provides scrollable container with navigation buttons for content that overflows its container.",
            },
        },
    },
};

export default meta;

export const HorizontalScroll: Story = {
    render: () => (
        <div className={styles.demoContainer}>
            <ScrollableView
                overflowX="auto"
                scrollDescription="Scroll through cards"
            >
                <div className={styles.scrollContent}>
                    <div className={styles.card}>Card 1</div>
                    <div className={styles.card}>Card 2</div>
                    <div className={styles.card}>Card 3</div>
                    <div className={styles.card}>Card 4</div>
                    <div className={styles.card}>Card 5</div>
                    <div className={styles.card}>Card 6</div>
                    <div className={styles.card}>Card 7</div>
                    <div className={styles.card}>Card 8</div>
                </div>
            </ScrollableView>
        </div>
    ),
};

export const NonScrollable: Story = {
    render: () => (
        <div className={styles.demoContainer}>
            <ScrollableView
                overflowX="auto"
                scrollDescription="This content doesn't need scrolling"
            >
                <div className={styles.scrollContent}>
                    <div className={styles.card}>Card 1</div>
                    <div className={styles.card}>Card 2</div>
                </div>
            </ScrollableView>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "When content fits within the container, scroll buttons will not appear.",
            },
        },
    },
};
