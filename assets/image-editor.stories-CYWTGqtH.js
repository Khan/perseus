import{j as n,g as T,A as y}from"./iframe-CnVpoeZy.js";import"./changeable-Cm3EMqM_.js";import"./article-renderer-CTsZBa-i.js";import"./server-item-renderer-CBnujpVD.js";import"./hints-renderer-Ba8FYBgn.js";import{g as D}from"./feature-flags-util-Vxq3J9D8.js";import{e as a}from"./utils-DUXvGSzn.js";import{r as j}from"./radio-question-builder-Dx1IeYvx.js";import{E as R}from"./editor-page-with-storybook-preview-CGpd6uYd.js";import{I as A,r as F}from"./register-all-widgets-and-editors-for-testing-CeVoNCKW.js";import{g as O,a as M}from"./image-widget-generator-BkbJOfbU.js";import"./content-preview-CTMz-Zgh.js";import"./components-CpgjJa06.js";import"./icon-paths-CpjeqHf_.js";import"./editor-page-BmCN5lAS.js";import"./tex-error-view-ScjmTRh4.js";import"./item-extras-editor-B8kTPFmq.js";import"./editor-jsonify-BUWBs-5n.js";import"./blur-input-D5aA1pIH.js";import"./free-response-editor-DBiLMf8S.js";import"./input-number-editor-BWnLGMtd.js";import"./Popper-2OtnpGcr.js";import"./label-image-editor-CYL2N_C9.js";import"./matcher-editor-Cuv7dGFB.js";import"./number-line-editor-DCxSUhto.js";import"./phet-simulation-editor-GRNyQzu0.js";import"./plotter-editor-CBv5KPNg.js";import"./python-program-editor-5oPIC9IT.js";import"./sorter-editor-CH7PyEHR.js";const v=330,x=(S,{args:_})=>n.jsx("div",{style:{width:v},children:n.jsx(R,{apiOptions:{...y.defaults,flags:D({"image-widget-upgrade":!0})},question:T({content:"[[☃ image 1]]",widgets:{"image 1":O({options:M({..._})})}})})});F();const ce={title:"Widgets/Image/Editor Demo",component:A,argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[x],args:{backgroundImage:{}}},r={name:"Populated (Within Editor Page)",decorators:[x],args:{backgroundImage:a,alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}},t={render:function(){return n.jsx("div",{style:{width:v},children:n.jsx(R,{apiOptions:{...y.defaults,flags:D({"image-widget-upgrade":!0})},question:T({content:`Widget
[[☃ image 1]]

Markdown
![Earth and moon](${a.url})

Radio
[[☃ radio 1]]`,widgets:{"image 1":O({options:M({backgroundImage:a,alt:"Earth and moon"})}),"radio 1":j().addChoice(`![Earth and moon](${a.url})`).build().widgets["radio 1"]}})})})}};var i,s,d;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    backgroundImage: {}
  }
}`,...(d=(s=o.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};var m,g,p,c,u;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Empty (Within Editor Page)",
  decorators: [withinEditorPageDecorator],
  args: {
    backgroundImage: {}
  }
}`,...(p=(g=e.parameters)==null?void 0:g.docs)==null?void 0:p.source},description:{story:"This Image widget editor does not have any options set.",...(u=(c=e.parameters)==null?void 0:c.docs)==null?void 0:u.description}}};var l,h,w,E,I;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Populated (Within Editor Page)",
  decorators: [withinEditorPageDecorator],
  args: {
    backgroundImage: earthMoonImage,
    alt: "The moon showing behind the Earth in space.",
    caption: "Captured via XYZ Telescope",
    title: "The Moon"
  }
}`,...(w=(h=r.parameters)==null?void 0:h.docs)==null?void 0:w.source},description:{story:"This Image widget editor has all options set.",...(I=(E=r.parameters)==null?void 0:E.docs)==null?void 0:I.description}}};var f,P,W,b,k;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      width: PROD_EDITOR_WIDTH
    }}>
                <EditorPageWithStorybookPreview apiOptions={{
        ...ApiOptions.defaults,
        flags: getFeatureFlags({
          "image-widget-upgrade": true
        })
      }} question={generateTestPerseusRenderer({
        // Render Widget, Markdown, Radio
        content: \`Widget\\n[[☃ image 1]]\\n\\nMarkdown\\n![Earth and moon](\${earthMoonImage.url})\\n\\nRadio\\n[[☃ radio 1]]\`,
        widgets: {
          "image 1": generateImageWidget({
            options: generateImageOptions({
              backgroundImage: earthMoonImage,
              alt: "Earth and moon"
            })
          }),
          "radio 1": radioQuestionBuilder().addChoice(\`![Earth and moon](\${earthMoonImage.url})\`).build().widgets["radio 1"]
        }
      })} />
            </div>;
  }
}`,...(W=(P=t.parameters)==null?void 0:P.docs)==null?void 0:W.source},description:{story:`Only the markdown image in the main content should be flagged with a linter
warning. The Image widget and Radio widget containing a markdown image
should not be flagged.`,...(k=(b=t.parameters)==null?void 0:b.docs)==null?void 0:k.description}}};const ue=["Default","Empty","Populated","WithMarkdownImageLinterWarning"];export{o as Default,e as Empty,r as Populated,t as WithMarkdownImageLinterWarning,ue as __namedExportsOrder,ce as default};
