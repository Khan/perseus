import {
    generateDropdownOptions,
    generateDropdownWidget,
    generateTestPerseusRenderer,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import ArticleRenderer from "../../../article-renderer";
import {ApiOptions} from "../../../perseus-api";
import {storybookDependenciesV2} from "../../../testing/test-dependencies";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * Repro harness for LEMS dropdown bug: on iPad (iOS 26, native app), when a
 * question has multiple inline dropdowns, the *bottom-most* dropdown "shows
 * nothing" when tapped.
 *
 * Hypothesis (traced into @khanacademy/wonder-blocks-dropdown@10.9.2):
 * `SingleSelect` renders its menu in a Popper portal (strategy: "fixed").
 * `DropdownPopper` sets `shouldHidePopper = hasPopperEscaped || isReferenceHidden`
 * and, when true, applies `{visibility: "hidden", pointerEvents: "none"}` to the
 * menu. Those flags come from Popper's default `hide` modifier, which measures
 * the opener against its *clipping ancestors* (scroll containers) — not just the
 * viewport. When the lowest opener sits at the bottom edge of a scroll container,
 * the menu escapes that clip region and gets hidden.
 *
 * These stories deliberately place several inline dropdowns inside short,
 * scrollable containers so the last opener sits at/near the clip edge. The goal
 * is to see whether the bug reproduces in a desktop browser at all.
 *
 * WHAT TO LOOK FOR after the `play` function opens the last dropdown:
 *   - Inspect the portaled `[data-testid="dropdown-popper"]` element in the DOM.
 *   - If it carries `visibility: hidden` (and/or `data-popper-reference-hidden` /
 *     `data-popper-escaped`), the bug is reproduced: the menu opened but is
 *     invisible and untappable.
 */
const meta = {
    title: "Widgets/Dropdown/Visual Regression Tests/Scroll Clipping",
    component: ArticleRenderer,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Repro harness for the iPad bug where the bottom-most of " +
                    "several inline dropdowns fails to open. See file header for " +
                    "what to inspect after a dropdown is opened.",
            },
        },
        // Pin the viewport small so the scroll container is genuinely clipped.
        chromatic: {disableSnapshot: true},
    },
} satisfies Meta<typeof ArticleRenderer>;

export default meta;

type Story = StoryObj<typeof ArticleRenderer>;

/**
 * Builds a question with `count` inline dropdowns, modeled after the reported
 * item ("Use the patterns on the graphs to complete the statements.").
 */
function makeMultiDropdownQuestion(count: number): PerseusRenderer {
    const dropdownRefs = Array.from(
        {length: count},
        (_, i) => `- Statement ${i + 1}: a moving object's kinetic energy [[☃ dropdown ${i + 1}]].`,
    ).join("\n");

    const widgets: PerseusRenderer["widgets"] = {};
    for (let i = 1; i <= count; i++) {
        widgets[`dropdown ${i}`] = generateDropdownWidget({
            options: generateDropdownOptions({
                placeholder: "Choose an answer",
                choices: [
                    {content: "doubles", correct: i % 2 === 0},
                    {content: "quadruples", correct: i % 2 === 1},
                    {content: "stays the same", correct: false},
                ],
            }),
        });
    }

    return generateTestPerseusRenderer({
        content: `Use the patterns on the graphs to complete the statements.\n\n${dropdownRefs}`,
        widgets,
    });
}

/**
 * Wraps content in a fixed-height scroll container so the lowest dropdown opener
 * sits at the bottom clip edge — the suspected trigger for Popper's `hide`.
 */
function ScrollClip({
    children,
    overflow = "auto",
    height = 220,
}: {
    children: React.ReactNode;
    overflow?: React.CSSProperties["overflow"];
    height?: number;
}): React.ReactElement {
    return (
        <div
            data-testid="scroll-clip"
            style={{
                height,
                overflow,
                border: "2px solid #1865f2",
                padding: 16,
                // Mimic the native app's scrollable content region.
                WebkitOverflowScrolling: "touch",
            }}
        >
            {children}
        </div>
    );
}

const mobileApiOptions = {
    ...ApiOptions.defaults,
    isMobile: true,
};

const openLastDropdown: Story["play"] = async ({canvas, userEvent}) => {
    const dropdowns = canvas.getAllByRole("combobox");
    const last = dropdowns[dropdowns.length - 1];
    last.scrollIntoView({block: "end"});
    await userEvent.click(last);
};

/**
 * Four inline dropdowns inside a short `overflow: auto` container. The last
 * opener is scrolled to the bottom edge before opening.
 */
export const LastDropdownNearScrollEdge: Story = {
    render: () => (
        <ScrollClip>
            <ArticleRenderer
                json={makeMultiDropdownQuestion(4)}
                dependencies={storybookDependenciesV2}
                apiOptions={mobileApiOptions}
            />
        </ScrollClip>
    ),
    play: openLastDropdown,
};

/**
 * Same content, but the clip uses `overflow: hidden` (closer to a non-scrollable
 * clipped region). Popper still treats this as a clipping ancestor.
 */
export const LastDropdownInOverflowHidden: Story = {
    render: () => (
        <ScrollClip overflow="hidden" height={200}>
            <ArticleRenderer
                json={makeMultiDropdownQuestion(4)}
                dependencies={storybookDependenciesV2}
                apiOptions={mobileApiOptions}
            />
        </ScrollClip>
    ),
    play: openLastDropdown,
};

