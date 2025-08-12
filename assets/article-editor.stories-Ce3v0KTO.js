import{r as o,j as e,A as d}from"./iframe-hRc7QVRN.js";import"./item-version-Ew2WYzNF.js";import"./article-renderer-njUThmNe.js";import"./server-item-renderer-CuSEeggd.js";import"./hints-renderer-DLx3rRlR.js";import{A as u}from"./article-editor-Ci1P5ORa.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-Bu2LdEvh.js";import"./components-DQbsTmhw.js";import"./icon-paths-BWCL0yzl.js";import"./image-editor-Btgx4Ide.js";import"./editor-jsonify-Btem054p.js";import"./blur-input-BxN2A3bL.js";import"./tex-error-view-BCOEFGjY.js";import"./free-response-editor-Cf7V9TG8.js";import"./input-number-editor-kyrKTGYX.js";import"./Popper-2ATynB_D.js";import"./label-image-editor-CXzLfHR1.js";import"./matcher-editor-BtaatkLk.js";import"./number-line-editor-Dfdy-Gr-.js";import"./phet-simulation-editor-Dea7BPey.js";import"./plotter-editor-BSDouc2Y.js";import"./python-program-editor-BADuf4-a.js";import"./sorter-editor-BpRkS-BI.js";f();const T={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
