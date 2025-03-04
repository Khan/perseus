/* eslint-disable import/no-named-as-default */
// As new widgets get added here, please also make sure they get added in
// content_internal/perseus_traversal.py so they can be properly translated.

import Categorizer from "./widgets/categorizer";
import CSProgram from "./widgets/cs-program";
import Definition from "./widgets/definition";
import DeprecatedStandin from "./widgets/deprecated-standin";
import Dropdown from "./widgets/dropdown";
import Explanation from "./widgets/explanation";
import FreeResponse from "./widgets/free-response";
import GradedGroup from "./widgets/graded-group";
import GradedGroupSet from "./widgets/graded-group-set";
import Grapher from "./widgets/grapher";
import Group from "./widgets/group";
import Iframe from "./widgets/iframe";
import Image from "./widgets/image";
import Interactive from "./widgets/interaction";
import InteractiveGraph from "./widgets/interactive-graph";
import LabelImage from "./widgets/label-image";
import Matcher from "./widgets/matcher";
import Matrix from "./widgets/matrix";
import Measurer from "./widgets/measurer";
import Molecule from "./widgets/molecule";
import NumberLine from "./widgets/number-line";
import Orderer from "./widgets/orderer";
import Passage from "./widgets/passage";
import PassageRef from "./widgets/passage-ref";
import PassageRefTarget from "./widgets/passage-ref-target";
import PhetSimulation from "./widgets/phet-simulation";
import Plotter from "./widgets/plotter";
import PythonProgram from "./widgets/python-program";
import Sorter from "./widgets/sorter";
import Table from "./widgets/table";
import Video from "./widgets/video";

import type {WidgetExports} from "./types";

export default [
    CSProgram,
    Categorizer,
    Definition,
    DeprecatedStandin,
    Dropdown,
    Explanation,
    FreeResponse,
    GradedGroup,
    GradedGroupSet,
    Grapher,
    Group,
    Iframe,
    Image,
    Interactive,
    InteractiveGraph,
    LabelImage,
    Matcher,
    Matrix,
    Measurer,
    Molecule,
    NumberLine,
    Orderer,
    Passage,
    PassageRef,
    PassageRefTarget,
    PhetSimulation,
    Plotter,
    PythonProgram,
    Sorter,
    Table,
    Video,
] as ReadonlyArray<WidgetExports>;
