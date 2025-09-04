import{r as o,j as e,A as d}from"./iframe-F3_oqL7O.js";import"./item-version-CQp-Cohu.js";import"./article-renderer-CltmiXsX.js";import"./server-item-renderer-BcfJF0Ip.js";import"./hints-renderer-B9I7YfBe.js";import{A as u}from"./article-editor-CAuBUy1e.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-BxrHfDNt.js";import"./components-Dc5fVOuB.js";import"./icon-paths-C01l9r4c.js";import"./editor-jsonify-BV6JefrH.js";import"./blur-input-D3_0NiMk.js";import"./tex-error-view-DR77XQwl.js";import"./free-response-editor-Qo8bx7cV.js";import"./input-number-editor-BewCqVa5.js";import"./Popper-Bo8AjKu1.js";import"./label-image-editor-B0SrBMYy.js";import"./matcher-editor-CxSpJb4_.js";import"./number-line-editor-DmRqc-ar.js";import"./phet-simulation-editor-CKs7obJ8.js";import"./plotter-editor-ABrbZ293.js";import"./python-program-editor-DWM08gwH.js";import"./sorter-editor-O4F988lf.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
