import{r as i,j as e,A as d,t as u}from"./iframe-DX_TRIrP.js";import"./changeable-i3_3swUP.js";import"./article-renderer-DVe5Guy-.js";import"./server-item-renderer-BQsQV7p9.js";import"./hints-renderer-DkD3HAF5.js";import{A as f}from"./article-editor-CIjBsMTL.js";import{r as g}from"./register-all-widgets-and-editors-for-testing-IzBwQu3-.js";import"./components-BTmTOPpx.js";import"./icon-paths-D8QBa6tB.js";import"./editor-jsonify-BiWJamii.js";import"./blur-input-aTT0omZ8.js";import"./tex-error-view-8DE0iN9K.js";import"./free-response-editor-BBc7PKUE.js";import"./input-number-editor-DsrbJsug.js";import"./Popper-Bax8sFlj.js";import"./label-image-editor-CPEEY_cK.js";import"./matcher-editor-UbLB9Grz.js";import"./number-line-editor-BCWZvukt.js";import"./phet-simulation-editor-B0cMBplB.js";import"./plotter-editor-OOfkDAUl.js";import"./python-program-editor-DF_QEAK_.js";import"./sorter-editor-BjHXeMse.js";g();const I={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=i.useState(),r=i.useRef();function c(m){p(m.json)}function l(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:l,children:"Serialize"}),e.jsx("hr",{}),e.jsx(f,{dependencies:u,apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:c,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var o,s,n;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(): React.ReactElement => {
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
