import{r,j as t,V as l,A as o,t as d}from"./iframe-B6KTqCWL.js";import"./changeable-CMSj7Bty.js";import"./article-renderer-_6W0J1w5.js";import"./server-item-renderer-DcApu9WE.js";import"./hints-renderer-qnXvFzv1.js";import{A as u}from"./article-editor-ByKLUKfA.js";import{C as f}from"./content-preview-iI2GDGzx.js";import{r as A}from"./register-all-widgets-and-editors-for-testing-DC8BE-a2.js";import{P as v}from"./preview-panel-BX6c63rB.js";import"./components-JViXEYIV.js";import"./editor-jsonify-BSDbqplP.js";import"./blur-input-BRDEsd6k.js";import"./tex-error-view-BJjWSETH.js";import"./free-response-editor-Dvf6cMIk.js";import"./input-number-editor-BRCWtRR9.js";import"./Popper-DpFWtsF0.js";import"./label-image-editor-7BK0OT9A.js";import"./form-wrapped-text-field-C1mNC1s3.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-D5BtIJnB.js";import"./behavior-GaMBXgx4.js";import"./question-markers-C1uRXrrh.js";import"./marker-B3PxY7Xu.js";import"./select-image-_pJc_-H6.js";import"./matcher-editor-C3yfMuDQ.js";import"./number-line-editor-eReFrZGU.js";import"./phet-simulation-editor-o_d4Hi3w.js";import"./plotter-editor-GkCxEcIz.js";import"./python-program-editor-BfFGyF-9.js";import"./sorter-editor-ZJfk9Wxb.js";A();const K={title:"Editors/ArticleEditor"},e=()=>{const[i,a]=r.useState(void 0),m=r.useRef();return t.jsxs(l,{children:[t.jsx(u,{dependencies:d,apiOptions:{...o.defaults,isArticle:!0},imageUploader:()=>{},json:i,onChange:c=>{a(c.json[0])},previewURL:"about:blank",ref:m}),t.jsx(v,{openButtonText:"Open preview (storybook only)",children:t.jsx(f,{question:i,apiOptions:{...o.defaults,isArticle:!0,showAlignmentOptions:!0},linterContext:{contentType:"article",highlightLint:!0,paths:[],stack:[]},previewDevice:"desktop"})})]})};e.__docgenInfo={description:"",methods:[],displayName:"Demo"};var n,s,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`(): React.ReactElement => {
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
