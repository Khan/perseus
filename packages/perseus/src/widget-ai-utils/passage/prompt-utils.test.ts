import {getPromptJSON} from "./prompt-utils";

describe("Passage getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            footnotes: "An example footnote",
            passageText:
                "{{For reasons that are not entirely clear, when animals make their way to isolated islands [[1]], they tend to evolve relatively quickly toward an outsized or pint-sized version of their mainland counterpart.}} \n\n{{Perhaps the most famous example of an island giant—and, sadly, of species extinction—is the dodo, once found on the Indian Ocean island of Mauritius.}} {{When the dodo's ancestor (thought to be a migratory pigeon) settled on this island with abundant food, no competition from terrestrial mammals, and no predators, it could survive without flying, and thus was freed from the energetic and size constraints of flight.}} {{New Zealand also had avian giants, now extinct, including the flightless moa, an ostrich-like bird, and Haast's eagle (_Harpagornis moorei_), which had a wingspan up to 3 meters.}} {{Though Haast's eagle could fly—and presumably used its wings to {{launch}} brutal attacks on the hapless moa—its body mass (10–14 kilograms) pushed the limits for self-propelled flight.}}\n\n{{As extreme evolutionary examples, these island birds can offer insights into the forces and events shaping evolutionary change.}} In a new study, Michael Bunce et al. compared ancient mitochondrial DNA extracted from Haast's eagle bones with DNA sequences of 16 living eagle species to better characterize the evolutionary history of the extinct giant raptor. {{Their results suggest the extinct raptor underwent a rapid evolutionary transformation that belies its kinship to some of the world's smallest eagle species.}}\n\nThe authors characterized the rates of sequence evolution within mitochondrial DNA to establish the evolutionary relationships between the different eagle species. Their analysis places Haast's eagle in the same evolutionary lineage as a group of small eagle species in the genus _Hieraaetus_. Surprisingly, the genetic distance separating the giant eagle and its more diminutive _Hieraaetus_ cousins from their last {{common}} ancestor is relatively small.\n",
            passageTitle: "Passage 1",
        };

        const resultJSON = getPromptJSON(renderProps);

        expect(resultJSON).toEqual({
            type: "passage",
            options: {
                footnotes: renderProps.footnotes,
                passageText: renderProps.passageText,
                passageTitle: renderProps.passageTitle,
            },
        });
    });
});