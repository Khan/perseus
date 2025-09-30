import{r as i,j as e,A as d,t as u}from"./iframe-JLMxgQJB.js";import"./changeable-BRq84Vma.js";import"./article-renderer-DJ_P937b.js";import"./server-item-renderer-B8Oy5Ibe.js";import"./hints-renderer-DhZ4Pen0.js";import{A as f}from"./article-editor-BcqmC6S3.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-5sFuMQyh.js";import"./components-C6F2Y-Bk.js";import"./icon-paths-jbUJV95y.js";import"./editor-jsonify-BgIbmB16.js";import"./blur-input-CSvxMrOo.js";import"./tex-error-view-CM8YCbZo.js";import"./free-response-editor-B9QvfrRS.js";import"./input-number-editor-CzmVGb-2.js";import"./Popper-CkSkOBCL.js";import"./label-image-editor-DY1LKJvK.js";import"./matcher-editor-pd4Jsuip.js";import"./number-line-editor-CDSHxFtd.js";import"./phet-simulation-editor-DhMo-CIg.js";import"./plotter-editor-DlH4RmCX.js";import"./python-program-editor-i1ontLrU.js";import"./sorter-editor-B4tDZDuc.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
