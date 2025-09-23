import{r as o,j as e,A as d}from"./iframe-DlBZI7Ll.js";import"./changeable-DaaWs0qv.js";import"./article-renderer-B66uGFCV.js";import"./server-item-renderer-Du7ghijY.js";import"./hints-renderer-CN5PPsTA.js";import{A as u}from"./article-editor-eoho9Tsz.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-C5MR9u4v.js";import"./components-BQ4bHmFT.js";import"./icon-paths-Bmf-OpRB.js";import"./editor-jsonify-B4f1pDpI.js";import"./blur-input-AiRPyhYZ.js";import"./tex-error-view-Cf6zuEgE.js";import"./free-response-editor-B54mFQ3Q.js";import"./input-number-editor-B84XuZut.js";import"./Popper-CNLQpm5J.js";import"./label-image-editor-CjzJL_4O.js";import"./matcher-editor-ByqTA09b.js";import"./number-line-editor-D3lRA6ph.js";import"./phet-simulation-editor-CeANbhMS.js";import"./plotter-editor-2JJGALyH.js";import"./python-program-editor-BtwTqJFB.js";import"./sorter-editor-CMrx6EEe.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
