import{r as o,j as e,A as d}from"./iframe-BgqLstan.js";import"./item-version-wGHmGDpX.js";import"./article-renderer-y5FteWi3.js";import"./server-item-renderer-CQc1DzR0.js";import"./hints-renderer-BtqilCip.js";import{A as u}from"./article-editor-BAqpw-D5.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CKj1SZBs.js";import"./components-PSqKATiQ.js";import"./icon-paths-CbvR5ame.js";import"./image-editor-CgJqrCij.js";import"./editor-jsonify-8DcjuFS7.js";import"./blur-input-B8UDUINl.js";import"./tex-error-view-CuqrKAbQ.js";import"./free-response-editor-J3VJIh_G.js";import"./input-number-editor-7kEN8JsZ.js";import"./Popper-CiFe_WXQ.js";import"./label-image-editor-BrGuUUVV.js";import"./matcher-editor-CyI0IZcH.js";import"./number-line-editor-D2gtXJpq.js";import"./phet-simulation-editor-ClRSwuRF.js";import"./plotter-editor-Cw0dzPv3.js";import"./python-program-editor-DXsFI28d.js";import"./sorter-editor-SRextqym.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
