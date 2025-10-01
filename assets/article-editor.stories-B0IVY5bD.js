import{r as i,j as e,A as d,t as u}from"./iframe-CheXZuhR.js";import"./changeable-C91qCaHf.js";import"./article-renderer-CThTZZgG.js";import"./server-item-renderer-C2NfoI_F.js";import"./hints-renderer-3GvFGRdL.js";import{A as f}from"./article-editor-CAhoMEtB.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-C-7A7zZL.js";import"./components-BjKTsQCN.js";import"./icon-paths-I6aJaxFT.js";import"./editor-jsonify-B343wufQ.js";import"./blur-input-cLoqlZbm.js";import"./tex-error-view-CS8M0Nzi.js";import"./free-response-editor-DUW4NAve.js";import"./input-number-editor-GpKmLnpz.js";import"./Popper-BWzNNUCU.js";import"./label-image-editor-BowbCfad.js";import"./matcher-editor-C_C4V3mc.js";import"./number-line-editor-bRVfkoCE.js";import"./phet-simulation-editor-C3sU9yoN.js";import"./plotter-editor-48WHwYQe.js";import"./python-program-editor-CvRx3GN1.js";import"./sorter-editor-CIGWtehZ.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
