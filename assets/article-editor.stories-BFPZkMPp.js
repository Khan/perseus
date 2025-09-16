import{r as o,j as e,A as d}from"./iframe-SVyUCcyc.js";import"./changeable-tjsapl0P.js";import"./article-renderer-BsRViZ2E.js";import"./server-item-renderer-Cyy55jFd.js";import"./hints-renderer-DAyRzUb7.js";import{A as u}from"./article-editor-6_vgagCg.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DGqB_eZ_.js";import"./components-DgNvGnHV.js";import"./icon-paths-DhpAN4rN.js";import"./editor-jsonify-RGXOXhpi.js";import"./blur-input-C4eWWCEn.js";import"./tex-error-view-DofRtxFy.js";import"./free-response-editor-Bw6u8mY-.js";import"./input-number-editor-CCi0_NrJ.js";import"./Popper-B8pQzd5P.js";import"./label-image-editor-DbvuChbx.js";import"./matcher-editor-BGLB6zFT.js";import"./number-line-editor-DjcLRQrL.js";import"./phet-simulation-editor-CWHlZkLn.js";import"./plotter-editor-9DpcCpys.js";import"./python-program-editor-DKjkP19L.js";import"./sorter-editor-RlBCj2kg.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
