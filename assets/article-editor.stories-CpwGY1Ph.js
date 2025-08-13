import{r as o,j as e,A as d}from"./iframe--THAEHEv.js";import"./item-version-Ba6OfHyc.js";import"./article-renderer-D9_4gOZR.js";import"./server-item-renderer-JprrZMv0.js";import"./hints-renderer-C_0p0GFr.js";import{A as u}from"./article-editor-D0DlQ9e0.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-B5SzFAkO.js";import"./components-D2denQi1.js";import"./icon-paths-mPGI_fLy.js";import"./image-editor-alKMSCpd.js";import"./editor-jsonify-DPyqGhw6.js";import"./blur-input-CEml3Lyt.js";import"./tex-error-view-BcxF8znG.js";import"./free-response-editor-DO-460v4.js";import"./input-number-editor-CJP0mCR7.js";import"./Popper-9QrUS_4n.js";import"./label-image-editor-C1Zuw133.js";import"./matcher-editor-fJv7k0-Y.js";import"./number-line-editor-CC5TTEgl.js";import"./phet-simulation-editor-CEGaGvXS.js";import"./plotter-editor-DAfU8htq.js";import"./python-program-editor-BnrHLUrN.js";import"./sorter-editor-QNjscWi6.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
