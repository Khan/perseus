import * as React from "react";

import {ApiOptions} from "../../../perseus-api";
import {ImageExplorationModal} from "../image-exploration-modal";

import styles from "./image-stories.module.css";

import type {Meta, StoryObj} from "@storybook/react-vite";

const earthMoonImage = {
    url: "https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",
    width: 400,
    height: 225,
};
const frescoImage = {
    url: "https://cdn.kastatic.org/ka-perseus-images/01f44d5b73290da6bec97c75a5316fb05ab61f12.jpg",
    width: 1698,
    height: 955,
};

const meta: Meta<typeof ImageExplorationModal> = {
    title: "Widgets/Image/Widget Internal Components/ImageExplorationModal",
    component: ImageExplorationModal,
    decorators: [
        (Story) => (
            <div className={styles.container}>
                <Story />
            </div>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof ImageExplorationModal>;

export const LargeImage: Story = {
    args: {
        backgroundImage: frescoImage,
        title: "*The Offer of the Casa Madre to Victory*, 1932",
        alt: "Fresco alt",
        caption:
            "Carlo Delcroix presenting the Casa Madre (highlighted) to Victory. Antonio Giuseppe Santagata, *The Offer of the Casa Madre to Victory*, 1932, fresco (apse, assembly hall, Home for Wounded War Veterans, Rome, photo ©ANMIG)",
        longDescription:
            "In the apse, or semicircular recess, The Offer of the Casa Madre to Victory (L’Offerta della Casa Madre alla Vittoria) fresco recalls medieval apse decorative schemes with Christ surrounded by saints to whom the Church is dedicated. Santagata replaced Mary with a triumphant and wingless figure representing Victory, and he replaced saints with sentries. The charismatic wounded veteran Carlo Delcroix, who became the AMNIG president, is depicted presenting a model of the Casa Madre to Victory (not unlike the medieval patron Enrico Scrovegni, who offered the Arena chapel he commissioned to the Virgin Mary).\n\nThis image has some stuff in it. *Here is some italic text.* **Here is some bold text.**",
        apiOptions: ApiOptions.defaults,
    },
};

export const LargeImageWithoutCaptionOrTitle: Story = {
    args: {
        backgroundImage: frescoImage,
        alt: "Fresco alt",
        longDescription:
            "In the apse, or semicircular recess, The Offer of the Casa Madre to Victory (L’Offerta della Casa Madre alla Vittoria) fresco recalls medieval apse decorative schemes with Christ surrounded by saints to whom the Church is dedicated. Santagata replaced Mary with a triumphant and wingless figure representing Victory, and he replaced saints with sentries. The charismatic wounded veteran Carlo Delcroix, who became the AMNIG president, is depicted presenting a model of the Casa Madre to Victory (not unlike the medieval patron Enrico Scrovegni, who offered the Arena chapel he commissioned to the Virgin Mary).\n\nThis image has some stuff in it. *Here is some italic text.* **Here is some bold text.**",
        apiOptions: ApiOptions.defaults,
    },
};

export const SmallImage: Story = {
    args: {
        backgroundImage: earthMoonImage,
        longDescription:
            "This is a *very* long description of the earth and moon.",
        apiOptions: ApiOptions.defaults,
    },
};
