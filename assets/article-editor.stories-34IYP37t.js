import{r as i,j as e,A as d,t as u}from"./iframe-DCJ8exyC.js";import"./changeable-C82gKeax.js";import"./article-renderer-DZMwJQGf.js";import"./server-item-renderer-X1oqEcIj.js";import"./hints-renderer-DdJNA5y-.js";import{A as f}from"./article-editor-FVIOWhMK.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-T0bHoFnb.js";import"./components-CAhpd-2F.js";import"./icon-paths-CTuZnc_M.js";import"./editor-jsonify-D9nQTQEJ.js";import"./blur-input-CNS8RoZF.js";import"./tex-error-view-DTAZG77r.js";import"./free-response-editor-YTBJ0jJ6.js";import"./input-number-editor-RRSjgozL.js";import"./Popper-GsAmK7rE.js";import"./label-image-editor-C8bnQAtM.js";import"./matcher-editor-CyZYtOzo.js";import"./number-line-editor-3FUGXn3Y.js";import"./phet-simulation-editor-DXn_N4f6.js";import"./plotter-editor-Cl7xZl8B.js";import"./python-program-editor-CJP4VXxE.js";import"./sorter-editor-BT8IGYAi.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
