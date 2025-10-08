import{r as i,j as e,A as d,t as u}from"./iframe-Ub8Lz-nA.js";import"./changeable-CL99IcSK.js";import"./article-renderer-FDodx0VF.js";import"./server-item-renderer-CDoUwnZ-.js";import"./hints-renderer-BCDFA4Wp.js";import{A as f}from"./article-editor-BlBILc_I.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-C-2UFBHm.js";import"./components-B_sY-GQ1.js";import"./icon-paths-e4Gu2NxA.js";import"./editor-jsonify-aUbBnGx0.js";import"./blur-input-908bhVPT.js";import"./tex-error-view-DN5_tzIY.js";import"./free-response-editor-Dkmp8UHb.js";import"./input-number-editor-DtmLkBkk.js";import"./Popper-CAKBzENq.js";import"./label-image-editor-DLXybQIU.js";import"./form-wrapped-text-field-ChSTKyuD.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-DVvJrBQq.js";import"./behavior-C9gF5kpU.js";import"./question-markers-DJhFVN46.js";import"./marker-BOjPeNFK.js";import"./select-image-DwmlGuLJ.js";import"./matcher-editor-DhBusLqV.js";import"./number-line-editor-BsQUNNEZ.js";import"./phet-simulation-editor-B_NEnNHh.js";import"./plotter-editor-CTflFG_P.js";import"./python-program-editor-Dq1M_z2u.js";import"./sorter-editor-1C8qXmwM.js";g();const J={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function m(l){p(l.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:m,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
