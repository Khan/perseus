import{r as o,j as e,A as d}from"./iframe-D8xOXFzc.js";import"./item-version-Cl2jOQRz.js";import"./article-renderer-Bx8PCQ8G.js";import"./server-item-renderer-W4cVvNnI.js";import"./hints-renderer-B09kKfqs.js";import{A as u}from"./article-editor-ij06o-gi.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DOaghIMK.js";import"./components-dLPJOn06.js";import"./icon-paths-YLd9he-L.js";import"./editor-jsonify-BL10OhgF.js";import"./blur-input-DDNGANfq.js";import"./tex-error-view-C6eflJVk.js";import"./free-response-editor-CQMnNvk3.js";import"./input-number-editor-6vpCv2wg.js";import"./Popper-DFRpAm-o.js";import"./label-image-editor-WZdGC5L7.js";import"./matcher-editor-BquqOGGm.js";import"./number-line-editor-DBS851eG.js";import"./phet-simulation-editor-BQIuFj27.js";import"./plotter-editor-D4aQUIAM.js";import"./python-program-editor-PmX_PPDC.js";import"./sorter-editor-Bqa7hPkz.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
