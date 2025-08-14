import{r as o,j as e,A as d}from"./iframe-Dz8KzRm4.js";import"./item-version-BXsKsFvS.js";import"./article-renderer-kbA3fLu8.js";import"./server-item-renderer-BDsffwgY.js";import"./hints-renderer-eTfFgFXW.js";import{A as u}from"./article-editor-BUpXGwPz.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DkKk0jop.js";import"./components-CgqU46-l.js";import"./icon-paths-BX_ctPJB.js";import"./image-editor-DKF_AwTK.js";import"./editor-jsonify-d7sAC4H6.js";import"./blur-input-BG6jBxGJ.js";import"./tex-error-view-DBwB0Olo.js";import"./free-response-editor-Cnv5bwdC.js";import"./input-number-editor-CQI1tVn8.js";import"./Popper-4QAtaXJE.js";import"./label-image-editor-CzJhi-BZ.js";import"./matcher-editor-Cjbsc1tW.js";import"./number-line-editor-R_0cNRIh.js";import"./phet-simulation-editor-D1-a2mII.js";import"./plotter-editor-6q2lvyez.js";import"./python-program-editor-CnHJ0EQU.js";import"./sorter-editor-DmDbxS2I.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
