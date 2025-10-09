import{r as i,j as e,A as d,t as u}from"./iframe-B4MFOrNe.js";import"./changeable-DtBwBTI7.js";import"./article-renderer-BtS-_b7m.js";import"./server-item-renderer-C7ikXjBR.js";import"./hints-renderer-DuzBB90a.js";import{A as f}from"./article-editor-BVbHjFF0.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-dNfNLqVr.js";import"./components-CPSou5hc.js";import"./icon-paths-Dhm_PwaT.js";import"./editor-jsonify-BbXOErID.js";import"./blur-input-kuWnefIk.js";import"./tex-error-view-DlEl9_6-.js";import"./free-response-editor-C7PGyeJ1.js";import"./input-number-editor-Dl8FIZT9.js";import"./Popper-SvCHY_I4.js";import"./label-image-editor-DaBxU-kz.js";import"./form-wrapped-text-field-B0swxmXq.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-DpRYIEo3.js";import"./behavior-D3ucwNPX.js";import"./question-markers-DglYSDPF.js";import"./marker-mfaCga2M.js";import"./select-image-CrZBXrvG.js";import"./matcher-editor-C7QJqKZI.js";import"./number-line-editor-CYrIYo0L.js";import"./phet-simulation-editor-BxnQn3Tt.js";import"./plotter-editor-DKXb0INo.js";import"./python-program-editor-DBcaefo5.js";import"./sorter-editor-qGVJ7dtZ.js";g();const J={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function m(l){p(l.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:m,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
