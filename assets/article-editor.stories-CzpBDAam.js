import{r as o,j as e,A as d}from"./iframe-DQKhkWRL.js";import"./item-version-DwoE3wq9.js";import"./article-renderer-D9NHecpR.js";import"./server-item-renderer-65hXZClS.js";import"./hints-renderer-Cz8S4fKT.js";import{A as u}from"./article-editor-BZDneTER.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-DKf091rT.js";import"./components-BZrxdghS.js";import"./icon-paths-B28DqO3E.js";import"./editor-jsonify-BBhJ6zh0.js";import"./blur-input-B8uHi4BM.js";import"./tex-error-view-BXjVKl26.js";import"./free-response-editor-D53tiusK.js";import"./input-number-editor-RBCfdd-R.js";import"./Popper-B06p5A2u.js";import"./label-image-editor-C_kPIJGy.js";import"./matcher-editor-D7AEz5H5.js";import"./number-line-editor-gIP2YKnA.js";import"./phet-simulation-editor-DVfYrtKV.js";import"./plotter-editor-C8aHLENn.js";import"./python-program-editor-DieRYGDY.js";import"./sorter-editor-CEbUBAgW.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
