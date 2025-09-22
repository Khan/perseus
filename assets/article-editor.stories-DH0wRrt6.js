import{r as o,j as e,A as d}from"./iframe-D6io2pYB.js";import"./changeable-BncRqfy4.js";import"./article-renderer-CIxoIdOL.js";import"./server-item-renderer-z3xie12G.js";import"./hints-renderer-BVlrcHrr.js";import{A as u}from"./article-editor-CAosltaN.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DpOqMxCe.js";import"./components-B8qfgrLL.js";import"./icon-paths-BTNbt9UA.js";import"./editor-jsonify-CD-kW_AC.js";import"./blur-input-CI2eWg2L.js";import"./tex-error-view-BG9AUnwp.js";import"./free-response-editor-IAnS-JsP.js";import"./input-number-editor-CVOzMJ8q.js";import"./Popper-DdDoOMb3.js";import"./label-image-editor-jE-XhxkC.js";import"./matcher-editor-QSaQI8ze.js";import"./number-line-editor-D9-MkP-S.js";import"./phet-simulation-editor-Co88q20c.js";import"./plotter-editor-jkVdLh--.js";import"./python-program-editor-D7w0p5MW.js";import"./sorter-editor-CqOR5Ruq.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
