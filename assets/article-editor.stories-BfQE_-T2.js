import{r as o,j as e,A as d}from"./iframe-YFkAgDpo.js";import"./item-version-Bri-xK2Y.js";import"./article-renderer-LQkhTraP.js";import"./server-item-renderer-DZv0mMeh.js";import"./hints-renderer-BJDlQtcn.js";import{A as u}from"./article-editor-DHGztknV.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-aObkhvGH.js";import"./components-CQem4ao3.js";import"./icon-paths-D20Htg4v.js";import"./image-editor-DyNv9ZJC.js";import"./editor-jsonify-CaQtaJYA.js";import"./blur-input-0Q8GnoxC.js";import"./tex-error-view-DzZOzbXi.js";import"./free-response-editor-BoozwBVU.js";import"./input-number-editor-DLv2G8Su.js";import"./Popper-CC3f9GD2.js";import"./label-image-editor-OhQIgswf.js";import"./matcher-editor-BiClQfh2.js";import"./number-line-editor-BXQBkO0c.js";import"./phet-simulation-editor-Bt8-Vqsz.js";import"./plotter-editor-Djtc86PO.js";import"./python-program-editor-BPkXQ6VL.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-BjQDlgEb.js";f();const W={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
