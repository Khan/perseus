import{r as o,j as e,A as d}from"./iframe-k7awQKLv.js";import"./item-version-Dd-JmDTi.js";import"./article-renderer-B-5XwXfG.js";import"./server-item-renderer-DkMrN3ad.js";import"./hints-renderer-CBZ9zIzo.js";import{A as u}from"./article-editor-qC0cWuNz.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-dLEEBaN4.js";import"./components-CiMtDWZf.js";import"./icon-paths-Dl7Ip3eQ.js";import"./image-editor-Dz4QqJDJ.js";import"./editor-jsonify-BrozjJQ4.js";import"./blur-input-Cqld0Gpp.js";import"./tex-error-view-D3JGVMbz.js";import"./free-response-editor-BFZLsrFi.js";import"./input-number-editor-DFVNMq0e.js";import"./Popper-Bv7zZx7c.js";import"./label-image-editor-DSy-brbq.js";import"./matcher-editor-BIU9b-FS.js";import"./number-line-editor-DORbJP6D.js";import"./phet-simulation-editor-CMZJ3nLW.js";import"./plotter-editor-5r1qHTF2.js";import"./python-program-editor-COvV1zg7.js";import"./sorter-editor-B96-WOy0.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
