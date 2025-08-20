import{r as o,j as e,A as d}from"./iframe-BEfsupqa.js";import"./item-version-ph00bZgB.js";import"./article-renderer-B2jfDO5l.js";import"./server-item-renderer-W8xegBfs.js";import"./hints-renderer-CFeAJlbT.js";import{A as u}from"./article-editor-qAKh0enf.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DIfnRW5V.js";import"./components-L7wIjsrY.js";import"./icon-paths-DHA6BWUz.js";import"./image-editor-BfofKsv1.js";import"./editor-jsonify-DR4KtUX-.js";import"./blur-input-C5Rv1Aq_.js";import"./tex-error-view-B7AWUEka.js";import"./free-response-editor-BxXBbsBc.js";import"./input-number-editor-CXaX_tVe.js";import"./Popper-CDosTRkE.js";import"./label-image-editor-_TyiDZn7.js";import"./matcher-editor-CleYT57w.js";import"./number-line-editor-BiO9ByKB.js";import"./phet-simulation-editor-em6yy9RW.js";import"./plotter-editor-DHVDsDK9.js";import"./python-program-editor-Dytmpg7z.js";import"./sorter-editor-DJ77rKoE.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
