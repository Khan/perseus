import{r as o,j as e,A as d}from"./iframe-BJEvBpNN.js";import"./item-version-C0PfWFgG.js";import"./article-renderer-2AScVx07.js";import"./server-item-renderer-CVaJNtxc.js";import"./hints-renderer-Ca7G1BPm.js";import{A as u}from"./article-editor-DLjh3vDr.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-nUn67HC0.js";import"./components-DWcPDyc_.js";import"./icon-paths-Eava6PL-.js";import"./editor-jsonify-BgjN-USO.js";import"./blur-input-2WAgaPvP.js";import"./tex-error-view-D7pP2ABq.js";import"./free-response-editor-CO_OLX-p.js";import"./input-number-editor-DemANi2B.js";import"./Popper-DpreiVGL.js";import"./label-image-editor-DHPun3fs.js";import"./matcher-editor-Bw6XDieY.js";import"./number-line-editor-CbWzvs7i.js";import"./phet-simulation-editor-C0gf4nib.js";import"./plotter-editor-DJ5v4Ppd.js";import"./python-program-editor-D8ildDMQ.js";import"./sorter-editor-CablJwyE.js";f();const N={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(m){p(m.json)}function c(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:c,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
