import ExerciseFramePage from "./preview/exercise-preview-page";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Dev Support/Preview",
    component: ExerciseFramePage,
    // 👇 Disable auto-generated documentation for this component. This
    // component supports preview in dev mode and isn't meant to be used as a
    // story by itself..
    tags: ["!autodocs"],
};
export default meta;

type Story = StoryObj<typeof ExerciseFramePage>;

export const Default: Story = {};
