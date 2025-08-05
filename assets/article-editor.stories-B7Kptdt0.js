import{r as o,j as e,A as d}from"./iframe--7knIPZ2.js";import"./item-version-jGrWTSNR.js";import"./article-renderer-DNX3JtxN.js";import"./server-item-renderer-Ca5hOWrD.js";import"./hints-renderer-CjtkJPkO.js";import{A as u}from"./article-editor-A2XutKFB.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-C3hrfwBb.js";import"./components-DxuF03k_.js";import"./icon-paths-CBiSkSPh.js";import"./image-editor-B4z6Ft18.js";import"./editor-jsonify-BnKs_T5B.js";import"./blur-input-5x8Zetbl.js";import"./tex-error-view-40LawmRZ.js";import"./free-response-editor-BysCLYIb.js";import"./input-number-editor-CaFr0VE2.js";import"./Popper-DUO2S7wb.js";import"./label-image-editor-BwHqnw33.js";import"./matcher-editor-BYw3-iH_.js";import"./number-line-editor-B6jqWxwa.js";import"./phet-simulation-editor-DwlW53Dy.js";import"./plotter-editor-BaJ-b51S.js";import"./python-program-editor-BGguPV3R.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-CFclJp-b.js";f();const W={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const q=["Base"];export{t as Base,q as __namedExportsOrder,W as default};
