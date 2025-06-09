import{cL as e}from"./iframe-vtNTHGDv.js";import{S as y}from"./server-item-renderer-with-debug-ui-CfD8pnuw.js";import"./split-view-D2V0K5dM.js";import"./test-keypad-context-wrapper-C5XIVldI.js";import"./server-item-renderer-DTmnVKjc.js";import"./hints-renderer-CKfy0FDV.js";const I={content:"The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",images:{},widgets:{"dropdown 1":{type:"dropdown",alignment:"default",static:!1,graded:!0,options:{static:!1,placeholder:"greater/less than or equal to",choices:[{content:"greater than or equal to",correct:!1},{content:"less than or equal to",correct:!0}]},version:{major:0,minor:0}}}},A={content:"If x equals 4, then [[☃ dropdown 1]] equals $10$.",images:{},widgets:{"dropdown 1":{type:"dropdown",alignment:"default",static:!1,graded:!0,options:{static:!1,placeholder:"",choices:[{content:"$5\\sqrt{x}$",correct:!0},{content:"$5x$",correct:!1}]},version:{major:0,minor:0}}}},P={content:"[[☃ dropdown 1]]",images:{},widgets:{"dropdown 1":{type:"dropdown",alignment:"default",static:!1,graded:!0,options:{static:!1,placeholder:"Choose an answer",choices:[{content:"True",correct:!0},{content:"False",correct:!1}],visibleLabel:"Test label",ariaLabel:"Test ARIA label"},version:{major:0,minor:0}},"dropdown 2":{type:"dropdown",alignment:"default",static:!1,graded:!0,options:{static:!1,placeholder:"",choices:[{content:"True",correct:!0},{content:"False",correct:!1}],visibleLabel:"Test label",ariaLabel:"Test ARIA label"},version:{major:0,minor:0}}}},$={content:`The dropdown widget is often used inline. This is how it would look in an article with the new visible label:

Lorem ipsum odor amet, consectetuer adipiscing elit. Mus curae sollicitudin penatibus, mattis suscipit habitant tincidunt mauris. Vitae curae dolor gravida vehicula adipiscing vulputate penatibus. [[☃ dropdown 1]] Ultricies mollis taciti vel, penatibus dapibus interdum pharetra. Ultricies sollicitudin facilisi vehicula dapibus ligula maecenas libero ligula. Lobortis luctus accumsan rhoncus posuere sapien mi habitant fusce. Per ultrices ac mus ligula habitant pulvinar aliquam dui lacus.

Another use case is that it can be used in tables:

header 1 | header 2 
- | -
data 1 | [[☃ dropdown 2]]
data 4 | data 5
data 7 | data 8`,images:{},widgets:{"dropdown 1":{type:"dropdown",alignment:"default",static:!1,graded:!0,options:{static:!1,placeholder:"Choose an answer",choices:[{content:"True",correct:!0},{content:"False",correct:!1}],visibleLabel:"Test label",ariaLabel:"Test ARIA label"},version:{major:0,minor:0}},"dropdown 2":{type:"dropdown",alignment:"default",static:!1,graded:!0,options:{static:!1,placeholder:"",choices:[{content:"True",correct:!0},{content:"False",correct:!1}],visibleLabel:"Test label",ariaLabel:"Test ARIA label"},version:{major:0,minor:0}}}},V={content:"The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",images:{},widgets:{"dropdown 1":{type:"dropdown",alignment:"default",static:!1,graded:!0,options:{static:!1,placeholder:"",choices:[{content:"greater than or equal to",correct:!1},{content:"less than or equal to",correct:!0}]},version:{major:0,minor:0}}}},B={title:"Perseus/Widgets/Dropdown",component:y},t={args:{item:e({question:I})}},r={args:{item:e({question:A})}},o={args:{item:e({question:P})}},a={args:{item:e({question:$})}},s={args:{item:e({question:V})}},n={args:{item:e({question:I}),startAnswerless:!0}};var i,c,l;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: basicDropdown
    })
  }
}`,...(l=(c=t.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var d,p,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: dropdownWithMath
    })
  }
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,h,g;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    item: generateTestPerseusItem({
      question: dropdownWithVisibleLabel
    })
  }
}`,...(g=(h=o.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var w,b,f;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(W=(L=n.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};const F=["BasicDropdown","DropdownWithMath","DropdownWithVisibleLabel","InlineDropdownWithVisibleLabel","DropdownWithEmptyPlaceholder","AnswerlessBasicDropdown"];export{n as AnswerlessBasicDropdown,t as BasicDropdown,s as DropdownWithEmptyPlaceholder,r as DropdownWithMath,o as DropdownWithVisibleLabel,a as InlineDropdownWithVisibleLabel,F as __namedExportsOrder,B as default};
