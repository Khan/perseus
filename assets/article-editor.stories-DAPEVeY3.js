import{r as o,j as e,A as d}from"./iframe-D4NTjdXj.js";import"./item-version-BAO2WK71.js";import"./article-renderer-CwjutsEU.js";import"./server-item-renderer-FcCjT-OW.js";import"./hints-renderer-B8AkeFqe.js";import{A as u}from"./article-editor-sIzm2etd.js";import{r as f}from"./register-all-widgets-and-editors-for-testing-CiaE48bb.js";import"./components-CIPvDZGq.js";import"./icon-paths-Cg099Tgq.js";import"./image-editor-DFayXOnX.js";import"./editor-jsonify-BFA07mSd.js";import"./blur-input-C2SJE6Br.js";import"./tex-error-view-D7IqJWny.js";import"./free-response-editor-MOkbee47.js";import"./input-number-editor-BDmu0Ku8.js";import"./Popper-B-BH2-qj.js";import"./label-image-editor-Dkf8MTyd.js";import"./matcher-editor-B_ZdSEDr.js";import"./number-line-editor-__w_s4is.js";import"./phet-simulation-editor-CymuMzul.js";import"./plotter-editor-CC90gRKx.js";import"./python-program-editor-DK8x5Xip.js";import"./minus-circle-bold-jRcNnagP.js";import"./sorter-editor-Cx3JouR2.js";f();const W={title:"Editors/ArticleEditor"},t=()=>{const[a,p]=o.useState(),r=o.useRef();function l(c){p(c.json)}function m(){console.log(r.current.serialize())}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,children:"Serialize"}),e.jsx("hr",{}),e.jsx(u,{apiOptions:d.defaults,imageUploader:()=>{},json:a,onChange:l,previewURL:"/perseus/frame",ref:r})]})};t.__docgenInfo={description:"",methods:[],displayName:"Base"};var i,s,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`(): React.ReactElement => {
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
