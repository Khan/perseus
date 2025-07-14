import{r as n,j as l}from"./iframe-CFuaP2rl.js";import{I as h}from"./interaction-editor-BRQq0HDQ.js";import"./item-version-dbi47DrE.js";import"./article-renderer-CWbQ3RaI.js";import"./server-item-renderer-W-hRuRM8.js";import"./hints-renderer-Cq53Ebn7.js";import"./editor-jsonify-gBXhRDO8.js";import"./graph-settings-Da9IBp_E.js";import"./components-DpoOYy7y.js";import"./icon-paths-BU5otBoc.js";const D={title:"PerseusEditor/Widgets/Interaction Editor"},e=d=>{const[o,i]=n.useState(),[m,p]=n.useState();function c(t){t.graph&&p(t.graph),t.elements&&i(t.elements)}return l.jsx(h,{onChange:c,elements:o,graph:m})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var r,s,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
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
