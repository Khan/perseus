import{r as o,j as e,A as d}from"./iframe-Cq1qZd-C.js";import"./item-version-YfG3076y.js";import"./article-renderer-BFQahaf4.js";import"./server-item-renderer-lCTObLHO.js";import"./hints-renderer-e3gh3eWK.js";import{A as u}from"./article-editor-aGkEkHMV.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-G6KD6DT2.js";import"./components-0NBzS_6m.js";import"./icon-paths-Bss_NZCX.js";import"./image-editor-BRUTstWu.js";import"./editor-jsonify-K0gyFrxQ.js";import"./blur-input-C0uyX17y.js";import"./tex-error-view-Ci63lwHS.js";import"./free-response-editor-PeOK3tQy.js";import"./input-number-editor-Dx-gmQFK.js";import"./Popper-CJMLFt6b.js";import"./label-image-editor-ntZOD2BQ.js";import"./matcher-editor-CtDXsXWt.js";import"./number-line-editor-7QhgFiXj.js";import"./phet-simulation-editor-DUz78mNg.js";import"./plotter-editor-JJhqBc03.js";import"./python-program-editor-L21cQDXn.js";import"./sorter-editor-BKi-Br4n.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
