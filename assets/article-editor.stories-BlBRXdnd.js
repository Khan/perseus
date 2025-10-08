import{r as i,j as e,A as d,t as u}from"./iframe-BWhbci3x.js";import"./changeable-_xhdAGar.js";import"./article-renderer-D0nBC1GM.js";import"./server-item-renderer-DXpZUK8c.js";import"./hints-renderer-FKag-jWl.js";import{A as f}from"./article-editor-ENsYCAfd.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-D3pFAQHa.js";import"./components-BId1tQhe.js";import"./icon-paths-C_r4rhAg.js";import"./editor-jsonify-D-Xz_8Hy.js";import"./blur-input-DM5Wq0Dz.js";import"./tex-error-view-y3eJDZ8L.js";import"./free-response-editor-uPZ0tpKf.js";import"./input-number-editor-BV51TinY.js";import"./Popper-lEvsE7Qs.js";import"./label-image-editor-B8-Y_QHK.js";import"./form-wrapped-text-field-BD-9rBBU.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-CcW3L8ZC.js";import"./behavior-B1EXu387.js";import"./question-markers-DGbmu8fN.js";import"./marker-Beog4D9A.js";import"./select-image-Bwiv4j_7.js";import"./matcher-editor-DHAPVaIu.js";import"./number-line-editor-A1ribPdb.js";import"./phet-simulation-editor-CYNo0o5O.js";import"./plotter-editor-DtOeQFn-.js";import"./python-program-editor-C2I0mLs1.js";import"./sorter-editor-B2uELGie.js";g();const J={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function m(l){p(l.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:m,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
