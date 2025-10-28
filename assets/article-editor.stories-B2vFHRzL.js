import{r,j as t,V as l,A as o,t as d}from"./iframe-Drd1SmRq.js";import"./changeable-DTjDaQev.js";import"./article-renderer-QWMa5iwH.js";import"./server-item-renderer-DSCwYT3W.js";import"./hints-renderer-nULHa8p5.js";import{A as u}from"./article-editor-DhsJ_ZtN.js";import{C as f}from"./content-preview-BYs4RIzR.js";import{r as A}from"./register-all-widgets-and-editors-for-testing-BgZGgTkj.js";import{P as v}from"./preview-panel-DrkZklUa.js";import"./components-DkrwPn-v.js";import"./editor-jsonify-BNgEg5rS.js";import"./blur-input-CBPzOSSp.js";import"./tex-error-view-JrPzo621.js";import"./free-response-editor-Bo-10nVB.js";import"./input-number-editor-BjLHg5Mn.js";import"./Popper-Ci4RRPxU.js";import"./label-image-editor-BPb4bhn2.js";import"./form-wrapped-text-field-DSgvgUNZ.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-d0Kbt_VK.js";import"./behavior-ZvKw_qMa.js";import"./question-markers-Db4v2q9U.js";import"./marker-BkopM5oq.js";import"./select-image-Uw6c824k.js";import"./matcher-editor-CcyvlOgy.js";import"./number-line-editor-5AjxYjHY.js";import"./phet-simulation-editor-BQXoTWTr.js";import"./plotter-editor-DMo0Rf_P.js";import"./python-program-editor-B-P-ZQAv.js";import"./sorter-editor-ChyMzF96.js";A();const K={title:"Editors/ArticleEditor"},e=()=>{const[i,a]=r.useState(void 0),m=r.useRef();return t.jsxs(l,{children:[t.jsx(u,{dependencies:d,apiOptions:{...o.defaults,isArticle:!0},imageUploader:()=>{},json:i,onChange:c=>{a(c.json[0])},previewURL:"about:blank",ref:m}),t.jsx(v,{openButtonText:"Open preview (storybook only)",children:t.jsx(f,{question:i,apiOptions:{...o.defaults,isArticle:!0,showAlignmentOptions:!0},linterContext:{contentType:"article",highlightLint:!0,paths:[],stack:[]},previewDevice:"desktop"})})]})};e.__docgenInfo={description:"",methods:[],displayName:"Demo"};var n,s,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => {
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
