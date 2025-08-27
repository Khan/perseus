import{r as o,j as e,A as d}from"./iframe-D2KAnoOA.js";import"./item-version-Dp0KLusJ.js";import"./article-renderer-Pa748M_9.js";import"./server-item-renderer-DssgNy2B.js";import"./hints-renderer-BJcB9iZ1.js";import{A as u}from"./article-editor-DD3hznDq.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CXUmeLHC.js";import"./components-DLYVUoyu.js";import"./icon-paths-CFp4DREn.js";import"./editor-jsonify-ChBiv5uO.js";import"./blur-input-B-a45PII.js";import"./tex-error-view-CAXhfRUC.js";import"./free-response-editor-dvgV1Spx.js";import"./input-number-editor-C4CTCMEF.js";import"./Popper-CBIvWEZo.js";import"./label-image-editor-B4llVHXI.js";import"./matcher-editor-Cmi3pMTe.js";import"./number-line-editor--v7XUidF.js";import"./phet-simulation-editor-BLkoYCDi.js";import"./plotter-editor-DRGrzWRs.js";import"./python-program-editor-Z3UpZJO_.js";import"./sorter-editor-CpNvdboV.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
