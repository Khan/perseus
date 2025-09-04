import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./passage-ai-utils";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

const question1: PerseusRenderer = {
    content: "[[☃ passage 1]]\n\n",
    images: {},
    widgets: {
        "passage 1": {
            alignment: "default",
            graded: true,
            options: {
                footnotes: "",
                passageText:
                    "Sociologists study folktales because they provide a means of understanding the distinctive values of a culture. However, the folktales in almost all cultures are adaptations of the same ancient narratives to the local milieu.\n",
                passageTitle: "Why do sociologists study folktales?",
                showLineNumbers: false,
                static: false,
            },
            static: false,
            type: "passage",
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

describe("Passage AI utils", () => {
    it("it returns JSON with the expected format and fields", () => {
        const widgetData: any = {
            footnotes: "An example footnote",
            passageText:
                "{{For reasons that are not entirely clear, when animals make their way to isolated islands [[1]], they tend to evolve relatively quickly toward an outsized or pint-sized version of their mainland counterpart.}} \n\n{{Perhaps the most famous example of an island giant—and, sadly, of species extinction—is the dodo, once found on the Indian Ocean island of Mauritius.}} {{When the dodo's ancestor (thought to be a migratory pigeon) settled on this island with abundant food, no competition from terrestrial mammals, and no predators, it could survive without flying, and thus was freed from the energetic and size constraints of flight.}} {{New Zealand also had avian giants, now extinct, including the flightless moa, an ostrich-like bird, and Haast's eagle (_Harpagornis moorei_), which had a wingspan up to 3 meters.}} {{Though Haast's eagle could fly—and presumably used its wings to {{launch}} brutal attacks on the hapless moa—its body mass (10–14 kilograms) pushed the limits for self-propelled flight.}}\n\n{{As extreme evolutionary examples, these island birds can offer insights into the forces and events shaping evolutionary change.}} In a new study, Michael Bunce et al. compared ancient mitochondrial DNA extracted from Haast's eagle bones with DNA sequences of 16 living eagle species to better characterize the evolutionary history of the extinct giant raptor. {{Their results suggest the extinct raptor underwent a rapid evolutionary transformation that belies its kinship to some of the world's smallest eagle species.}}\n\nThe authors characterized the rates of sequence evolution within mitochondrial DNA to establish the evolutionary relationships between the different eagle species. Their analysis places Haast's eagle in the same evolutionary lineage as a group of small eagle species in the genus _Hieraaetus_. Surprisingly, the genetic distance separating the giant eagle and its more diminutive _Hieraaetus_ cousins from their last {{common}} ancestor is relatively small.\n",
            passageTitle: "Passage 1",
        };

        const resultJSON = getPromptJSON(widgetData);

        expect(resultJSON).toEqual({
            type: "passage",
            options: {
                footnotes: "An example footnote",
                passageText:
                    "{{For reasons that are not entirely clear, when animals make their way to isolated islands [[1]], they tend to evolve relatively quickly toward an outsized or pint-sized version of their mainland counterpart.}} \n\n{{Perhaps the most famous example of an island giant—and, sadly, of species extinction—is the dodo, once found on the Indian Ocean island of Mauritius.}} {{When the dodo's ancestor (thought to be a migratory pigeon) settled on this island with abundant food, no competition from terrestrial mammals, and no predators, it could survive without flying, and thus was freed from the energetic and size constraints of flight.}} {{New Zealand also had avian giants, now extinct, including the flightless moa, an ostrich-like bird, and Haast's eagle (_Harpagornis moorei_), which had a wingspan up to 3 meters.}} {{Though Haast's eagle could fly—and presumably used its wings to {{launch}} brutal attacks on the hapless moa—its body mass (10–14 kilograms) pushed the limits for self-propelled flight.}}\n\n{{As extreme evolutionary examples, these island birds can offer insights into the forces and events shaping evolutionary change.}} In a new study, Michael Bunce et al. compared ancient mitochondrial DNA extracted from Haast's eagle bones with DNA sequences of 16 living eagle species to better characterize the evolutionary history of the extinct giant raptor. {{Their results suggest the extinct raptor underwent a rapid evolutionary transformation that belies its kinship to some of the world's smallest eagle species.}}\n\nThe authors characterized the rates of sequence evolution within mitochondrial DNA to establish the evolutionary relationships between the different eagle species. Their analysis places Haast's eagle in the same evolutionary lineage as a group of small eagle species in the genus _Hieraaetus_. Surprisingly, the genetic distance separating the giant eagle and its more diminutive _Hieraaetus_ cousins from their last {{common}} ancestor is relatively small.\n",
                passageTitle: "Passage 1",
            },
        });
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content: "[[☃ passage 1]]\n\n",
            widgets: {
                "passage 1": {
                    type: "passage",
                    options: {
                        footnotes: "",
                        passageText:
                            "Sociologists study folktales because they provide a means of understanding the distinctive values of a culture. However, the folktales in almost all cultures are adaptations of the same ancient narratives to the local milieu.\n",
                        passageTitle: "Why do sociologists study folktales?",
                    },
                },
            },
        });
    });
});
