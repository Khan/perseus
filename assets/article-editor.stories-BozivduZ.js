import{r as o,j as e,A as d}from"./iframe-DlDnf9-s.js";import"./item-version-D3E88VMD.js";import"./article-renderer-DIyWS-wS.js";import"./server-item-renderer-CwVvRFT7.js";import"./hints-renderer-B9nCWAyP.js";import{A as u}from"./article-editor-BH2I6KhJ.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DXLEYjx_.js";import"./components-ByIpiyrH.js";import"./icon-paths-CoWD5ahj.js";import"./image-editor-CGLtVfTi.js";import"./editor-jsonify-D0B0CH53.js";import"./blur-input-Bm-YM0N9.js";import"./tex-error-view-BkcOuv_6.js";import"./free-response-editor-CIKf_hQU.js";import"./input-number-editor-eHvCi6ai.js";import"./Popper-vYJgUZky.js";import"./label-image-editor-8DfO9O_j.js";import"./matcher-editor-rnb6WX3R.js";import"./number-line-editor-9eQhWu-W.js";import"./phet-simulation-editor-Db-N4Oo6.js";import"./plotter-editor-BQgGYkgH.js";import"./python-program-editor-BLq3Rpmw.js";import"./sorter-editor-BEpLO_Ay.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
