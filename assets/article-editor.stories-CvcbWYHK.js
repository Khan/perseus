import{r as o,j as t,A as d}from"./iframe-Bn4eIUvs.js";import"./item-version-DeXeNc9j.js";import"./article-renderer-De3DbS1j.js";import"./server-item-renderer-dzpsa8GX.js";import"./hints-renderer-Wq2tBpaB.js";import{A as u}from"./article-editor-CRmfSxW7.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-Oj5vncdf.js";import"./components-CMUWUArR.js";import"./device-framer-CqWEuanA.js";import"./editor-DDqA3k9J.js";import"./tex-error-view-CbBf_Hlc.js";import"./icon-paths-Cfjy_uoj.js";import"./categorizer-editor-C8z9ltAn.js";import"./editor-jsonify-CNLLiPSj.js";import"./blur-input-BKMz5GfU.js";import"./definition-editor-BKbtltzp.js";import"./dropdown-editor-CxZXi43T.js";import"./explanation-editor-CS4idt9a.js";import"./expression-editor-Bqo8jV6_.js";import"./free-response-editor-DAujeROR.js";import"./interaction-editor-p_d3DTNI.js";import"./image-editor-NrL3phBL.js";import"./input-number-editor-PkcuryYa.js";import"./Popper-Dl2z8Wek.js";import"./numeric-input-editor-Brk53AGU.js";import"./label-image-editor-BpVMLwZD.js";import"./matcher-editor-DItdQP61.js";import"./number-line-editor-C58xywii.js";import"./phet-simulation-editor-BMwFMmnc.js";import"./plotter-editor-Cu920euc.js";import"./python-program-editor-DZciZ_sp.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-DvSFDCM6.js";f();const Q={title:"Editors/ArticleEditor"},e=()=>{const[a,p]=o.useState(),r=o.useRef();function m(c){p(c.json)}function l(){console.log(r.current.serialize())}return t.jsxs(t.Fragment,{children:[t.jsx("button",{onClick:l,children:"Serialize"}),t.jsx("hr",{}),t.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:m,previewURL:"/perseus/frame",ref:r})]})};e.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const V=["Base"];export{e as Base,V as __namedExportsOrder,Q as default};
