import * as React from "react";

import {ApiOptions} from "../../../perseus-api";
import {ExploreImageModal} from "../components/explore-image-modal";
import {earthMoonImage, frescoImage, monasteryImage} from "../utils";

import styles from "./image-stories.module.css";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof ExploreImageModal> = {
    title: "Widgets/Image/Widget Internal Components/ExploreImageModal",
    component: ExploreImageModal,
    decorators: [
        (Story) => (
            <div className={styles.container}>
                <Story />
            </div>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof ExploreImageModal>;

export const LargeImage: Story = {
    args: {
        backgroundImage: frescoImage,
        zoomSize: {width: frescoImage.width, height: frescoImage.height},
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
        zoomSize: {width: frescoImage.width, height: frescoImage.height},
        alt: "Fresco alt",
        longDescription:
            "In the apse, or semicircular recess, The Offer of the Casa Madre to Victory (L’Offerta della Casa Madre alla Vittoria) fresco recalls medieval apse decorative schemes with Christ surrounded by saints to whom the Church is dedicated. Santagata replaced Mary with a triumphant and wingless figure representing Victory, and he replaced saints with sentries. The charismatic wounded veteran Carlo Delcroix, who became the AMNIG president, is depicted presenting a model of the Casa Madre to Victory (not unlike the medieval patron Enrico Scrovegni, who offered the Arena chapel he commissioned to the Virgin Mary).\n\nThis image has some stuff in it. *Here is some italic text.* **Here is some bold text.**",
        apiOptions: ApiOptions.defaults,
    },
};

export const SmallImage: Story = {
    args: {
        backgroundImage: earthMoonImage,
        zoomSize: {width: earthMoonImage.width, height: earthMoonImage.height},
        longDescription:
            "This is a *very* long description of the earth and moon.",
        apiOptions: ApiOptions.defaults,
    },
};

export const PortraitImage: Story = {
    args: {
        backgroundImage: monasteryImage,
        zoomSize: {width: monasteryImage.width, height: monasteryImage.height},
        caption:
            "Kalenić Monastery, after 1407, Serbia (photo: [Ванилица](https://commons.wikimedia.org/wiki/File:Wiki_%C5%A0umadija_XI_Kaleni%C4%87_Monastery_874.jpg), CC BY-SA 4.0)",
        title: "Kalenić Monastery",
        longDescription:
            "Later architecture in Serbia, notably that of the so-called Morava School, is smaller and more decorative, often utilizing the so-called Athonite plan (with choroi and subsidiary chapels), as at Ravanica (1370s), with five domes, or the smaller and simpler Kalenić (after 1407).",
        apiOptions: ApiOptions.defaults,
    },
};
