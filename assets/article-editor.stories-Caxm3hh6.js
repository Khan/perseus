import{r as o,j as e,A as d}from"./iframe-CWbLiuEj.js";import"./item-version-DYM8-LkM.js";import"./article-renderer-BTpghWNF.js";import"./server-item-renderer-D4U8qoBQ.js";import"./hints-renderer-DtG_3a8d.js";import{A as u}from"./article-editor-Dy_Va-jH.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-Bv_VwZ2-.js";import"./components-Dgf3YHnx.js";import"./icon-paths-ppH2HIeQ.js";import"./image-editor-wNnu0oWj.js";import"./editor-jsonify-B5rchHWU.js";import"./blur-input-DFy_IUd9.js";import"./tex-error-view-B5iYSAdE.js";import"./free-response-editor-CBaZ5J7s.js";import"./input-number-editor-BmUXbo7g.js";import"./Popper-DOGKLwxT.js";import"./label-image-editor-BV1urzRn.js";import"./matcher-editor-DvTuqBDG.js";import"./number-line-editor-BuPT9Ntz.js";import"./phet-simulation-editor-CJCLAP1J.js";import"./plotter-editor-B6hRMdWP.js";import"./python-program-editor-D10ubNWR.js";import"./sorter-editor-DRSEhyyJ.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
