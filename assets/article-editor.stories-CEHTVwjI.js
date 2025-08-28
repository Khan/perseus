import{r as o,j as e,A as d}from"./iframe-B7TMQJdi.js";import"./item-version-DWTm3KG2.js";import"./article-renderer-C3ugB7CD.js";import"./server-item-renderer-Dp-6ctHj.js";import"./hints-renderer-BrPYys6H.js";import{A as u}from"./article-editor-DyzG-DFF.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-COGy_iU0.js";import"./components--W1lCDFk.js";import"./icon-paths-CP6jQddt.js";import"./editor-jsonify-DXplw2MQ.js";import"./blur-input-DodOUuP6.js";import"./tex-error-view-D1eJ6Loy.js";import"./free-response-editor-D_wrW1KX.js";import"./input-number-editor-xNB8HRxz.js";import"./Popper-Cq-tr5nC.js";import"./label-image-editor-B008PUN1.js";import"./matcher-editor-CXNJqYWo.js";import"./number-line-editor-CPMmD342.js";import"./phet-simulation-editor-DBOfbdi4.js";import"./plotter-editor-Dkz93pM2.js";import"./python-program-editor-C2_SEQSc.js";import"./sorter-editor-BkSVzONe.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
