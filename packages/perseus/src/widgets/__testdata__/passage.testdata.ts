import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
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
                passageTitle: "",
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

export const question2: PerseusRenderer = {
    content:
        '>Select text to highlight it. *(Laptop/desktop only)*\n\n>**Passage 1 is adapted from *"Ancient DNA Tells Story of Giant Eagle Evolution,"* © 2005 by Public Library of Science. Passage 2 is adapted from Tim Heupink, et al. *"Dodos and Spotted Green Pigeons are Descendants of an Island Hopping Bird,"* © 2014 by BioMed Central. **\n\n[[☃ passage 1]]\n\n[[☃ passage 2]]',
    images: {},
    widgets: {
        "passage 1": {
            alignment: "default",
            graded: true,
            options: {
                footnotes: "An example footnote",
                passageText:
                    "{{For reasons that are not entirely clear, when animals make their way to isolated islands [[1]], they tend to evolve relatively quickly toward an outsized or pint-sized version of their mainland counterpart.}} \n\n{{Perhaps the most famous example of an island giant—and, sadly, of species extinction—is the dodo, once found on the Indian Ocean island of Mauritius.}} {{When the dodo's ancestor (thought to be a migratory pigeon) settled on this island with abundant food, no competition from terrestrial mammals, and no predators, it could survive without flying, and thus was freed from the energetic and size constraints of flight.}} {{New Zealand also had avian giants, now extinct, including the flightless moa, an ostrich-like bird, and Haast's eagle (_Harpagornis moorei_), which had a wingspan up to 3 meters.}} {{Though Haast's eagle could fly—and presumably used its wings to {{launch}} brutal attacks on the hapless moa—its body mass (10–14 kilograms) pushed the limits for self-propelled flight.}}\n\n{{As extreme evolutionary examples, these island birds can offer insights into the forces and events shaping evolutionary change.}} In a new study, Michael Bunce et al. compared ancient mitochondrial DNA extracted from Haast's eagle bones with DNA sequences of 16 living eagle species to better characterize the evolutionary history of the extinct giant raptor. {{Their results suggest the extinct raptor underwent a rapid evolutionary transformation that belies its kinship to some of the world's smallest eagle species.}}\n\nThe authors characterized the rates of sequence evolution within mitochondrial DNA to establish the evolutionary relationships between the different eagle species. Their analysis places Haast's eagle in the same evolutionary lineage as a group of small eagle species in the genus _Hieraaetus_. Surprisingly, the genetic distance separating the giant eagle and its more diminutive _Hieraaetus_ cousins from their last {{common}} ancestor is relatively small.\n",
                passageTitle: "Passage 1",
                showLineNumbers: true,
                static: false,
            },
            static: false,
            type: "passage",
            version: {
                major: 0,
                minor: 0,
            },
        },
        "passage 2": {
            alignment: "default",
            graded: true,
            options: {
                footnotes: "",
                passageText:
                    "The mysterious spotted green pigeon (_Caloenas maculata_) was a relative of the dodo, according to scientists who have examined its genetic make-up [1]. The authors say their results, published in the open access journal BMC Evolutionary Biology, support a theory that both birds are descended from “island hopping” ancestors.\n\nThe scientists took DNA from two feathers of the spotted green pigeon. Because of its age, the DNA was highly fragmented, so they focused in on three DNA “mini barcodes” – small sections of DNA which are unique for most bird species. They looked at these sections of the pigeon's DNA, and compared it to other species.\n\nThis showed that the spotted green pigeon is indeed a separate species, showing a unique DNA barcode compared to other pigeons. The pigeon is genetically most closely related to the Nicobar pigeon and the dodo and Rodrigues solitaire, both extinct birds from islands near Madagascar. The spotted green pigeon shows signs of a semi-terrestrial island lifestyle and the ability to fly. The closely related Nicobar pigeon shows similar habits and has a preference for travelling between small islands.\n\nThe scientists say this lifestyle, together with the relationship of both pigeons to the dodo and Rodrigues solitaire, supports an evolutionary theory that the ancestors of these birds were “island hoppers,” moving between islands around India and Southeast Asia. The birds that settled on particular islands then evolved into the individual species. The dodo's ancestor managed to hop as far as the island of Mauritius near Madagascar where it then lost the ability to fly.\n\nDr. Tim Heupink, Griffith University Australia says: {{“This study improves our ability to identify novel species from historic remains, and also those that are not novel after all. Ultimately this will help us to measure and understand the extinction of local populations and entire species.”}}\n",
                passageTitle: "Passage 2",
                showLineNumbers: true,
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

export const question3: PerseusRenderer = {
    content: "[[☃ passage 1]]",
    images: {},
    widgets: {
        "passage 1": {
            alignment: "default",
            graded: true,
            options: {
                footnotes: "An example footnote",
                passageText:
                    "{{For reasons that are not entirely clear, when animals make their way to isolated islands [[1]], they tend to evolve relatively quickly toward an outsized or pint-sized version of their mainland counterpart.}} \n\n{{Perhaps the most famous example of an island giant—and, sadly, of species extinction—is the dodo, once found on the Indian Ocean island of Mauritius.}} {{When the dodo's ancestor (thought to be a migratory pigeon) settled on this island with abundant food, no competition from terrestrial mammals, and no predators, it could survive without flying, and thus was freed from the energetic and size constraints of flight.}} {{New Zealand also had avian giants, now extinct, including the flightless moa, an ostrich-like bird, and Haast's eagle (_Harpagornis moorei_), which had a wingspan up to 3 meters.}} {{Though Haast's eagle could fly—and presumably used its wings to {{launch}} brutal attacks on the hapless moa—its body mass (10–14 kilograms) pushed the limits for self-propelled flight.}}\n\n{{As extreme evolutionary examples, these island birds can offer insights into the forces and events shaping evolutionary change.}} In a new study, Michael Bunce et al. compared ancient mitochondrial DNA extracted from Haast's eagle bones with DNA sequences of 16 living eagle species to better characterize the evolutionary history of the extinct giant raptor. {{Their results suggest the extinct raptor underwent a rapid evolutionary transformation that belies its kinship to some of the world's smallest eagle species.}}\n\nThe authors characterized the rates of sequence evolution within mitochondrial DNA to establish the evolutionary relationships between the different eagle species. Their analysis places Haast's eagle in the same evolutionary lineage as a group of small eagle species in the genus _Hieraaetus_. Surprisingly, the genetic distance separating the giant eagle and its more diminutive _Hieraaetus_ cousins from their last {{common}} ancestor is relatively small.\n",
                passageTitle: "Passage 1",
                showLineNumbers: true,
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
