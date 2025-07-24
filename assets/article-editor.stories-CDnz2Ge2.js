import{r as o,j as t,A as d}from"./iframe-CivT3IbC.js";import"./item-version-DChSHYeI.js";import"./article-renderer-DN9L9RQu.js";import"./server-item-renderer-NnfSC3sn.js";import"./hints-renderer-CCvrJEkK.js";import{A as u}from"./article-editor-De93QjNT.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-3NfnguHE.js";import"./components-DnYZ8MIN.js";import"./device-framer-DPbDZ9IV.js";import"./editor-pBfzpaod.js";import"./tex-error-view-D_HaDi0h.js";import"./icon-paths-Cfjy_uoj.js";import"./categorizer-editor-CKw63kSM.js";import"./editor-jsonify-DR28HYhK.js";import"./blur-input-CN6tx-U2.js";import"./definition-editor-DzzIlnPI.js";import"./dropdown-editor-uXMSP2f1.js";import"./explanation-editor-D_709uz8.js";import"./expression-editor-ryhKb1uL.js";import"./free-response-editor-BXKwhJF5.js";import"./interaction-editor-GnWW1icG.js";import"./image-editor-O25FDjC4.js";import"./input-number-editor-CSl57ewL.js";import"./Popper-DB1yQLKd.js";import"./numeric-input-editor-bz4-tGKr.js";import"./label-image-editor-B7D77eYp.js";import"./matcher-editor-DaYUoXn9.js";import"./number-line-editor-BTe7pImG.js";import"./phet-simulation-editor-BbhZTrKi.js";import"./plotter-editor-jL5k6W42.js";import"./python-program-editor-Cio6JHTi.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-BmgfmKNR.js";f();const Q={title:"Editors/ArticleEditor"},e=()=>{const[a,p]=o.useState(),r=o.useRef();function m(c){p(c.json)}function l(){console.log(r.current.serialize())}return t.jsxs(t.Fragment,{children:[t.jsx("button",{onClick:l,children:"Serialize"}),t.jsx("hr",{}),t.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:m,previewURL:"/perseus/frame",ref:r})]})};e.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
