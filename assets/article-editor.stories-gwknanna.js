import{r as o,j as e,A as d}from"./iframe-bccoluGS.js";import"./item-version-Cpe_E2y6.js";import"./article-renderer-DdKx7jP_.js";import"./server-item-renderer-mJ-Fy2sG.js";import"./hints-renderer-DOc2w8Uu.js";import{A as u}from"./article-editor-C62zHr43.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-ns1mKD13.js";import"./components-BJg_2mkB.js";import"./icon-paths-Dy2lCHgm.js";import"./image-editor-C-VOUyJj.js";import"./editor-jsonify-Cpd2rRmH.js";import"./blur-input-CmrpRJSI.js";import"./tex-error-view-Bd9pPX-T.js";import"./free-response-editor-BzLVxjVy.js";import"./input-number-editor-ClnRW5ex.js";import"./Popper-C8ssJ_Va.js";import"./label-image-editor-TptKQ7T9.js";import"./matcher-editor-B7RX_9mX.js";import"./number-line-editor-DjYzAYSm.js";import"./phet-simulation-editor-CpPlJ0Kw.js";import"./plotter-editor-cQUXtG5I.js";import"./python-program-editor-CVwfy69U.js";import"./sorter-editor-DIXFSCqH.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
