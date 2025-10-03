import{r as i,j as e,A as d,t as u}from"./iframe-CnVpoeZy.js";import"./changeable-Cm3EMqM_.js";import"./article-renderer-CTsZBa-i.js";import"./server-item-renderer-CBnujpVD.js";import"./hints-renderer-Ba8FYBgn.js";import{A as f}from"./article-editor-DkvWOiGp.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-CeVoNCKW.js";import"./components-CpgjJa06.js";import"./icon-paths-CpjeqHf_.js";import"./editor-jsonify-BUWBs-5n.js";import"./blur-input-D5aA1pIH.js";import"./tex-error-view-ScjmTRh4.js";import"./free-response-editor-DBiLMf8S.js";import"./input-number-editor-BWnLGMtd.js";import"./Popper-2OtnpGcr.js";import"./label-image-editor-CYL2N_C9.js";import"./matcher-editor-Cuv7dGFB.js";import"./number-line-editor-DCxSUhto.js";import"./phet-simulation-editor-GRNyQzu0.js";import"./plotter-editor-CBv5KPNg.js";import"./python-program-editor-5oPIC9IT.js";import"./sorter-editor-CH7PyEHR.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const N=["Base"];export{t as Base,N as __namedExportsOrder,I as default};
