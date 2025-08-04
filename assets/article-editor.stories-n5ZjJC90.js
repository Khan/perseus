import{r as o,j as e,A as d}from"./iframe-weGPgbT4.js";import"./item-version-Be5EdHw7.js";import"./article-renderer-3b7TRXrq.js";import"./server-item-renderer-CEJBvG1t.js";import"./hints-renderer-CuvVECrk.js";import{A as u}from"./article-editor-BOt7poAs.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CqERdKZX.js";import"./components-BQ1kMoZv.js";import"./icon-paths-MPo44HyK.js";import"./image-editor-DQ75VDIQ.js";import"./editor-jsonify-Dnj134De.js";import"./blur-input-zoq5kdrP.js";import"./tex-error-view-DNtcaCYd.js";import"./free-response-editor-Dbxb44Ji.js";import"./input-number-editor--K7hnhz_.js";import"./Popper-CWMllK13.js";import"./label-image-editor-BvUleVuR.js";import"./matcher-editor-SP960hLt.js";import"./number-line-editor-KNw-56AC.js";import"./phet-simulation-editor-C-_ynoYh.js";import"./plotter-editor-BXKm2rOC.js";import"./python-program-editor-BQZBhtnc.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-wzN5bkQ9.js";f();const W={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const q=["Base"];export{t as Base,q as __namedExportsOrder,W as default};
