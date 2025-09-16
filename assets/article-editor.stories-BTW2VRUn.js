import{r as o,j as e,A as d}from"./iframe-twR19s2R.js";import"./changeable-BRbhUt4-.js";import"./article-renderer-DUCTLZ0_.js";import"./server-item-renderer-DEJrks84.js";import"./hints-renderer-dNA-Hqdu.js";import{A as u}from"./article-editor-BMWFzqd1.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CQ1O6Ciw.js";import"./components-APFiw_-E.js";import"./icon-paths-C060-huy.js";import"./editor-jsonify-DusSMkrZ.js";import"./blur-input-CIveKNmL.js";import"./tex-error-view-BeQDspTd.js";import"./free-response-editor-C-0FRDGb.js";import"./input-number-editor-BXmQQzsk.js";import"./Popper-DAXHXale.js";import"./label-image-editor-CONGiQFU.js";import"./matcher-editor-Bg9W3vnX.js";import"./number-line-editor-CPf3rYpS.js";import"./phet-simulation-editor-C9T7kR4t.js";import"./plotter-editor-C955EJd5.js";import"./python-program-editor-ZcbSTA1y.js";import"./sorter-editor-CQuliCRL.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
