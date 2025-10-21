import{r,j as t,V as l,A as o,t as d}from"./iframe-DiqXPJfj.js";import"./changeable-D_TtF40x.js";import"./article-renderer-DkhlFpBs.js";import"./server-item-renderer-D_YRAwSw.js";import"./hints-renderer-B6nliYZ9.js";import{A as u}from"./article-editor-Ba206euX.js";import{C as f}from"./content-preview-V5wcKruB.js";import{r as A}from"./register-all-widgets-and-editors-for-testing-NvFzoUwF.js";import{P as v}from"./preview-panel-CnKtuz32.js";import"./components-D8DHAHSW.js";import"./editor-jsonify-Cue7L1kc.js";import"./blur-input-GtapLIN-.js";import"./tex-error-view-DOMJAYgx.js";import"./free-response-editor-CpjRbJD4.js";import"./input-number-editor-B5a3cdPa.js";import"./Popper-D3aZAOyU.js";import"./label-image-editor-Y8INsNmf.js";import"./form-wrapped-text-field-B1yM9tjY.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-BWaqQO_S.js";import"./behavior-Cu0v0EjM.js";import"./question-markers-BLi05kks.js";import"./marker-COQlGgCW.js";import"./select-image-pBZ3nOJf.js";import"./matcher-editor-DqH_n-Nj.js";import"./number-line-editor-DchvBSp_.js";import"./phet-simulation-editor-UYyv8YOr.js";import"./plotter-editor-Nf4VrKES.js";import"./python-program-editor-Fd5QPSNQ.js";import"./sorter-editor-BjNX3zv1.js";A();const K={title:"Editors/ArticleEditor"},e=()=>{const[i,a]=r.useState(void 0),m=r.useRef();return t.jsxs(l,{children:[t.jsx(u,{dependencies:d,apiOptions:{...o.defaults,isArticle:!0},imageUploader:()=>{},json:i,onChange:c=>{a(c.json[0])},previewURL:"about:blank",ref:m}),t.jsx(v,{openButtonText:"Open preview (storybook only)",children:t.jsx(f,{question:i,apiOptions:{...o.defaults,isArticle:!0,showAlignmentOptions:!0},linterContext:{contentType:"article",highlightLint:!0,paths:[],stack:[]},previewDevice:"desktop"})})]})};e.__docgenInfo={description:"",methods:[],displayName:"Demo"};var n,s,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => {
  const [article, setArticle] = useState(undefined);
  const articleEditorRef = useRef();
  return <View>
            <ArticleEditor dependencies={testDependenciesV2} apiOptions={{
      ...ApiOptions.defaults,
      isArticle: true
    }} imageUploader={() => {}} json={article} onChange={value => {
      setArticle(value.json[0]);
    }} previewURL="about:blank" ref={articleEditorRef as any} />
            <PreviewPanel openButtonText="Open preview (storybook only)">
                <ContentPreview question={article} apiOptions={{
        ...ApiOptions.defaults,
        isArticle: true,
        showAlignmentOptions: true
      }} linterContext={{
        contentType: "article",
        highlightLint: true,
        paths: [],
        stack: []
      }} previewDevice={"desktop"} />
            </PreviewPanel>
        </View>;
}`,...(p=(s=e.parameters)==null?void 0:s.docs)==null?void 0:p.source}}};const M=["Demo"];export{e as Demo,M as __namedExportsOrder,K as default};
