import{r as n,j as l}from"./iframe-Cn2sr9XL.js";import{I as h}from"./interaction-editor-DUz4lqlV.js";import"./item-version-CTN-kA__.js";import"./article-renderer-Cb_B2GZZ.js";import"./server-item-renderer-Ba-JUrlz.js";import"./hints-renderer-Dp6eZWrp.js";import"./editor-jsonify-MeD1TNub.js";import"./graph-settings-CwcHmjTB.js";import"./components-DoZqPXTQ.js";import"./icon-paths-BU5otBoc.js";const D={title:"PerseusEditor/Widgets/Interaction Editor"},e=d=>{const[o,i]=n.useState(),[m,p]=n.useState();function c(t){t.graph&&p(t.graph),t.elements&&i(t.elements)}return l.jsx(h,{onChange:c,elements:o,graph:m})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,s,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
