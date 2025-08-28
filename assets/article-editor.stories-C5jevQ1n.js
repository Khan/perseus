import{r as o,j as e,A as d}from"./iframe-h3wPYy2U.js";import"./item-version-CsxY5F0R.js";import"./article-renderer-gwOQ4R99.js";import"./server-item-renderer-D11EKYQ4.js";import"./hints-renderer-Za6FTFO9.js";import{A as u}from"./article-editor-BcC1so-z.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CVrQk9_t.js";import"./components-BhVmh9kn.js";import"./icon-paths-0RwFaSwb.js";import"./editor-jsonify-CqMrvSIN.js";import"./blur-input-Y5Bpvt1h.js";import"./tex-error-view-DJ8zIg0P.js";import"./free-response-editor-D6T7pu0h.js";import"./input-number-editor-BkF1biK0.js";import"./Popper-Czc7kgOG.js";import"./label-image-editor-srqe4D9v.js";import"./matcher-editor-Ci1pobPe.js";import"./number-line-editor-lMmk3VDM.js";import"./phet-simulation-editor-CdQIofZd.js";import"./plotter-editor-m9w3_Smw.js";import"./python-program-editor-CG4OKZ68.js";import"./sorter-editor-B3U1Vz25.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
