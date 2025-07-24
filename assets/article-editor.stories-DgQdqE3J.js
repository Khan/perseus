import{r as o,j as t,A as d}from"./iframe-CNFYEH7L.js";import"./item-version-D9gT7eGP.js";import"./article-renderer-B9ordAQy.js";import"./server-item-renderer-Cqj5d7ud.js";import"./hints-renderer-DoIG0YVZ.js";import{A as u}from"./article-editor-BmZsIzzb.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-BmVTb_FJ.js";import"./components-B92S2sV4.js";import"./device-framer-Ddb5JNwL.js";import"./editor-3DXYDt0w.js";import"./tex-error-view-DvO7LgBX.js";import"./icon-paths-Cfjy_uoj.js";import"./categorizer-editor-CZYk73lF.js";import"./editor-jsonify-DoZIPuGg.js";import"./blur-input-C8XtteKJ.js";import"./definition-editor-BVCz1M0m.js";import"./dropdown-editor-7ucYpVys.js";import"./explanation-editor-DmPEnZX_.js";import"./expression-editor-DOvJzHfW.js";import"./free-response-editor-CgMMzQwl.js";import"./interaction-editor-DgvR60OL.js";import"./image-editor-FEuEL50C.js";import"./input-number-editor-Wu8PwE2O.js";import"./Popper-D-R6A61F.js";import"./numeric-input-editor-q9WqgKRV.js";import"./label-image-editor-DnfS28hr.js";import"./matcher-editor-CHojUm_9.js";import"./number-line-editor-CgH9c5wS.js";import"./phet-simulation-editor-BhQRFt1j.js";import"./plotter-editor-C74pau3d.js";import"./python-program-editor-B2K9gcTq.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-BkuLw4WE.js";f();const Q={title:"Editors/ArticleEditor"},e=()=>{const[a,p]=o.useState(),r=o.useRef();function m(c){p(c.json)}function l(){console.log(r.current.serialize())}return t.jsxs(t.Fragment,{children:[t.jsx("button",{onClick:l,children:"Serialize"}),t.jsx("hr",{}),t.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:m,previewURL:"/perseus/frame",ref:r})]})};e.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const V=["Base"];export{e as Base,V as __namedExportsOrder,Q as default};
