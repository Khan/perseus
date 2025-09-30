import{r as i,j as e,A as d,t as u}from"./iframe-Da852Jbn.js";import"./changeable-BxawrcPz.js";import"./article-renderer-VfBK7v9e.js";import"./server-item-renderer-C-UYZ0Mi.js";import"./hints-renderer-CDGwEx0Y.js";import{A as f}from"./article-editor-FNt7yo9R.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-u-e74vB4.js";import"./components-CdQb559Y.js";import"./icon-paths-DyslO3o8.js";import"./editor-jsonify-yWsMAQBR.js";import"./blur-input-D3KRKkwg.js";import"./tex-error-view-B3MyBrFc.js";import"./free-response-editor-KV8kY9hU.js";import"./input-number-editor-DvD_hcZt.js";import"./Popper-CJ_xej-s.js";import"./label-image-editor-SnTfcGvh.js";import"./matcher-editor-DamRmpkE.js";import"./number-line-editor-tEs76nfB.js";import"./phet-simulation-editor-BU6eHc9-.js";import"./plotter-editor-BlfJCyHl.js";import"./python-program-editor-Kuluf1r3.js";import"./sorter-editor-BtFopwo8.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
