import{r as o,j as e,A as d}from"./iframe-Da-XUY9i.js";import"./changeable-Bz9DOf_G.js";import"./article-renderer-BKBF3Cme.js";import"./server-item-renderer-D6olF1dJ.js";import"./hints-renderer-BRCX49so.js";import{A as u}from"./article-editor-C64S_e7C.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DbWJay7p.js";import"./components-Bt9QnP5z.js";import"./icon-paths-C9bcahK-.js";import"./editor-jsonify-BSVW3xQ4.js";import"./blur-input-UMj4KhGU.js";import"./tex-error-view-C3ZGLETj.js";import"./free-response-editor-CWX8pusb.js";import"./input-number-editor-B9y9STIY.js";import"./Popper-CIyF1-oB.js";import"./label-image-editor-CxvF6zNH.js";import"./matcher-editor-BoQEVy28.js";import"./number-line-editor-CSGKnosz.js";import"./phet-simulation-editor-DaXcVehh.js";import"./plotter-editor-B6lGBc91.js";import"./python-program-editor-D3qDejHn.js";import"./sorter-editor-CAffWsgA.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
