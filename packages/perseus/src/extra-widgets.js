// @flow
// As new widgets get added here, please also make sure they get added in
// content_internal/perseus_traversal.py so they can be properly translated.

import Categorizer from "./widgets/categorizer.jsx";
import CSProgram from "./widgets/cs-program.jsx";
import Definition from "./widgets/definition.jsx";
import Dropdown from "./widgets/dropdown.jsx";
import Explanation from "./widgets/explanation.jsx";
import GradedGroupSet from "./widgets/graded-group-set.jsx";
import GradedGroup from "./widgets/graded-group.jsx";
import Grapher from "./widgets/grapher.jsx";
import Group from "./widgets/group.jsx";
import Iframe from "./widgets/iframe.jsx";
import Image from "./widgets/image.jsx";
import Interactive from "./widgets/interaction.jsx";
import InteractiveGraph from "./widgets/interactive-graph.jsx";
import LabelImage from "./widgets/label-image.jsx";
import LightsPuzzle from "./widgets/lights-puzzle.jsx";
import Matcher from "./widgets/matcher.jsx";
import Matrix from "./widgets/matrix.jsx";
import Measurer from "./widgets/measurer.jsx";
import Molecule from "./widgets/molecule.jsx";
import NumberLine from "./widgets/number-line.jsx";
import Orderer from "./widgets/orderer.jsx";
import PassageRefTarget from "./widgets/passage-ref-target.jsx";
import PassageRef from "./widgets/passage-ref.jsx";
import Passage from "./widgets/passage.jsx";
import Plotter from "./widgets/plotter.jsx";
import ReactionDiagram from "./widgets/reaction-diagram.jsx";
import Sequence from "./widgets/sequence.jsx";
import Simulator from "./widgets/simulator.jsx";
import Sorter from "./widgets/sorter.jsx";
import Table from "./widgets/table.jsx";
import Transformer from "./widgets/transformer.jsx";
import Unit from "./widgets/unit.jsx";
import Video from "./widgets/video.jsx";

import type {WidgetExports} from "./types.js";

export default ([
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
    Matrix,
    Matcher,
    Measurer,
    Molecule,
    NumberLine,
    Orderer,
    Passage,
    PassageRef,
    PassageRefTarget,
    Plotter,
    ReactionDiagram,
    Sequence,
    Simulator,
    Sorter,
    Table,
    Transformer,
    Unit,
    Video,
]: $ReadOnlyArray<WidgetExports<>>);
