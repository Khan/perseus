import{r as o,j as e,A as d}from"./iframe-X2iCxCM1.js";import"./changeable-BTZEiJrT.js";import"./article-renderer-BfxiJ_G-.js";import"./server-item-renderer-DSOYc6vS.js";import"./hints-renderer-DmrgmTbd.js";import{A as u}from"./article-editor-q8r7_6kE.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-D9LYfXcc.js";import"./components-BLiWx_li.js";import"./icon-paths-DswLd0Gj.js";import"./editor-jsonify-CoXlN5zv.js";import"./blur-input-rOOffUli.js";import"./tex-error-view-CZ-kMX5M.js";import"./free-response-editor-DMk68mVS.js";import"./input-number-editor-CgNtqnWo.js";import"./Popper-CCtOn01t.js";import"./label-image-editor-BsjA7tBq.js";import"./matcher-editor-yTj3tA-C.js";import"./number-line-editor-ClWhrpv6.js";import"./phet-simulation-editor-CsAYcmEx.js";import"./plotter-editor-CdD6tTTe.js";import"./python-program-editor-DROFG5yD.js";import"./sorter-editor-BpsESG_y.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
