// Editor registrations import source-only Perseus widget descriptors. The
// production aggregate uses the implementations directly so the published init
// entry does not depend on those development-only subpaths.
import CategorizerEditor from "./widgets/categorizer-editor/categorizer-editor";
import CSProgramEditor from "./widgets/cs-program-editor/cs-program-editor";
import DefinitionEditor from "./widgets/definition-editor/definition-editor";
import DeprecatedStandinEditor from "./widgets/deprecated-standin-editor/deprecated-standin-editor";
import DropdownEditor from "./widgets/dropdown-editor/dropdown-editor";
import ExplanationEditor from "./widgets/explanation-editor/explanation-editor";
import ExpressionEditor from "./widgets/expression-editor/expression-editor";
import FillInTheBlankEditor from "./widgets/fill-in-the-blank-editor/fill-in-the-blank-editor";
import FreeResponseEditor from "./widgets/free-response-editor/free-response-editor";
import GradedGroupEditor from "./widgets/graded-group-editor/graded-group-editor";
import GradedGroupSetEditor from "./widgets/graded-group-set-editor/graded-group-set-editor";
import GrapherEditor from "./widgets/grapher-editor/grapher-editor";
import GroupEditor from "./widgets/group-editor/group-editor";
import IframeEditor from "./widgets/iframe-editor/iframe-editor";
import ImageEditor from "./widgets/image-editor/image-editor";
import InputNumberEditor from "./widgets/input-number-editor/input-number-editor";
import InteractionEditor from "./widgets/interaction-editor/interaction-editor";
import InteractiveGraphEditor from "./widgets/interactive-graph-editor/interactive-graph-editor";
import LabelImageEditor from "./widgets/label-image-editor/label-image-editor";
import MatcherEditor from "./widgets/matcher-editor/matcher-editor";
import MatrixEditor from "./widgets/matrix-editor/matrix-editor";
import MeasurerEditor from "./widgets/measurer-editor/measurer-editor";
import NumberLineEditor from "./widgets/number-line-editor/number-line-editor";
import NumericInputEditor from "./widgets/numeric-input-editor/numeric-input-editor";
import OrdererEditor from "./widgets/orderer-editor/orderer-editor";
import PhetSimulationEditor from "./widgets/phet-simulation-editor/phet-simulation-editor";
import PlotterEditor from "./widgets/plotter-editor/plotter-editor";
import PythonProgramEditor from "./widgets/python-program-editor/python-program-editor";
import RadioEditor from "./widgets/radio-editor/radio-editor";
import SorterEditor from "./widgets/sorter-editor/sorter-editor";
import TableEditor from "./widgets/table-editor/table-editor";
import VideoEditor from "./widgets/video-editor/video-editor";

/**
 * Every widget editor, keyed by the type of widget it edits.
 */
export default {
    categorizer: CategorizerEditor,
    "cs-program": CSProgramEditor,
    definition: DefinitionEditor,
    "deprecated-standin": DeprecatedStandinEditor,
    dropdown: DropdownEditor,
    explanation: ExplanationEditor,
    expression: ExpressionEditor,
    "fill-in-the-blank": FillInTheBlankEditor,
    "free-response": FreeResponseEditor,
    "graded-group": GradedGroupEditor,
    "graded-group-set": GradedGroupSetEditor,
    grapher: GrapherEditor,
    group: GroupEditor,
    iframe: IframeEditor,
    image: ImageEditor,
    "input-number": InputNumberEditor,
    interaction: InteractionEditor,
    "interactive-graph": InteractiveGraphEditor,
    "label-image": LabelImageEditor,
    matcher: MatcherEditor,
    matrix: MatrixEditor,
    measurer: MeasurerEditor,
    "number-line": NumberLineEditor,
    "numeric-input": NumericInputEditor,
    orderer: OrdererEditor,
    "phet-simulation": PhetSimulationEditor,
    plotter: PlotterEditor,
    "python-program": PythonProgramEditor,
    radio: RadioEditor,
    sorter: SorterEditor,
    table: TableEditor,
    video: VideoEditor,
};
