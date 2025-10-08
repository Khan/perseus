import{r as i,j as e,A as d,t as u}from"./iframe-DuX_q2ht.js";import"./changeable-DoSknzv0.js";import"./article-renderer-D_MBp4KY.js";import"./server-item-renderer-ZfRv15L8.js";import"./hints-renderer-B9f5vdIc.js";import{A as f}from"./article-editor-l9Od8ik7.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-BbgDSYGE.js";import"./components-DrprnScV.js";import"./icon-paths-CiUcehTY.js";import"./editor-jsonify-CyB_d4CV.js";import"./blur-input-8Yw3JQf0.js";import"./tex-error-view-C7k0OCVW.js";import"./free-response-editor-lxBd8ujh.js";import"./input-number-editor-BpvNZg3s.js";import"./Popper-DXKIdPnX.js";import"./label-image-editor-DAWn3WEl.js";import"./form-wrapped-text-field-BgAULY_E.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-D-9jSk2Z.js";import"./behavior-CoauACOq.js";import"./question-markers-Dxf3N8CC.js";import"./marker-adnWe0U9.js";import"./select-image-BLDCTeE8.js";import"./matcher-editor-B64snCzU.js";import"./number-line-editor-CBUQXjmq.js";import"./phet-simulation-editor-BWiJEulT.js";import"./plotter-editor-Be7zIuS6.js";import"./python-program-editor-DbfmwSW2.js";import"./sorter-editor-3Lh2tMni.js";g();const J={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function m(l){p(l.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:m,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
