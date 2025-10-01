import{r as i,j as e,A as d,t as u}from"./iframe-BgmivyAp.js";import"./changeable-ZO_UNrxn.js";import"./article-renderer-DAAhF_kA.js";import"./server-item-renderer-DiU1TMno.js";import"./hints-renderer-DF5f2Anf.js";import{A as f}from"./article-editor-BhLL20Yu.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-C9Wu-gvT.js";import"./components-89Szg_er.js";import"./icon-paths-CpmlTXGK.js";import"./editor-jsonify-GgSCjj4O.js";import"./blur-input-DM-YuRPe.js";import"./tex-error-view-DrT1x___.js";import"./free-response-editor-DvMPaUZY.js";import"./input-number-editor-DFOmgMCy.js";import"./Popper-ibKjs24X.js";import"./label-image-editor-bvWb3tME.js";import"./matcher-editor-vIbfDIWN.js";import"./number-line-editor-Bl-Bqlg4.js";import"./phet-simulation-editor-vQ7mn968.js";import"./plotter-editor-Cfcc6ZgX.js";import"./python-program-editor-Djls18Gx.js";import"./sorter-editor-B2GXM1Wg.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
            <ArticleEditor dependencies={testDependenciesV2} apiOptions={ApiOptions.defaults} imageUploader={() => {}} json={state} onChange={handleChange} previewURL="/perseus/frame" ref={articleEditorRef as any} />
        </>;
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const N=["Base"];export{t as Base,N as __namedExportsOrder,I as default};
