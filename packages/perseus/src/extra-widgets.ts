/* eslint-disable import/no-named-as-default */
// As new widgets get added here, please also make sure they get added in
// content_internal/perseus_traversal.py so they can be properly translated.

import Categorizer from "./widgets/categorizer";
import CSProgram from "./widgets/cs-program";
import Definition from "./widgets/definition";
import DeprecatedStandin from "./widgets/deprecated-standin";
import Dropdown from "./widgets/dropdown";
import Explanation from "./widgets/explanation";
import GradedGroup from "./widgets/graded-group";
import GradedGroupSet from "./widgets/graded-group-set";
import Grapher from "./widgets/grapher";
import Group from "./widgets/group";
import Iframe from "./widgets/iframe";
import Image from "./widgets/image";
import Interactive from "./widgets/interaction";
import InteractiveGraph from "./widgets/interactive-graph";
import LabelImage from "./widgets/label-image";
import LightsPuzzle from "./widgets/lights-puzzle";
import Matcher from "./widgets/matcher";
import Measurer from "./widgets/measurer";
import Molecule from "./widgets/molecule";
import Orderer from "./widgets/orderer";
import Passage from "./widgets/passage";
import PassageRef from "./widgets/passage-ref";
import PassageRefTarget from "./widgets/passage-ref-target";
import Plotter from "./widgets/plotter";
import ReactionDiagram from "./widgets/reaction-diagram";
import Sequence from "./widgets/sequence";
import Simulator from "./widgets/simulator";
import Sorter from "./widgets/sorter";
import Unit from "./widgets/unit";
import Video from "./widgets/video";

import type {WidgetExports} from "./types";

export default [
    Categorizer,
    CSProgram,
    Dropdown,
    Explanation,
    Definition,
    Grapher,
    GradedGroup,
    GradedGroupSet,
    Group,
    Iframe,
    Image,
    Interactive,
    InteractiveGraph,
    LabelImage,
    LightsPuzzle,
    Matcher,
    Measurer,
    Molecule,
    Orderer,
    Passage,
    PassageRef,
    PassageRefTarget,
    Plotter,
    ReactionDiagram,
    Sequence,
    Simulator,
    Sorter,
    Unit,
    Video,
    DeprecatedStandin,
] as ReadonlyArray<WidgetExports>;
