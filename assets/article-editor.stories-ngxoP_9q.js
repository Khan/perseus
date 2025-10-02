import{r as i,j as e,A as d,t as u}from"./iframe-Cfd3uF98.js";import"./changeable-DFUiPGA2.js";import"./article-renderer-CSHRBLjX.js";import"./server-item-renderer-BIZB3FlZ.js";import"./hints-renderer-CXTDNOsp.js";import{A as f}from"./article-editor-XifzCzIG.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-OFDEZ2Kr.js";import"./components-CelBgUek.js";import"./icon-paths-BErK7zMo.js";import"./editor-jsonify-Jo3Suxhh.js";import"./blur-input-D25ymtXg.js";import"./tex-error-view-DakZIcol.js";import"./free-response-editor-B0XF62TI.js";import"./input-number-editor-ijL33TIO.js";import"./Popper-CR4ogFG2.js";import"./label-image-editor-CogW0qk7.js";import"./matcher-editor-8MgaetgP.js";import"./number-line-editor-Df4WwP2e.js";import"./phet-simulation-editor-D4yQaNGw.js";import"./plotter-editor-dckMmd12.js";import"./python-program-editor-CNseBl7Z.js";import"./sorter-editor-PF4bhNM6.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
