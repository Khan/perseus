import{r as o,j as e,A as d}from"./iframe-CDagQRjv.js";import"./changeable-CCbjBXnT.js";import"./article-renderer-BvVXuZjG.js";import"./server-item-renderer-BqGpUYA5.js";import"./hints-renderer-D9m6ukVh.js";import{A as u}from"./article-editor-P-hem7TB.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-BO2l7_gi.js";import"./components-CWyabbC1.js";import"./icon-paths-W7ZxPGAE.js";import"./editor-jsonify-8RSDlMLh.js";import"./blur-input-B7TL9duN.js";import"./tex-error-view-BQybWZSg.js";import"./free-response-editor-BYysdCbs.js";import"./input-number-editor-DU6RZzLo.js";import"./Popper-BvVW5jD0.js";import"./label-image-editor-DIzSgoUd.js";import"./matcher-editor-BHUlvdC7.js";import"./number-line-editor-C-pmiwpv.js";import"./phet-simulation-editor-CK3rtM7V.js";import"./plotter-editor-D3GESubb.js";import"./python-program-editor-BjE578sI.js";import"./sorter-editor-C-sgf4qP.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
