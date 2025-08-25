import{r as o,j as e,A as d}from"./iframe-bYNC6Lwg.js";import"./item-version-D5JRkau7.js";import"./article-renderer-E4dguY-E.js";import"./server-item-renderer-DoW4vH0N.js";import"./hints-renderer-CkSFGX70.js";import{A as u}from"./article-editor-Kp2kY8FJ.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-4uCQUNJQ.js";import"./components-3BCMbA_z.js";import"./icon-paths-Bz4rTmMu.js";import"./editor-jsonify-50GZQqbr.js";import"./blur-input-C-ggIJXR.js";import"./tex-error-view-DUp4Rs2Z.js";import"./free-response-editor-CQjPCpPU.js";import"./input-number-editor-xgnSdNTV.js";import"./Popper-B5gHDErI.js";import"./label-image-editor-DGXtpRa4.js";import"./matcher-editor-DZ3AzzsY.js";import"./number-line-editor-KPGYgiaJ.js";import"./phet-simulation-editor-Bs9hpnVT.js";import"./plotter-editor-62HbEdlF.js";import"./python-program-editor-DIfLPIFh.js";import"./sorter-editor-C3xUdqf4.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
