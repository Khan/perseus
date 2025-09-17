import{r as o,j as e,A as d}from"./iframe-P4OSW_dY.js";import"./changeable-CwdH6ff_.js";import"./article-renderer-CLdCg4eH.js";import"./server-item-renderer-BMQYoJ2I.js";import"./hints-renderer-DcmH3bRW.js";import{A as u}from"./article-editor-Czhf1uqA.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CZIXAptO.js";import"./components-B0UumHOx.js";import"./icon-paths-DboW-F7n.js";import"./editor-jsonify-ICvKm47Q.js";import"./blur-input-D4BXpGD_.js";import"./tex-error-view-BHWEqDul.js";import"./free-response-editor-CEirHYwc.js";import"./input-number-editor-CV-l1yVW.js";import"./Popper-CGqAhpX3.js";import"./label-image-editor-Bkj0vAcY.js";import"./matcher-editor-BxuY5Kx_.js";import"./number-line-editor-YgkWpDDN.js";import"./phet-simulation-editor-1e6L6CcV.js";import"./plotter-editor-Bq9w2JLj.js";import"./python-program-editor-Bo08Hhjt.js";import"./sorter-editor-B5hGU0f6.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
