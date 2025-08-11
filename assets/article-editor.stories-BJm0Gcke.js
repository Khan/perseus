import{r as o,j as e,A as d}from"./iframe-D2oRCX8z.js";import"./item-version-DrMsoJZF.js";import"./article-renderer-BhlE6S6L.js";import"./server-item-renderer-Dq2U-fJ5.js";import"./hints-renderer-CbxkIekr.js";import{A as u}from"./article-editor-CcoJAMXA.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-BTPHHkKv.js";import"./components-CeoS0XNL.js";import"./icon-paths-BxaW5wQN.js";import"./image-editor-BK1D3TjD.js";import"./editor-jsonify-CGO2Ai66.js";import"./blur-input-C6S45jMK.js";import"./tex-error-view-BaWaYNPs.js";import"./free-response-editor-DmQuzt2m.js";import"./input-number-editor-CsZBok-Z.js";import"./Popper-EhsOCtb9.js";import"./label-image-editor-3UCh4kx3.js";import"./matcher-editor-DrW4undt.js";import"./number-line-editor-CFDvfjAu.js";import"./phet-simulation-editor-BtYuIVYp.js";import"./plotter-editor-IUqyDPql.js";import"./python-program-editor-CQQ-tzrF.js";import"./sorter-editor-CFwkaJBn.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
