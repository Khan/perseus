import{r as o,j as e,A as d}from"./iframe-j25UteGQ.js";import"./item-version-B00y4dfv.js";import"./article-renderer-CM0P48nG.js";import"./server-item-renderer-CMFMS3Qe.js";import"./hints-renderer-glo0_wVL.js";import{A as u}from"./article-editor-Cronngup.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DwEsibBt.js";import"./components-CvXZ4FNp.js";import"./icon-paths-Bi3YDjMv.js";import"./image-editor-BgL4N3Ti.js";import"./editor-jsonify-C6MqAICs.js";import"./blur-input-C-XXKiGp.js";import"./tex-error-view-DM7ARkHg.js";import"./free-response-editor-Dj7lLfm0.js";import"./input-number-editor-Dmy7iT08.js";import"./Popper-CBYEqgun.js";import"./label-image-editor-BwqLkgVl.js";import"./matcher-editor-DgpET-9H.js";import"./number-line-editor-Bb8xoZrl.js";import"./phet-simulation-editor-jXwjCGFC.js";import"./plotter-editor-B0k5tWvA.js";import"./python-program-editor-C_SxrCiF.js";import"./sorter-editor-B_9n5PPW.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
