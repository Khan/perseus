import{aJ as e}from"./iframe-Cfd3uF98.js";import{S as A}from"./server-item-renderer-with-debug-ui-YA8mtzqt.js";import"./server-item-renderer-BIZB3FlZ.js";import"./hints-renderer-CXTDNOsp.js";import"./main-DAxnpvbn.js";import"./test-keypad-context-wrapper-D11Pa1JS.js";import"./Popper-CR4ogFG2.js";const I={content:"The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",images:{},widgets:{"dropdown 1":{type:"dropdown",alignment:"default",static:!1,graded:!0,options:{static:!1,placeholder:"greater/less than or equal to",choices:[{content:"greater than or equal to",correct:!1},{content:"less than or equal to",correct:!0}]},version:{major:0,minor:0}}}},y={content:"If x equals 4, then [[☃ dropdown 1]] equals $10$.",images:{},widgets:{"dropdown 1":{type:"dropdown",alignment:"default",static:!1,graded:!0,options:{static:!1,placeholder:"",choices:[{content:"$5\\sqrt{x}$",correct:!0},{content:"$5x$",correct:!1}]},version:{major:0,minor:0}}}},P={content:"[[☃ dropdown 1]]",images:{},widgets:{"dropdown 1":{type:"dropdown",alignment:"default",static:!1,graded:!0,options:{static:!1,placeholder:"Choose an answer",choices:[{content:"True",correct:!0},{content:"False",correct:!1}],visibleLabel:"Test label",ariaLabel:"Test ARIA label"},version:{major:0,minor:0}},"dropdown 2":{type:"dropdown",alignment:"default",static:!1,graded:!0,options:{static:!1,placeholder:"",choices:[{content:"True",correct:!0},{content:"False",correct:!1}],visibleLabel:"Test label",ariaLabel:"Test ARIA label"},version:{major:0,minor:0}}}},$={content:`The dropdown widget is often used inline. This is how it would look in an article with the new visible label:

Lorem ipsum odor amet, consectetuer adipiscing elit. Mus curae sollicitudin penatibus, mattis suscipit habitant tincidunt mauris. Vitae curae dolor gravida vehicula adipiscing vulputate penatibus. [[☃ dropdown 1]] Ultricies mollis taciti vel, penatibus dapibus interdum pharetra. Ultricies sollicitudin facilisi vehicula dapibus ligula maecenas libero ligula. Lobortis luctus accumsan rhoncus posuere sapien mi habitant fusce. Per ultrices ac mus ligula habitant pulvinar aliquam dui lacus.

Another use case is that it can be used in tables:

header 1 | header 2 
- | -
data 1 | [[☃ dropdown 2]]
data 4 | data 5
data 7 | data 8`,images:{},widgets:{"dropdown 1":{type:"dropdown",alignment:"default",static:!1,graded:!0,options:{static:!1,placeholder:"Choose an answer",choices:[{content:"True",correct:!0},{content:"False",correct:!1}],visibleLabel:"Test label",ariaLabel:"Test ARIA label"},version:{major:0,minor:0}},"dropdown 2":{type:"dropdown",alignment:"default",static:!1,graded:!0,options:{static:!1,placeholder:"",choices:[{content:"True",correct:!0},{content:"False",correct:!1}],visibleLabel:"Test label",ariaLabel:"Test ARIA label"},version:{major:0,minor:0}}}},V={content:"The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",images:{},widgets:{"dropdown 1":{type:"dropdown",alignment:"default",static:!1,graded:!0,options:{static:!1,placeholder:"",choices:[{content:"greater than or equal to",correct:!1},{content:"less than or equal to",correct:!0}]},version:{major:0,minor:0}}}},F={title:"Widgets/Dropdown",component:A,tags:["!dev"],parameters:{docs:{description:{component:"A widget that allows users to select an option from a dropdown menu,                    enabling multiple-choice responses within inline text."}}}},t={args:{item:e({question:I})}},o={args:{item:e({question:y})}},r={args:{item:e({question:P})}},a={args:{item:e({question:$})}},s={args:{item:e({question:V})}},n={args:{item:e({question:I}),startAnswerless:!0}};var i,c,l;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: basicDropdown
    })
  }
}`,...(l=(c=t.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var d,p,u;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: dropdownWithMath
    })
  }
}`,...(u=(p=o.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,h,w;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: dropdownWithVisibleLabel
    })
  }
}`,...(w=(h=r.parameters)==null?void 0:h.docs)==null?void 0:w.source}}};var g,b,f;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: inlineDropdownWithVisibleLabel
    })
  }
}`,...(f=(b=a.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var T,q,v;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: dropdownWithEmptyPlaceholder
    })
  }
}`,...(v=(q=s.parameters)==null?void 0:q.docs)==null?void 0:v.source}}};var D,L,W;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: basicDropdown
    }),
    startAnswerless: true
  }
}`,...(W=(L=n.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};const k=["BasicDropdown","DropdownWithMath","DropdownWithVisibleLabel","InlineDropdownWithVisibleLabel","DropdownWithEmptyPlaceholder","AnswerlessBasicDropdown"];export{n as AnswerlessBasicDropdown,t as BasicDropdown,s as DropdownWithEmptyPlaceholder,o as DropdownWithMath,r as DropdownWithVisibleLabel,a as InlineDropdownWithVisibleLabel,k as __namedExportsOrder,F as default};
