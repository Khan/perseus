import{r as o,j as e,A as d}from"./iframe-DqR7m31b.js";import"./item-version-CyWSz8UH.js";import"./article-renderer-orqg5Kkn.js";import"./server-item-renderer-CEP2UnIb.js";import"./hints-renderer-Byr7gtNZ.js";import{A as u}from"./article-editor-BeYfg-0e.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-D8F6NF-p.js";import"./components-blz4Nyuh.js";import"./icon-paths-B_dYk3Nb.js";import"./image-editor-BcNnrfvN.js";import"./editor-jsonify-CvmObbVR.js";import"./blur-input-CDQ7Y1Gp.js";import"./tex-error-view-061Tln07.js";import"./free-response-editor-PjW-S0j9.js";import"./input-number-editor-p1l6gCRh.js";import"./Popper-Dpb6re_t.js";import"./label-image-editor-b-Yf-ApC.js";import"./matcher-editor-BAtdcpfR.js";import"./number-line-editor-Bx2GDlJu.js";import"./phet-simulation-editor-BoaC1S1I.js";import"./plotter-editor-CV0AoJOi.js";import"./python-program-editor-BHhaN7by.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-CdOMzcC4.js";f();const W={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
