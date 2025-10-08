import{r as i,j as e,A as d,t as u}from"./iframe-DOfZlVjr.js";import"./changeable-C8a02MrP.js";import"./article-renderer-BJIOkDtn.js";import"./server-item-renderer-DPOkEb_3.js";import"./hints-renderer-Ccl0KZyf.js";import{A as f}from"./article-editor-CcaKzX_1.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-Cu5ba_Ac.js";import"./components-D5UuIuL6.js";import"./icon-paths-DASZV9Fa.js";import"./editor-jsonify-ChU0HLwG.js";import"./blur-input-D-0Hfg9G.js";import"./tex-error-view-CdO6egAq.js";import"./free-response-editor-CYq_onSy.js";import"./input-number-editor-DNtXPHFS.js";import"./Popper-x_F0upJK.js";import"./label-image-editor-Dl0gZ_Rt.js";import"./form-wrapped-text-field-DdaQ97f_.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-C4v8s9Vv.js";import"./behavior-akmrnglI.js";import"./question-markers-BaGUqLmi.js";import"./marker-B31Oju2o.js";import"./select-image-BuPQdPbc.js";import"./matcher-editor-BRQdhukT.js";import"./number-line-editor-DSze0aGY.js";import"./phet-simulation-editor-CH3dHG8-.js";import"./plotter-editor-D2434yxs.js";import"./python-program-editor-EMEkMTXg.js";import"./sorter-editor-D8vhm-Og.js";g();const J={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function m(l){p(l.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:m,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
            <ArticleEditor dependencies={testDependenciesV2} apiOptions={ApiOptions.defaults} imageUploader={() => {}} json={state} onChange={handleChange} previewURL="/perseus/frame" ref={articleEditorRef as any} />
        </>;
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const K=["Base"];export{t as Base,K as __namedExportsOrder,J as default};
