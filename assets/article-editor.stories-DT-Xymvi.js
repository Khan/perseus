import{r as o,j as e,A as d}from"./iframe-BYSZKjlD.js";import"./item-version-BmlmtjmK.js";import"./article-renderer-gbhHmXdU.js";import"./server-item-renderer-uw3vnGc_.js";import"./hints-renderer-CETjZfP0.js";import{A as u}from"./article-editor-CUOn8ngO.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CdhoISXg.js";import"./components-CpV8_tDb.js";import"./icon-paths-FfPM11ly.js";import"./image-editor-u448lnAC.js";import"./editor-jsonify-CheaUJSy.js";import"./blur-input-Bk0hhuGZ.js";import"./tex-error-view-DiUyeNHI.js";import"./free-response-editor-DF3BhlYO.js";import"./input-number-editor-B4Lhgty6.js";import"./Popper-W0aunTMs.js";import"./label-image-editor-dQBhfkbQ.js";import"./matcher-editor-PKd3JtIO.js";import"./number-line-editor-K4e9CYM5.js";import"./phet-simulation-editor-DpRMPUA1.js";import"./plotter-editor-Cr65tqNH.js";import"./python-program-editor-D6Rwev5L.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-BeHIrGBS.js";f();const W={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
