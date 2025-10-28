import{j as i,g as T,A as y}from"./iframe-CvVra0N4.js";import"./changeable-nFy8X6Em.js";import"./article-renderer-wDvWitxg.js";import"./server-item-renderer-B7KiDeS-.js";import"./hints-renderer-Bcb7GYXj.js";import{g as D}from"./feature-flags-util-Vxq3J9D8.js";import{e as a}from"./utils-CfhUZX9z.js";import{r as j}from"./radio-question-builder-Dx1IeYvx.js";import{E as R}from"./editor-page-with-storybook-preview-Ckjsq5F-.js";import{I as A,r as F}from"./register-all-widgets-and-editors-for-testing-CUEK8wak.js";import{g as O,a as M}from"./image-widget-generator-BkbJOfbU.js";import"./content-preview-CM1VbVZ8.js";import"./editor-page-BCGZ6e9E.js";import"./components-BH71sfte.js";import"./viewport-resizer-BO9a087P.js";import"./tex-error-view-Bh0T_R-U.js";import"./item-extras-editor-D8oVAKM3.js";import"./preview-panel-DgpZrCnp.js";import"./editor-jsonify-BvdWZVWl.js";import"./blur-input-vAUnS1t5.js";import"./free-response-editor-CVUyiwne.js";import"./input-number-editor-Dad8fT3U.js";import"./Popper-PRGrAOCB.js";import"./label-image-editor-C5lKu4kN.js";import"./form-wrapped-text-field-d4cuVU5b.js";import"./global-colors-DSS4FaUr.js";import"./answer-choices-JJ_0ApjJ.js";import"./behavior-DezUoNPu.js";import"./question-markers-zAL8dldR.js";import"./marker-NOU75x2i.js";import"./select-image-BpzPCqoE.js";import"./matcher-editor-zojsYp4K.js";import"./number-line-editor-CyIN_NxO.js";import"./phet-simulation-editor-CSuYBz9f.js";import"./plotter-editor-D7zkmeQK.js";import"./python-program-editor-NAwEQyWi.js";import"./sorter-editor-C6RfLeEE.js";const v=330,x=(S,{args:_})=>i.jsx("div",{style:{width:v},children:i.jsx(R,{apiOptions:{...y.defaults,flags:D({"image-widget-upgrade":!0})},question:T({content:"[[☃ image 1]]",widgets:{"image 1":O({options:M({..._})})}})})});F();const Pe={title:"Widgets/Image/Editor Demo",component:A,argTypes:{labels:{control:!1,description:"Deprecated"},box:{control:!1,description:"Set automatically"},range:{control:!1,description:"Deprecated"}}},o={args:{backgroundImage:{}}},e={name:"Empty (Within Editor Page)",decorators:[x],args:{backgroundImage:{}}},r={name:"Populated (Within Editor Page)",decorators:[x],args:{backgroundImage:a,alt:"The moon showing behind the Earth in space.",caption:"Captured via XYZ Telescope",title:"The Moon"}},t={render:function(){return i.jsx("div",{style:{width:v},children:i.jsx(R,{apiOptions:{...y.defaults,flags:D({"image-widget-upgrade":!0})},question:T({content:`Widget
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
