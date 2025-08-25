import{r as o,j as e,A as d}from"./iframe-BA954KEO.js";import"./item-version-MqFis2bJ.js";import"./article-renderer-DST9ZdYu.js";import"./server-item-renderer-Q5okag7a.js";import"./hints-renderer-0xl2XLV0.js";import{A as u}from"./article-editor-UUHz0j-I.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-iiXRYmw2.js";import"./components-Bxw5Bkju.js";import"./icon-paths-Bv2E_CVR.js";import"./editor-jsonify-DFjeklcf.js";import"./blur-input-BXvlJIki.js";import"./tex-error-view-De9FYSNw.js";import"./free-response-editor--cKqCa3N.js";import"./input-number-editor-zEnRimT-.js";import"./Popper-DNRse8BZ.js";import"./label-image-editor-wGw66lB1.js";import"./matcher-editor-BdZiv_hd.js";import"./number-line-editor-Bean9T87.js";import"./phet-simulation-editor-DpCMMvVF.js";import"./plotter-editor-CWttMj5v.js";import"./python-program-editor-CwV7vFk6.js";import"./sorter-editor-DQjIH21N.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
