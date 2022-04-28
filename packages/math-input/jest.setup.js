const {StyleSheetTestUtils} = require("aphrodite");

const Enzyme = require("enzyme");
const EnzymeAdapter = require("enzyme-adapter-react-16");

StyleSheetTestUtils.suppressStyleInjection();

Enzyme.configure({adapter: new EnzymeAdapter()});
