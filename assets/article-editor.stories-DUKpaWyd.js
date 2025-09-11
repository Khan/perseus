import{r as o,j as e,A as d}from"./iframe-CccAjlbi.js";import"./changeable-C63tudyJ.js";import"./article-renderer-D-zL4WtF.js";import"./server-item-renderer-CfQxDLcH.js";import"./hints-renderer-ShA7_x2U.js";import{A as u}from"./article-editor-yF0euqRI.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-ThkOKRyQ.js";import"./components-jECCB6qE.js";import"./icon-paths-Dx_0D5f6.js";import"./editor-jsonify-CsFiFJS0.js";import"./blur-input-ihGyyw-F.js";import"./tex-error-view-x4KA2Vqp.js";import"./free-response-editor-Bv2iZIY_.js";import"./input-number-editor-Co1kuBRk.js";import"./Popper-C1aFwbGo.js";import"./label-image-editor-DVZ1MBhD.js";import"./matcher-editor-CNxHl70e.js";import"./number-line-editor-HPpJsDS8.js";import"./phet-simulation-editor-BryksFh8.js";import"./plotter-editor-P-lWC0n0.js";import"./python-program-editor-BF0kwjpG.js";import"./sorter-editor-GLUd7FmQ.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
  const [state, setState] = useState();
  const articleEditorRef = useRef();
  function handleChange(value) {
    setState(value.json);
  }
  function serialize() {
    // eslint-disable-next-line no-console
    console.log((articleEditorRef.current as any).serialize());
  }
  return <>
            <button onClick={serialize}>Serialize</button>
            <hr />
            <ArticleEditor apiOptions={ApiOptions.defaults} imageUploader={() => {}} json={state} onChange={handleChange} previewURL="/perseus/frame" ref={articleEditorRef as any} />
        </>;
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const T=["Base"];export{t as Base,T as __namedExportsOrder,N as default};
