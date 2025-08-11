import{r as o,j as e,A as d}from"./iframe-CrThTwIf.js";import"./item-version-B3SDESbL.js";import"./article-renderer-BDBd00io.js";import"./server-item-renderer-B3OBiMF2.js";import"./hints-renderer-DenSrkW5.js";import{A as u}from"./article-editor-DdPIc4r6.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DN-F-8hE.js";import"./components-BSmwcjxJ.js";import"./icon-paths-BF14P1V2.js";import"./image-editor-BQkyhiha.js";import"./editor-jsonify-DZ6iw_RM.js";import"./blur-input-B1Bu2OOc.js";import"./tex-error-view-B7565g9e.js";import"./free-response-editor-CdgePqER.js";import"./input-number-editor-D93aeWf-.js";import"./Popper-XpUGNV3d.js";import"./label-image-editor-DoASivsN.js";import"./matcher-editor-BHn7mLY1.js";import"./number-line-editor-CXZW4ZML.js";import"./phet-simulation-editor-CL5O3rZ0.js";import"./plotter-editor-qlbAYlkL.js";import"./python-program-editor-YlwBWbjb.js";import"./sorter-editor-DKGjiLGV.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