/**
 * A taller stack (8 dropdowns) inside a very short container to maximize the
 * chance the last opener is right at the clip boundary with no room to flip.
 */
export const ManyDropdownsTightClip: Story = {
    render: () => (
        <ScrollClip height={160}>
            <ArticleRenderer
                json={makeMultiDropdownQuestion(8)}
                dependencies={storybookDependenciesV2}
                apiOptions={mobileApiOptions}
            />
        </ScrollClip>
    ),
    play: openLastDropdown,
};

/**
 * Wraps content in a CSS `transform: scale()` ancestor. This mimics two things
 * that are present when the bug reproduces on device:
 *   - the user pinch-zooming the exercise (iOS visual viewport ≠ layout
 *     viewport), and
 *   - Perseus's own scaling wrappers (`Zoomable`'s `transform: scale(...)` and
 *     the `mobileZoomableParentFix` `transform: translate3d(0,0,0)`).
 *
 * A `transform` on an ancestor of the opener changes the reference's measured
 * geometry (getBoundingClientRect is post-transform) while the menu is portaled
 * to <body> and positioned with Popper `strategy: "fixed"`. The mismatch is what
 * we expect to push Popper's `hide` modifier into hiding the lowest dropdown's
 * menu.
 */
function ZoomWrapper({
    children,
    scale = 1.75,
}: {
    children: React.ReactNode;
    scale?: number;
}): React.ReactElement {
    return (
        <div
            data-testid="zoom-wrapper"
            style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: `${100 / scale}%`,
            }}
        >
            {children}
        </div>
    );
}

/**
 * The reported trigger: the exercise is *zoomed in*. Several inline dropdowns
 * inside a `transform: scale()` ancestor; open the bottom-most one and inspect
 * whether its portaled menu is hidden.
 */
export const ZoomedExercise: Story = {
    render: () => (
        <ZoomWrapper>
            <ArticleRenderer
                json={makeMultiDropdownQuestion(4)}
                dependencies={storybookDependenciesV2}
                apiOptions={mobileApiOptions}
            />
        </ZoomWrapper>
    ),
    play: openLastDropdown,
};

/**
 * Zoom + a clipping scroll container together — the closest desktop analogue to
 * the on-device situation (zoomed content inside the app's scroll region).
 */
export const ZoomedInsideScrollClip: Story = {
    render: () => (
        <ScrollClip height={260}>
            <ZoomWrapper scale={1.5}>
                <ArticleRenderer
                    json={makeMultiDropdownQuestion(4)}
                    dependencies={storybookDependenciesV2}
                    apiOptions={mobileApiOptions}
                />
            </ZoomWrapper>
        </ScrollClip>
    ),
    play: openLastDropdown,
};

/**
 * Demonstrates the "detached menu" symptom on desktop. The dropdown is opened
 * FIRST (Popper positions the portaled `fixed` menu once), then a `transform:
 * scale()` is applied to the content. Popper does not recompute on an ancestor
 * transform change, so the menu stays at its original coordinates while the
 * opener scales/moves away — the menu visibly disconnects from its dropdown,
 * matching the on-device report. Use the "Toggle zoom" button to do it manually.
 *
 * NOTE: This reproduces the *detachment*. The additional iOS-only behavior where
 * the menu is fully hidden ("shows nothing") stems from `position: fixed` not
 * tracking iOS's visual viewport during pinch-zoom, which a desktop browser does
 * not replicate — confirm that part on a physical iPad.
 */
const ZoomAfterOpenDemo = (): React.ReactElement => {
    const [zoomed, setZoomed] = React.useState(false);
    return (
        <div>
            <button
                type="button"
                data-testid="zoom-toggle"
                onClick={() => setZoomed((z) => !z)}
                style={{marginBottom: 12}}
            >
                Toggle zoom (open a dropdown first)
            </button>
            <div
                style={{
                    transform: zoomed ? "scale(1.8)" : "none",
                    transformOrigin: "top left",
                    width: zoomed ? `${100 / 1.8}%` : "100%",
                }}
            >
                <ArticleRenderer
                    json={makeMultiDropdownQuestion(4)}
                    dependencies={storybookDependenciesV2}
                    apiOptions={mobileApiOptions}
                />
            </div>
        </div>
    );
};

export const ZoomAfterOpening: Story = {
    render: () => <ZoomAfterOpenDemo />,
    play: async ({canvas, userEvent}) => {
        const dropdowns = canvas.getAllByRole("combobox");
        // Open the last dropdown so Popper positions its menu...
        await userEvent.click(dropdowns[dropdowns.length - 1]);
        // ...then zoom the content. The menu should not follow the opener.
        await userEvent.click(canvas.getByTestId("zoom-toggle"));
    },
};

/**
 * Control: the same question with NO clipping container and NO zoom. The last
 * dropdown should open normally here — this is the baseline to compare against.
 *
 * TIP: to mimic the device most closely, also try zooming the browser itself
 * (Cmd/Ctrl + +) while viewing the other stories.
 */
export const NoClippingControl: Story = {
    render: () => (
        <ArticleRenderer
            json={makeMultiDropdownQuestion(4)}
            dependencies={storybookDependenciesV2}
            apiOptions={mobileApiOptions}
        />
    ),
    play: openLastDropdown,
};
