import{r as o,j as e,A as d}from"./iframe-uzHcYCYA.js";import"./changeable-B2w2BFwG.js";import"./article-renderer-4-q2xvQd.js";import"./server-item-renderer-BVk1JHoz.js";import"./hints-renderer-CEzxYndO.js";import{A as u}from"./article-editor-Cx7XJPgJ.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-Dua1RWpW.js";import"./components-DYvSC_-z.js";import"./icon-paths-CTDXG4an.js";import"./editor-jsonify-Bn4QN6oX.js";import"./blur-input-DmtitOM9.js";import"./tex-error-view-lXL5mG2i.js";import"./free-response-editor-DOlZ6M2X.js";import"./input-number-editor-CSz27eA6.js";import"./Popper-DlGDGz0c.js";import"./label-image-editor-D4NG0ztA.js";import"./matcher-editor-y3D49Wu4.js";import"./number-line-editor-F_sKVtUB.js";import"./phet-simulation-editor-Yh-QV-ls.js";import"./plotter-editor-CZawkXrv.js";import"./python-program-editor-BP80zaYo.js";import"./sorter-editor-DaiqHjso.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const T=["Base"];export{t as Base,T as __namedExportsOrder,N as default};
