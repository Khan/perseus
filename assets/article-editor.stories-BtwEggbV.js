import{r as o,j as e,A as d}from"./iframe-DrjN0KiU.js";import"./item-version-DmWfCCVr.js";import"./article-renderer-BKiMqq3C.js";import"./server-item-renderer-V1GNUfdc.js";import"./hints-renderer-_kTxEGTd.js";import{A as u}from"./article-editor-DruzLHc4.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-B10PtYlj.js";import"./components-D7lXpXuA.js";import"./icon-paths-DtUI8SEp.js";import"./image-editor-MQD4PN9m.js";import"./editor-jsonify-BSc1LtJ5.js";import"./blur-input-B1AizbKO.js";import"./tex-error-view-DHNrYjdc.js";import"./free-response-editor-CYA9ULvy.js";import"./input-number-editor-BiQL-W96.js";import"./Popper-u5VynpoL.js";import"./label-image-editor-DYxPS0T7.js";import"./matcher-editor-DexEiLZr.js";import"./number-line-editor-DYsi8aS6.js";import"./phet-simulation-editor-BMR_a3er.js";import"./plotter-editor-Sxpa9PXD.js";import"./python-program-editor-xRt37J2b.js";import"./sorter-editor-C5dR55Xk.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
