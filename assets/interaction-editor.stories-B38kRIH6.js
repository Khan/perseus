import{r as n,j as g}from"./iframe-DPME5Wfc.js";import{I as o}from"./interaction-editor-Bs-ruuPW.js";import"./item-version-Re2Bf6tc.js";import"./article-renderer-CLC0QY8e.js";import"./server-item-renderer-DYWMp5OE.js";import"./hints-renderer-CVWgBD1c.js";import"./editor-jsonify-kno1xt_7.js";import"./components-5GyRNmEy.js";import"./icon-paths-Cfjy_uoj.js";const D={title:"Widgets/Interaction/Editor Demo",component:o,tags:["!dev"],parameters:{docs:{description:{component:"An editor for adding an interaction widget that allows users to engage with interactive content."}}}},e=l=>{const[i,m]=n.useState(),[p,c]=n.useState();function d(t){t.graph&&c(t.graph),t.elements&&m(t.elements)}return g.jsx(o,{onChange:d,elements:i,graph:p})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,a,s;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  const [elements, setElements] = useState();
  const [graph, setGraph] = useState();
  function handleChange(next) {
    if (next.graph) {
      setGraph(next.graph);
    }
    if (next.elements) {
      setElements(next.elements);
    }
  }
  return <InteractionEditor onChange={handleChange} elements={elements} graph={graph} />;
}`,...(s=(a=e.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const j=["Default"];export{e as Default,j as __namedExportsOrder,D as default};
