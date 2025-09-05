import{r as o,j as e,A as d}from"./iframe-DKHveS6o.js";import"./item-version-BuvQYYYF.js";import"./article-renderer-C9-819vE.js";import"./server-item-renderer-Dag1IC5C.js";import"./hints-renderer-DmDekxi3.js";import{A as u}from"./article-editor-B7XLAOjI.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CjB7Qmi2.js";import"./components-BTvhGjUN.js";import"./icon-paths-B4j45iK_.js";import"./editor-jsonify-CPCmu6yI.js";import"./blur-input-B3aO8SVH.js";import"./tex-error-view-BVUyD6qh.js";import"./free-response-editor-D0d2MpKG.js";import"./input-number-editor-DHmVvnNq.js";import"./Popper-BV7EZWf3.js";import"./label-image-editor-BJoubKbU.js";import"./matcher-editor-BDNxCC9q.js";import"./number-line-editor-CJhj4eA_.js";import"./phet-simulation-editor-COP3JOAt.js";import"./plotter-editor-DK8qlV0K.js";import"./python-program-editor-CGMJysWS.js";import"./sorter-editor-BOGOHJr5.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const T=["Base"];export{t as Base,T as __namedExportsOrder,N as default};
