import{r as i,j as e,A as d,t as u}from"./iframe-BDfd20el.js";import"./changeable-CBopxQ_h.js";import"./article-renderer-CnKwc4WG.js";import"./server-item-renderer-ZCFSVAca.js";import"./hints-renderer-Co5MT86T.js";import{A as f}from"./article-editor-Dlhq3ALt.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-2gXPGWsC.js";import"./components-4zEMKafp.js";import"./icon-paths-DMcntd5r.js";import"./editor-jsonify-DYIEPtQw.js";import"./blur-input-C2TicqLT.js";import"./tex-error-view-I7r5TBK2.js";import"./free-response-editor-ToCor6qD.js";import"./input-number-editor-Bf2-Gzba.js";import"./Popper-B6zSMaWm.js";import"./label-image-editor-BPU6uBsA.js";import"./matcher-editor-D0sqelcK.js";import"./number-line-editor-C0F_uS6T.js";import"./phet-simulation-editor-zKqcQoul.js";import"./plotter-editor-CvZKNGYV.js";import"./python-program-editor-DvN7CljA.js";import"./sorter-editor-B4vbnbjd.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
