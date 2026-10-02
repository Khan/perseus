import ExerciseFramePage from "./preview/exercise-preview-page";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Dev Support/Preview",
    component: ExerciseFramePage,
    // 👇 Disable auto-generated documentation for this component. This
    // component supports preview in dev mode and isn't meant to be used as a
    // story by itself. `!dev` hides it from the sidebar while keeping it in
    // the story index, so the editor stories can still load it in an iframe
    // (see `use-preview-url.ts`).
    tags: ["!autodocs", "!manifest", "!dev"],
};
export default meta;

type Story = StoryObj<typeof ExerciseFramePage>;

export const Default: Story = {};
