import{r as i,j as e,A as d,t as u}from"./iframe-B9L61ZNL.js";import"./changeable-f3jAW3P9.js";import"./article-renderer-BlPaXFZN.js";import"./server-item-renderer-Bk13Q33N.js";import"./hints-renderer-BKhTPXa8.js";import{A as f}from"./article-editor-CKXqCdNB.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-DQvsVT3t.js";import"./components-BdL8WZIq.js";import"./icon-paths-v_ImfsYm.js";import"./editor-jsonify-CGgHSSUU.js";import"./blur-input-DeWJTh5j.js";import"./tex-error-view-Drb5weWp.js";import"./free-response-editor-ZGs-A56E.js";import"./input-number-editor-BOqyZdvw.js";import"./Popper-CtjfWoAT.js";import"./label-image-editor-Cua0x44o.js";import"./matcher-editor-Cf3LpIly.js";import"./number-line-editor-BcFsQPPc.js";import"./phet-simulation-editor-C1Mni-_K.js";import"./plotter-editor-COmSqk6p.js";import"./python-program-editor-W40RqiJM.js";import"./sorter-editor-CJMCWBvd.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
