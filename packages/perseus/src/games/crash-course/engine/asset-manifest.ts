/**
 * Asset Manifest
 *
 * Defines all game assets (images and audio) that need to be loaded.
 * Used by AssetLoader to preload and cache assets before game starts.
 */
import type {AssetManifest} from "./types";

// Import all sprite assets
import alien1 from "../assets/sprites/alien1.png";
import alien2 from "../assets/sprites/alien2.png";
import alien3 from "../assets/sprites/alien3.png";
import beam from "../assets/sprites/beam.png";
import car1 from "../assets/sprites/car1.png";
import impact from "../assets/sprites/impact.png";
import run1 from "../assets/sprites/run1.png";
import run2 from "../assets/sprites/run2.png";
import run3 from "../assets/sprites/run3.png";
import run4 from "../assets/sprites/run4.png";
import run5 from "../assets/sprites/run5.png";
import run6 from "../assets/sprites/run6.png";

// Import background assets
import cityClose from "../assets/backgrounds/city-close.png";
import cityFar from "../assets/backgrounds/city-far.png";
import citySemiClose from "../assets/backgrounds/city-semi-close.png";
import citySemiFar from "../assets/backgrounds/city-semi-far.png";
import lamplight from "../assets/backgrounds/lamplight.png";
import sky from "../assets/backgrounds/sky.png";
import streetlamp from "../assets/backgrounds/streetlamp.png";

// Import UI assets
import lose from "../assets/ui/lose.png";
import mute from "../assets/ui/mute.png";
import next from "../assets/ui/next.png";
import start from "../assets/ui/start.png";
import title from "../assets/ui/title.png";
import unmute from "../assets/ui/unmute.png";
import victory from "../assets/ui/victory.png";

// Import story assets
import story1 from "../assets/story/story1.png";
import story2 from "../assets/story/story2.png";
import story3 from "../assets/story/story3.png";
import story4 from "../assets/story/story4.png";
import story5 from "../assets/story/story5.png";
import story6 from "../assets/story/story6.png";
import story7 from "../assets/story/story7.png";

// Import audio assets
import alexBouncyMix from "../assets/audio/alexbouncymix2.ogg";
import gameOver from "../assets/audio/Game Over II.ogg";
import neonOwl from "../assets/audio/Zodik - Neon Owl.ogg";
import tedox from "../assets/audio/Zodik - Tedox.ogg";

/**
 * Game asset manifest
 * Maps asset keys to their file paths
 */
export const ASSET_MANIFEST: AssetManifest = {
    images: {
        // Character sprites
        "run1": run1,
        "run2": run2,
        "run3": run3,
        "run4": run4,
        "run5": run5,
        "run6": run6,
        "impact": impact,

        // Alien sprites
        "alien1": alien1,
        "alien2": alien2,
        "alien3": alien3,
        "beam": beam,

        // Obstacle sprites
        "car1": car1,

        // Backgrounds
        "sky": sky,
        "cityFar": cityFar,
        "citySemiFar": citySemiFar,
        "citySemiClose": citySemiClose,
        "cityClose": cityClose,
        "streetlamp": streetlamp,
        "lamplight": lamplight,

        // UI
        "title": title,
        "start": start,
        "next": next,
        "victory": victory,
        "lose": lose,
        "mute": mute,
        "unmute": unmute,

        // Story
        "story1": story1,
        "story2": story2,
        "story3": story3,
        "story4": story4,
        "story5": story5,
        "story6": story6,
        "story7": story7,
    },
    audio: {
        // Music tracks
        "menu": alexBouncyMix,
        "gameplay": tedox,
        "extended": neonOwl,
        "gameover": gameOver,
    },
};
