import{r as o,j as e,A as d}from"./iframe-4CcKLhz6.js";import"./item-version-Cmcht_BC.js";import"./article-renderer-HXUk3sSk.js";import"./server-item-renderer-B43KbtSK.js";import"./hints-renderer-Dd6-WvSp.js";import{A as u}from"./article-editor-Dd-gMees.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DmHTrCcx.js";import"./components-C1X24_9F.js";import"./icon-paths-DXF1Z7by.js";import"./image-editor-DJ_yLfUW.js";import"./editor-jsonify-Z0uEtY_x.js";import"./blur-input-BIDKS_3v.js";import"./tex-error-view-Ba63GcF7.js";import"./free-response-editor-BRgyNqE8.js";import"./input-number-editor-CF9Wazu8.js";import"./Popper-aSmBR6BO.js";import"./label-image-editor-CgB6ghNu.js";import"./matcher-editor-Bkr9ie0s.js";import"./number-line-editor-xLNF0ZfO.js";import"./phet-simulation-editor-0cEBcNgJ.js";import"./plotter-editor-CJVDbUNi.js";import"./python-program-editor-DjYcIKuP.js";import"./sorter-editor-DUhWKtNd.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
