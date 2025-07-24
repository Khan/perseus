import{r as n,j as g}from"./iframe-xqgRcQf_.js";import{I as o}from"./interaction-editor-DDKr_Abg.js";import"./item-version-CrkFurkW.js";import"./article-renderer-Div8t3tJ.js";import"./server-item-renderer-CB58Q2z9.js";import"./hints-renderer-B51OzCed.js";import"./editor-jsonify-B0uKPUzN.js";import"./components-BxL5YMMF.js";import"./icon-paths-Cfjy_uoj.js";const D={title:"Widgets/Interaction/Editor Demo",component:o,tags:["!dev"],parameters:{docs:{description:{component:"An editor for adding an interaction widget that allows users to engage with interactive content."}}}},e=l=>{const[i,m]=n.useState(),[p,c]=n.useState();function d(t){t.graph&&c(t.graph),t.elements&&m(t.elements)}return g.jsx(o,{onChange:d,elements:i,graph:p})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,a,s;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
