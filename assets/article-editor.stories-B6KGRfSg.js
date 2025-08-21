import{r as o,j as e,A as d}from"./iframe-CBzmwlmW.js";import"./item-version-BuGqddX0.js";import"./article-renderer-DXc_UT3j.js";import"./server-item-renderer-DZO-SYMc.js";import"./hints-renderer-CQmkUpJG.js";import{A as u}from"./article-editor-OIxKVgLf.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DSwG63UC.js";import"./components-ClRtcqxI.js";import"./icon-paths-CAw4HXN9.js";import"./image-editor-DCbT4cAJ.js";import"./editor-jsonify-Cd9gMJZz.js";import"./blur-input-MbC-Gy88.js";import"./tex-error-view-CMzvOPf0.js";import"./free-response-editor-CeGM1kYD.js";import"./input-number-editor-Dl-tkFpT.js";import"./Popper-TvX6wtwH.js";import"./label-image-editor-Bt2RYbfj.js";import"./matcher-editor-Dwvw5WYr.js";import"./number-line-editor-ybxmMV65.js";import"./phet-simulation-editor-D7AH52H3.js";import"./plotter-editor-DwiC9G4R.js";import"./python-program-editor-B-uq70M-.js";import"./sorter-editor-DOJqzDyT.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
