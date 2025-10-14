import{j as i,g as T,A as y}from"./iframe-B6KTqCWL.js";import"./changeable-CMSj7Bty.js";import"./article-renderer-_6W0J1w5.js";import"./server-item-renderer-DcApu9WE.js";import"./hints-renderer-qnXvFzv1.js";import{g as D}from"./feature-flags-util-Vxq3J9D8.js";import{e as a}from"./utils-DUXvGSzn.js";import{r as j}from"./radio-question-builder-Dx1IeYvx.js";import{E as R}from"./editor-page-with-storybook-preview-CGNwk7sx.js";import{I as A,r as F}from"./register-all-widgets-and-editors-for-testing-DC8BE-a2.js";import{g as O,a as M}from"./image-widget-generator-BkbJOfbU.js";import"./content-preview-iI2GDGzx.js";import"./editor-page-zFhBaTiC.js";import"./components-JViXEYIV.js";import"./viewport-resizer-CQ-xQ04j.js";import"./tex-error-view-BJjWSETH.js";import"./item-extras-editor-DWe8Zedu.js";import"./preview-panel-BX6c63rB.js";import"./editor-jsonify-BSDbqplP.js";import"./blur-input-BRDEsd6k.js";import"./free-response-editor-Dvf6cMIk.js";import"./input-number-editor-BRCWtRR9.js";import"./Popper-DpFWtsF0.js";import"./label-image-editor-7BK0OT9A.js";import"./form-wrapped-text-field-C1mNC1s3.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-D5BtIJnB.js";import"./behavior-GaMBXgx4.js";import"./question-markers-C1uRXrrh.js";import"./marker-B3PxY7Xu.js";import"./select-image-_pJc_-H6.js";import"./matcher-editor-C3yfMuDQ.js";import"./number-line-editor-eReFrZGU.js";import"./phet-simulation-editor-o_d4Hi3w.js";import"./plotter-editor-GkCxEcIz.js";import"./python-program-editor-BfFGyF-9.js";import"./sorter-editor-ZJfk9Wxb.js";const v=330,x=(S,{args:_})=>i.jsx("div",{style:{width:v},children:i.jsx(R,{apiOptions:{...y.defaults,flags:D({"image-widget-upgrade":!0})},question:T({content:"[[☃ image 1]]",widgets:{"image 1":O({options:M({..._})})}})})});F();const Pe={title:"Widgets/Image/Editor Demo",component:A,argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[x],args:{backgroundImage:{}}},r={name:"Populated (Within Editor Page)",decorators:[x],args:{backgroundImage:a,alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}},t={render:function(){return i.jsx("div",{style:{width:v},children:i.jsx(R,{apiOptions:{...y.defaults,flags:D({"image-widget-upgrade":!0})},question:T({content:`Widget
[[☃ image 1]]

Markdown
![Earth and moon](${a.url})

Radio
[[☃ radio 1]]`,widgets:{"image 1":O({options:M({backgroundImage:a,alt:"Earth and moon"})}),"radio 1":j().addChoice(`![Earth and moon](${a.url})`).build().widgets["radio 1"]}})})})}};var n,s,d;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
should not be flagged.`,...(k=(b=t.parameters)==null?void 0:b.docs)==null?void 0:k.description}}};const We=["Default","Empty","Populated","WithMarkdownImageLinterWarning"];export{o as Default,e as Empty,r as Populated,t as WithMarkdownImageLinterWarning,We as __namedExportsOrder,Pe as default};
