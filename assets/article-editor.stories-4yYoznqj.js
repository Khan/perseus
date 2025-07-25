import{r as o,j as t,A as d}from"./iframe-BY2pawzX.js";import"./item-version-deo1PzQO.js";import"./article-renderer-CIqqOhu0.js";import"./server-item-renderer-isXmAqTY.js";import"./hints-renderer-CFDgzRBN.js";import{A as u}from"./article-editor-lWtvyRhU.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-C6zNjb9Y.js";import"./components-C_6fDHEh.js";import"./device-framer-B56oAgXn.js";import"./editor-DiUc_FCL.js";import"./tex-error-view-RCedzHwh.js";import"./icon-paths-Cfjy_uoj.js";import"./categorizer-editor-BqAfQW9h.js";import"./editor-jsonify-DB4J-XSR.js";import"./blur-input-rMateJma.js";import"./definition-editor-BcVFfCuD.js";import"./dropdown-editor-DPUgMhet.js";import"./explanation-editor-DZOP4LWh.js";import"./expression-editor-ZAsZU0KI.js";import"./free-response-editor-C7A-ykGL.js";import"./interaction-editor-2IcMhr4S.js";import"./image-editor-CXJ3MqLD.js";import"./input-number-editor-CZW52Kbb.js";import"./Popper-t7UEtxTm.js";import"./numeric-input-editor-CCbZWsVC.js";import"./label-image-editor-tEjjdan9.js";import"./matcher-editor-CW4B1k6C.js";import"./number-line-editor-D8Tbhhn9.js";import"./phet-simulation-editor-BwYCL1r4.js";import"./plotter-editor-DuBzMnf1.js";import"./python-program-editor-DnEiSAV5.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-COHhHoZB.js";f();const Q={title:"Editors/ArticleEditor"},e=()=>{const[a,p]=o.useState(),r=o.useRef();function m(c){p(c.json)}function l(){console.log(r.current.serialize())}return t.jsxs(t.Fragment,{children:[t.jsx("button",{onClick:l,children:"Serialize"}),t.jsx("hr",{}),t.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:m,previewURL:"/perseus/frame",ref:r})]})};e.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
