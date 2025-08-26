import{r as o,j as e,A as d}from"./iframe-BiGC5sW5.js";import"./item-version-yQFAuGb2.js";import"./article-renderer-9SBKnsn3.js";import"./server-item-renderer-Dv931R2x.js";import"./hints-renderer-DOe55Um_.js";import{A as u}from"./article-editor-CDgG5ipT.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-D6W3flYL.js";import"./components-FTGlurjV.js";import"./icon-paths-Dew99ilD.js";import"./editor-jsonify-mBnSCGsv.js";import"./blur-input-De9zWWgf.js";import"./tex-error-view-C9Q-PFor.js";import"./free-response-editor-QQgWs1RW.js";import"./input-number-editor-3yi4G5RC.js";import"./Popper-DyYdIu0t.js";import"./label-image-editor-CvMvz6l0.js";import"./matcher-editor-Blh7xI4X.js";import"./number-line-editor-oBGnSGQ3.js";import"./phet-simulation-editor-BHCyayT4.js";import"./plotter-editor-BQ95foHv.js";import"./python-program-editor-B5FR9-EV.js";import"./sorter-editor-DCXMRsnP.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
