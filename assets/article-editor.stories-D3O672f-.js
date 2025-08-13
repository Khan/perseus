import{r as o,j as e,A as d}from"./iframe-BFOhx_uE.js";import"./item-version-DpIHrGFD.js";import"./article-renderer-DdnounXR.js";import"./server-item-renderer-DyytJ9Oy.js";import"./hints-renderer-BIP9s6jC.js";import{A as u}from"./article-editor-CezzHFIe.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CO1zYM9H.js";import"./components-BakYDguZ.js";import"./icon-paths-ChJ5nohG.js";import"./image-editor-CaB5H6Bq.js";import"./editor-jsonify-NItUxMBJ.js";import"./blur-input-C2jSHl-1.js";import"./tex-error-view-BQImODvG.js";import"./free-response-editor-D5Q4-zsQ.js";import"./input-number-editor-CndXkGkU.js";import"./Popper-CBTn9sHG.js";import"./label-image-editor-DtTvwPLZ.js";import"./matcher-editor-BtN6tQXV.js";import"./number-line-editor-DQWr9x6F.js";import"./phet-simulation-editor-Bke2YzHm.js";import"./plotter-editor-BjBrX19U.js";import"./python-program-editor-BHZDdgGf.js";import"./sorter-editor-DMqvn_ji.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
