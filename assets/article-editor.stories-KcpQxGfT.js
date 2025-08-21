import{r as o,j as e,A as d}from"./iframe-ylzuHQd7.js";import"./item-version-bfiD-S_x.js";import"./article-renderer-CTwDMxW1.js";import"./server-item-renderer-BzzKWAcE.js";import"./hints-renderer-B-elKQj7.js";import{A as u}from"./article-editor-DlwZk1ja.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DiNp400S.js";import"./components-BzHcfJAx.js";import"./icon-paths-Bk9MkAwS.js";import"./image-editor-DP09616r.js";import"./editor-jsonify-BOE0GyU6.js";import"./blur-input-Bm4_op3u.js";import"./tex-error-view-qJHZRRve.js";import"./free-response-editor-CUUd50ud.js";import"./input-number-editor-BAd0wWUW.js";import"./Popper-Dp6umGlh.js";import"./label-image-editor-CgSK0SmV.js";import"./matcher-editor-DgJwtGTv.js";import"./number-line-editor-ghxNqZDT.js";import"./phet-simulation-editor-DUxlSoRv.js";import"./plotter-editor-C-zkNPkM.js";import"./python-program-editor-DiRZZtYf.js";import"./sorter-editor-CuQxE4vf.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
