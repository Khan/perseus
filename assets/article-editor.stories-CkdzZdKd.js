import{r as o,j as e,A as d}from"./iframe-CoIWeCME.js";import"./item-version-BFeq9Vp6.js";import"./article-renderer-CPv5VZM_.js";import"./server-item-renderer-D8eDYuOH.js";import"./hints-renderer-DzR97Dj1.js";import{A as u}from"./article-editor-C7wZST8y.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-B8fLUVJr.js";import"./components-DRWNInlp.js";import"./icon-paths-BumhTajt.js";import"./image-editor-ByUY1qrX.js";import"./editor-jsonify-DilCfWH7.js";import"./blur-input-BM0KHhLS.js";import"./tex-error-view-d7F8HJkt.js";import"./free-response-editor-JQ06RusP.js";import"./input-number-editor-mSVIg226.js";import"./Popper-C14ggVEq.js";import"./label-image-editor-DYcgIX_0.js";import"./matcher-editor-Fbkc6eng.js";import"./number-line-editor-BqOA7KUB.js";import"./phet-simulation-editor-D9JGHWjf.js";import"./plotter-editor-CnrllDx3.js";import"./python-program-editor-9rHPnAMu.js";import"./sorter-editor-jUdmCmNP.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
