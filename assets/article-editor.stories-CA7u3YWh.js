import{r as i,j as e,A as d,t as u}from"./iframe-BUqiAjvg.js";import"./changeable-BIIkL6QK.js";import"./article-renderer-BMdS74on.js";import"./server-item-renderer-BWbA54HK.js";import"./hints-renderer-RXA74GFK.js";import{A as f}from"./article-editor-B38l7jMb.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-Uzkd3OLT.js";import"./components-40MYzgN1.js";import"./icon-paths-Dw3QWWRN.js";import"./editor-jsonify-BmGheLxA.js";import"./blur-input-BwMCEkN5.js";import"./tex-error-view-CRi9y7ze.js";import"./free-response-editor-C1dxHW-x.js";import"./input-number-editor-ETe6qJbG.js";import"./Popper-o2UhZJdE.js";import"./label-image-editor-BYHaAA4y.js";import"./matcher-editor-Zdm32iLj.js";import"./number-line-editor-CM1tckUG.js";import"./phet-simulation-editor-B2oKM35F.js";import"./plotter-editor-BDhC--_l.js";import"./python-program-editor-DUg5h9xD.js";import"./sorter-editor-BNnlJerm.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
