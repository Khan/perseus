// TODO(LEMS-4371): Delete this story, and the `previewStoryId` prop it is
// passed to, once the widget is registered globally. `Dev Support/Preview`
// will then already know about it.
import ExerciseFramePage from "../../testing/preview/exercise-preview-page";

import {registerFillInTheBlankWidget} from "./register-poc";

import type {Meta, StoryObj} from "@storybook/react-vite";

// EditorPage renders its preview in an iframe pointed at a Storybook story,
// and that iframe is a separate module graph — it only knows the widgets
// registered inside it. `testing/test-dependencies.tsx` registers the shipped
// set; Fill in the Blank is not in it, so this story adds it.
//
// This runs after the imports above have already registered the shipped
// widgets, so it adds to that set rather than racing it.
registerFillInTheBlankWidget();

const meta: Meta = {
    title: "Dev Support/Preview (Fill in the Blank)",
    component: ExerciseFramePage,
    // Not a component in its own right: it exists only to be framed by the
    // Fill in the Blank editor page story, mirroring "Dev Support/Preview".
    tags: ["!autodocs", "!manifest"],
};
export default meta;

type Story = StoryObj<typeof ExerciseFramePage>;

export const Default: Story = {};
