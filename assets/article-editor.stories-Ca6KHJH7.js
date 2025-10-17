import{r,j as t,V as l,A as o,t as d}from"./iframe-Bqs4JwNG.js";import"./changeable-C7GyetS0.js";import"./article-renderer-eSUBpUdX.js";import"./server-item-renderer-BO69CDoX.js";import"./hints-renderer-DSrX6IHN.js";import{A as u}from"./article-editor-DNyfUBO1.js";import{C as f}from"./content-preview-n_lWhwaj.js";import{r as A}from"./register-all-widgets-and-editors-for-testing-7hg65zsv.js";import{P as v}from"./preview-panel-DhDtRo87.js";import"./components-4KueNKIN.js";import"./editor-jsonify-GOu-Zov7.js";import"./blur-input-DEt50EG6.js";import"./tex-error-view-Cdv2aUt1.js";import"./free-response-editor-BYqVubOi.js";import"./input-number-editor-TVDeIueT.js";import"./Popper-Ci__VWDA.js";import"./label-image-editor-DYXXK4D7.js";import"./form-wrapped-text-field-qaS3UYJu.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-BXRa_Il6.js";import"./behavior-BQCeE9Qn.js";import"./question-markers-CbsqbR-Q.js";import"./marker-B0HEqX07.js";import"./select-image-Caac9vc-.js";import"./matcher-editor-DL9LnaPi.js";import"./number-line-editor-Djs_7jSM.js";import"./phet-simulation-editor-Dm9G1Wpo.js";import"./plotter-editor-Cpyv7Khc.js";import"./python-program-editor-DFI6twQc.js";import"./sorter-editor-B8kTfqAP.js";A();const K={title:"Editors/ArticleEditor"},e=()=>{const[i,a]=r.useState(void 0),m=r.useRef();return t.jsxs(l,{children:[t.jsx(u,{dependencies:d,apiOptions:{...o.defaults,isArticle:!0},imageUploader:()=>{},json:i,onChange:c=>{a(c.json[0])},previewURL:"about:blank",ref:m}),t.jsx(v,{openButtonText:"Open preview (storybook only)",children:t.jsx(f,{question:i,apiOptions:{...o.defaults,isArticle:!0,showAlignmentOptions:!0},linterContext:{contentType:"article",highlightLint:!0,paths:[],stack:[]},previewDevice:"desktop"})})]})};e.__docgenInfo={description:"",methods:[],displayName:"Demo"};var n,s,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => {
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
