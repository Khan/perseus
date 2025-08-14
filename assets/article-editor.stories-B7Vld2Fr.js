import{r as o,j as e,A as d}from"./iframe-jKogsWHw.js";import"./item-version-QeSbabpV.js";import"./article-renderer-du0l7qv8.js";import"./server-item-renderer-sgo6DPQc.js";import"./hints-renderer-7zdyCYE0.js";import{A as u}from"./article-editor-DfR3G1R6.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-sC3CogLh.js";import"./components-BtjWgLI6.js";import"./icon-paths-sBXXqQLS.js";import"./image-editor-2Bzo0uJh.js";import"./editor-jsonify-DGLDfYuq.js";import"./blur-input-5HIMxZ0s.js";import"./tex-error-view-DF2VFmyy.js";import"./free-response-editor-CHTBL74i.js";import"./input-number-editor-B403UsFS.js";import"./Popper-D9DrIKMk.js";import"./label-image-editor-C6E6EFzw.js";import"./matcher-editor-DQE2UweG.js";import"./number-line-editor-CeKDU1U3.js";import"./phet-simulation-editor-Io9bQ80f.js";import"./plotter-editor-BNfbJgeP.js";import"./python-program-editor-CPdGgely.js";import"./sorter-editor-C5cK0Aki.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const W=["Base"];export{t as Base,W as __namedExportsOrder,T as default};
