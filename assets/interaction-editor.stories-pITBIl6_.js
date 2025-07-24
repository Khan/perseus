import{r as n,j as l}from"./iframe-B7rrjhX-.js";import{I as h}from"./interaction-editor-C2n_l6kd.js";import"./item-version-C71bDQee.js";import"./article-renderer-CKpNj7Wm.js";import"./server-item-renderer-CzC3QTOf.js";import"./hints-renderer-B1JL43nH.js";import"./editor-jsonify-DIeMlM0a.js";import"./graph-settings-BzVTGnMq.js";import"./components-Dr_1lztj.js";import"./icon-paths-BU5otBoc.js";const D={title:"PerseusEditor/Widgets/Interaction Editor"},e=d=>{const[o,i]=n.useState(),[m,p]=n.useState();function c(t){t.graph&&p(t.graph),t.elements&&i(t.elements)}return l.jsx(h,{onChange:c,elements:o,graph:m})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,s,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
}`,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const G=["Default"];export{e as Default,G as __namedExportsOrder,D as default};
