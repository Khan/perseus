import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
    content:
        "[[☃ passage 1]]\n\nWe can see the word “promotes” is used in [[☃ passage-ref 1]]\n\n",
    images: {},
    widgets: {
        "passage 1": {
            alignment: "default",
            graded: true,
            options: {
                footnotes: "",
                passageText:
                    "Our electronic devices are keeping us awake—not just because we spend time using them when we should be sleeping, but also because they emit a blue light that keeps our brains awake. One study showed that people who used screens that emitted blue light were unable to produce sufficient melatonin, a hormone that {{promotes}} sleep. In order to enjoy a more restful night, experts recommend shutting off screens at least two hours before bed. ",
                passageTitle: "",
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
        "passage-ref 1": {
            options: {
                passageNumber: 1,
                referenceNumber: 1,
                summaryText: "",
            },
            type: "passage-ref",
            version: {
                major: 0,
                minor: 1,
            },
        },
    },
};

export const question2: PerseusRenderer = {
    content:
        '[[☃ passage 1]]\n\n"It is!" is used in [[☃ passage-ref 1]]\n\n"unsettle" is used in [[☃ passage-ref 2]]\n\n"flagon" is used in [[☃ passage-ref 3]]\n\n',
    images: {},
    widgets: {
        "passage 1": {
            alignment: "default",
            graded: true,
            options: {
                footnotes: "",
                passageText:
                    '\n\nOne afternoon, Mrs. Bretton, coaxing [Paulina] from her usual station in a corner, had lifted her into the window-seat, and, by way of occupying her attention, told her to watch the passengers and count how many ladies should go down the street in a given time. She had sat listlessly, hardly looking, and not counting, when—my eye being fixed on hers—I witnessed in its iris and pupil a startling transfiguration. These sudden, dangerous natures—*sensitive* as they are called—offer many a curious spectacle to those whom a cooler temperament has secured from participation in their angular vagaries. The fixed and heavy gaze swum, trembled, then glittered in fire; the small, overcast brow cleared; the trivial and dejected features lit up; the sad countenance vanished, and in its place appeared a sudden eagerness, an intense expectancy. {{"It *is!*"}} were her words.\n\nLike a bird or a shaft, or any other swift thing, she was gone from the room. How she got the house-door open I cannot tell; probably it might be ajar; perhaps Warren was in the way and obeyed her behest, which would be impetuous enough. I—watching calmly from the window—saw her, in her black frock and tiny braided apron (to pinafores she had an antipathy), dart half the length of the street; and, as I was on the point of turning, and quietly announcing to Mrs. Bretton that the child was run out mad, and ought instantly to be pursued, I saw her caught up, and rapt at once from my cool observation, and from the wondering stare of the passengers. A gentleman had done this good turn, and now, covering her with his     cloak, advanced to restore her to the house whence he had seen her issue.\n\nI concluded he would leave her in a servant\'s charge and withdraw; but he entered: having tarried a little while below, he came up-stairs.\n\nHis reception immediately explained that he was known to Mrs. Bretton. She recognised him; she greeted him, and yet she was fluttered, surprised, taken unawares. Her look and manner were even expostulatory; and in reply to these, rather than her words, he said,—"I could not help it, madam: I found it impossible to leave the country without seeing with my own eyes how she settled."\n\n"But you will {{unsettle}} her."\n\n"I hope not. And how is papa\'s little Polly?"\n\nThis question he addressed to Paulina, as he sat down and placed her gently on the ground before him.\n\n"How is Polly\'s papa?" was the reply, as she leaned on his knee, and gazed up into his face.\n\nIt was not a noisy, not a wordy scene: for that I was thankful; but it was a scene of feeling too brimful, and which, because the cup did not foam up high or furiously overflow, only oppressed one the more. On all occasions of vehement, unrestrained expansion, a sense of disdain or ridicule comes to the weary spectator\'s relief; whereas I have ever felt most burdensome that sort of sensibility which bends of its own will, a giant slave under the sway of good sense.\n\nMr. Home was a stern-featured—perhaps I should rather say, a hard-featured man: his forehead was knotty, and his cheekbones were marked and prominent. The character of his face was quite Scotch; but there was feeling in his eye, and emotion in his now agitated countenance. His northern accent in speaking harmonised with his physiognomy. He was at once proud-looking and homely-looking. He laid his hand on the child\'s uplifted head. She said—"Kiss Polly."\n\nHe kissed her. I wished she would utter some hysterical cry, so that I might get relief and be at ease. She made wonderfully little noise: she seemed to have got what she wanted—all she wanted, and to be in a trance of content. Neither in mien nor in features was this creature like her sire, and yet she was of his strain: her mind had been filled from his, as the cup from the {{flagon}}.\n',
                passageTitle: "",
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
        "passage-ref 1": {
            options: {
                passageNumber: 1,
                referenceNumber: 1,
                summaryText: "",
            },
            type: "passage-ref",
            version: {
                major: 0,
                minor: 1,
            },
        },
        "passage-ref 2": {
            options: {
                passageNumber: 1,
                referenceNumber: 2,
                summaryText: "",
            },
            type: "passage-ref",
            version: {
                major: 0,
                minor: 1,
            },
        },
        "passage-ref 3": {
            options: {
                passageNumber: 1,
                referenceNumber: 3,
                summaryText: "",
            },
            type: "passage-ref",
            version: {
                major: 0,
                minor: 1,
            },
        },
    },
};
