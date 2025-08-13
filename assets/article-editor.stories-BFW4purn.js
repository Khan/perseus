import{r as o,j as e,A as d}from"./iframe-ChI2rGpr.js";import"./item-version-DEGaBoBe.js";import"./article-renderer-BdJLIWK5.js";import"./server-item-renderer-D0Wpmdv8.js";import"./hints-renderer-Bk-2NsLT.js";import{A as u}from"./article-editor-D6xUwz17.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-BI6GiQmL.js";import"./components-DXaeejgW.js";import"./icon-paths-DKy0EYqy.js";import"./image-editor-Bsulv0_L.js";import"./editor-jsonify-BKdoDEz1.js";import"./blur-input-DBIkz-p-.js";import"./tex-error-view-AXCnO0hm.js";import"./free-response-editor-1eBkf3Fe.js";import"./input-number-editor-BOIA-Nko.js";import"./Popper-r57raGIK.js";import"./label-image-editor-Dh4MD0ve.js";import"./matcher-editor-DJxeafkq.js";import"./number-line-editor-VeWlUQZI.js";import"./phet-simulation-editor-Ais7dBqt.js";import"./plotter-editor-BHYRbhjo.js";import"./python-program-editor-rmNzoRvZ.js";import"./sorter-editor-D_Z3fqRR.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
